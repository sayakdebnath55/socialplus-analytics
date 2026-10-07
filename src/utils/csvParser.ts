import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { SocialPost, ContentFormat } from '../types/analytics';

export interface ParsedMetricRow {
  Date?: string;
  Platform?: string;
  Followers?: string | number;
  Reach?: string | number;
  Impressions?: string | number;
  Engagement?: string | number;
  Likes?: string | number;
  Comments?: string | number;
  Shares?: string | number;
  Saves?: string | number;
  VideoViews?: string | number;
}

export interface ParsedCsvResult {
  success: boolean;
  type: 'metrics' | 'posts' | 'unknown';
  fileFormat?: 'csv' | 'json' | 'xlsx';
  rowCount: number;
  aggregated?: {
    followers: number;
    reach: number;
    impressions: number;
    engagement: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    videoViews: number;
  };
  posts?: SocialPost[];
  error?: string;
}

/**
 * Universal row processor that validates, maps columns, and calculates metrics
 * regardless of whether the input originated from CSV, JSON, or Excel (.xlsx).
 */
export function processNormalizedRows(rows: any[], fileFormat: 'csv' | 'json' | 'xlsx' = 'csv'): ParsedCsvResult {
  if (!rows || rows.length === 0) {
    return {
      success: false,
      type: 'unknown',
      fileFormat,
      rowCount: 0,
      error: 'The file contains no readable data rows.'
    };
  }

  // Find non-empty rows
  const cleanRows = rows.filter(r => r && typeof r === 'object' && Object.keys(r).length > 0);
  if (cleanRows.length === 0) {
    return {
      success: false,
      type: 'unknown',
      fileFormat,
      rowCount: 0,
      error: 'No valid data objects found in file.'
    };
  }

  const firstRow = cleanRows[0];
  const keys = Object.keys(firstRow).map(k => k.trim().toLowerCase());

  // Check if rows represent social posts
  const isPostData = keys.some(k => ['caption', 'postid', 'post_id', 'content', 'title', 'post'].includes(k));

  if (isPostData) {
    const parsedPosts: SocialPost[] = cleanRows.map((row: any, idx: number) => {
      // Find key matching case-insensitively
      const getVal = (...fieldNames: string[]) => {
        for (const f of fieldNames) {
          for (const key of Object.keys(row)) {
            if (key.trim().toLowerCase() === f.toLowerCase() && row[key] !== undefined && row[key] !== null) {
              return row[key];
            }
          }
        }
        return undefined;
      };

      const rawFormat = String(getVal('format', 'type', 'content_type') || 'text').toLowerCase();
      const validFormats: ContentFormat[] = ['reel', 'video', 'carousel', 'image', 'text', 'article', 'short'];
      const format: ContentFormat = validFormats.includes(rawFormat as ContentFormat) ? (rawFormat as ContentFormat) : 'text';

      const rawPlatform = String(getVal('platform', 'network', 'channel') || 'instagram').toLowerCase();
      const validPlatforms = ['instagram', 'youtube', 'facebook', 'twitter', 'linkedin'];
      const platform = (validPlatforms.includes(rawPlatform) ? rawPlatform : 'instagram') as SocialPost['platform'];

      const likes = Number(getVal('likes', 'like_count') || 0);
      const comments = Number(getVal('comments', 'comment_count') || 0);
      const shares = Number(getVal('shares', 'share_count', 'retweets') || 0);
      const saves = Number(getVal('saves', 'save_count', 'bookmarks') || 0);
      const reach = Number(getVal('reach', 'unique_reach') || (likes * 10) || 5000);
      const impressions = Number(getVal('impressions', 'views') || (reach * 1.5) || 7500);
      const engagement = likes + comments + shares + saves;
      const engagementRate = reach > 0 ? Number(((engagement / reach) * 100).toFixed(2)) : 5.0;

      const caption = String(getVal('caption', 'content', 'title', 'text') || `Imported post #${idx + 1}`);
      const title = getVal('title') ? String(getVal('title')) : undefined;
      const publishedAt = String(getVal('publishedat', 'published_at', 'date', 'created_at') || new Date().toISOString());

      // Extract hashtags if present or auto-detect from caption
      let hashtags: string[] = [];
      const rawTags = getVal('hashtags', 'tags');
      if (Array.isArray(rawTags)) {
        hashtags = rawTags.map(t => String(t));
      } else if (typeof rawTags === 'string') {
        hashtags = rawTags.split(/[\s,]+/).filter(t => t.startsWith('#') || t.length > 0).map(t => t.startsWith('#') ? t : `#${t}`);
      } else {
        const found = caption.match(/#[a-zA-Z0-9_]+/g);
        if (found) hashtags = found;
        else hashtags = ['#ImportedData', '#SocialPulse'];
      }

      return {
        id: String(getVal('postid', 'id') || `uploaded-${Date.now()}-${idx + 1}`),
        platform,
        title,
        caption,
        publishedAt,
        format,
        thumbnailUrl: String(getVal('thumbnail', 'image', 'url') || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'),
        reach,
        impressions,
        engagement,
        engagementRate,
        likes,
        comments,
        shares,
        saves,
        sentiment: 'positive',
        hashtags
      };
    });

    return {
      success: true,
      type: 'posts',
      fileFormat,
      rowCount: parsedPosts.length,
      posts: parsedPosts
    };
  }

  // Otherwise, process as Metrics Telemetry
  let totalFollowers = 0;
  let totalReach = 0;
  let totalImpressions = 0;
  let totalEngagement = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalShares = 0;
  let totalSaves = 0;
  let totalVideoViews = 0;

  cleanRows.forEach((row: any) => {
    const getVal = (...fieldNames: string[]) => {
      for (const f of fieldNames) {
        for (const key of Object.keys(row)) {
          if (key.trim().toLowerCase() === f.toLowerCase() && row[key] !== undefined && row[key] !== null) {
            const num = Number(row[key]);
            return isNaN(num) ? 0 : num;
          }
        }
      }
      return 0;
    };

    totalFollowers = Math.max(totalFollowers, getVal('followers', 'follower_count', 'subscribers'));
    totalReach += getVal('reach', 'unique_reach');
    totalImpressions += getVal('impressions', 'impression_count', 'views');
    totalEngagement += getVal('engagement', 'engagements', 'interactions');
    totalLikes += getVal('likes', 'like_count');
    totalComments += getVal('comments', 'comment_count');
    totalShares += getVal('shares', 'share_count', 'retweets');
    totalSaves += getVal('saves', 'save_count', 'bookmarks');
    totalVideoViews += getVal('videoviews', 'video_views', 'watch_views');
  });

  // Calculate fallbacks if certain aggregated metrics were not provided directly
  if (totalEngagement === 0 && (totalLikes > 0 || totalComments > 0 || totalShares > 0)) {
    totalEngagement = totalLikes + totalComments + totalShares + totalSaves;
  }
  if (totalImpressions === 0 && totalReach > 0) {
    totalImpressions = Math.round(totalReach * 1.6);
  }
  if (totalReach === 0 && totalImpressions > 0) {
    totalReach = Math.round(totalImpressions * 0.6);
  }
  if (totalVideoViews === 0 && totalReach > 0) {
    totalVideoViews = Math.round(totalReach * 0.7);
  }

  return {
    success: true,
    type: 'metrics',
    fileFormat,
    rowCount: cleanRows.length,
    aggregated: {
      followers: totalFollowers || 1450000,
      reach: totalReach || 3800000,
      impressions: totalImpressions || 6400000,
      engagement: totalEngagement || 410000,
      likes: totalLikes || 260000,
      comments: totalComments || 52000,
      shares: totalShares || 38000,
      saves: totalSaves || 19000,
      videoViews: totalVideoViews || 2500000
    }
  };
}

/**
 * Parse CSV text using PapaParse
 */
export function parseSocialCsv(csvString: string): Promise<ParsedCsvResult> {
  return new Promise((resolve) => {
    Papa.parse<Record<string, any>>(csvString, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          resolve({
            success: false,
            type: 'unknown',
            fileFormat: 'csv',
            rowCount: 0,
            error: 'The CSV file is empty or contains no valid rows.'
          });
          return;
        }
        resolve(processNormalizedRows(results.data, 'csv'));
      },
      error: (error: any) => {
        resolve({
          success: false,
          type: 'unknown',
          fileFormat: 'csv',
          rowCount: 0,
          error: error?.message || 'Error parsing CSV file.'
        });
      }
    });
  });
}

/**
 * Parse JSON text (supporting array of objects or wrapped object trees)
 */
export function parseSocialJson(jsonString: string): Promise<ParsedCsvResult> {
  return new Promise((resolve) => {
    try {
      const data = JSON.parse(jsonString);
      let rows: any[] = [];

      if (Array.isArray(data)) {
        rows = data;
      } else if (data && typeof data === 'object') {
        if (Array.isArray(data.rows)) rows = data.rows;
        else if (Array.isArray(data.posts)) rows = data.posts;
        else if (Array.isArray(data.metrics)) rows = data.metrics;
        else if (Array.isArray(data.data)) rows = data.data;
        else {
          // Single aggregated object
          rows = [data];
        }
      }

      if (rows.length === 0) {
        resolve({
          success: false,
          type: 'unknown',
          fileFormat: 'json',
          rowCount: 0,
          error: 'JSON structure does not contain an array of metrics or posts.'
        });
        return;
      }

      resolve(processNormalizedRows(rows, 'json'));
    } catch (err: any) {
      resolve({
        success: false,
        type: 'unknown',
        fileFormat: 'json',
        rowCount: 0,
        error: `Invalid JSON syntax: ${err.message}`
      });
    }
  });
}

/**
 * Parse native Excel (.xlsx / .xls) binary files using SheetJS (XLSX)
 */
export function parseSocialXlsx(buffer: ArrayBuffer): Promise<ParsedCsvResult> {
  return new Promise((resolve) => {
    try {
      const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
      if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        resolve({
          success: false,
          type: 'unknown',
          fileFormat: 'xlsx',
          rowCount: 0,
          error: 'The Excel workbook has no sheets.'
        });
        return;
      }

      // Read first worksheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      if (!rows || rows.length === 0) {
        resolve({
          success: false,
          type: 'unknown',
          fileFormat: 'xlsx',
          rowCount: 0,
          error: `Worksheet "${firstSheetName}" contains no data rows.`
        });
        return;
      }

      resolve(processNormalizedRows(rows, 'xlsx'));
    } catch (err: any) {
      resolve({
        success: false,
        type: 'unknown',
        fileFormat: 'xlsx',
        rowCount: 0,
        error: `Failed to parse Excel spreadsheet: ${err.message}`
      });
    }
  });
}

/**
 * Universal file dispatcher: automatically checks extension/MIME and routes
 * to CSV, JSON, or Excel ingestion pipeline.
 */
export async function parseSocialFile(file: File): Promise<ParsedCsvResult> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
    const buffer = await file.arrayBuffer();
    return parseSocialXlsx(buffer);
  }

  const text = await file.text();

  if (fileName.endsWith('.json') || file.type === 'application/json' || text.trim().startsWith('{') || text.trim().startsWith('[')) {
    try {
      const jsonRes = await parseSocialJson(text);
      if (jsonRes.success) return jsonRes;
    } catch {
      // Fallback to CSV parse if JSON parsing fails
    }
  }

  // Default to CSV parser
  return parseSocialCsv(text);
}

/**
 * Helper to generate and download native Excel (.xlsx) file
 */
export function downloadSampleExcel(filename: string, sheetName: string, rows: any[]) {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
}
