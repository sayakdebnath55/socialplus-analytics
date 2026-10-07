import * as XLSX from 'xlsx';
import { parseSocialCsv, parseSocialJson, parseSocialXlsx, processNormalizedRows } from './src/utils/csvParser.ts';

async function runTests() {
  console.log('--- Starting Ingestion Pipeline & Routing Verification ---\n');
  let passed = 0;
  let failed = 0;

  function assert(name, condition) {
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name}`);
      failed++;
    }
  }

  // 1. Test CSV Parsing
  const csvData = `Date,Platform,Followers,Reach,Impressions,Engagement,Likes,Comments,Shares,Saves,VideoViews
2026-10-01,Instagram,500000,40000,65000,4000,3000,400,400,200,25000
2026-10-02,Instagram,505000,42000,70000,4500,3400,500,400,200,28000`;
  const csvRes = await parseSocialCsv(csvData);
  assert('CSV Metrics Parsing succeeded', csvRes.success && csvRes.type === 'metrics');
  assert('CSV Metrics row count matches', csvRes.rowCount === 2);
  assert('CSV Total Reach aggregated correctly', csvRes.aggregated?.reach === 82000);
  assert('CSV Total Likes aggregated correctly', csvRes.aggregated?.likes === 6400);

  // 2. Test CSV Posts Parsing
  const csvPosts = `PostId,Platform,Caption,Format,PublishedAt,Reach,Likes,Shares
P1,Instagram,"Testing 123 #AI",carousel,2026-10-01,50000,4000,500
P2,YouTube,"Tech review",video,2026-10-02,80000,7000,900`;
  const postsRes = await parseSocialCsv(csvPosts);
  assert('CSV Posts Parsing succeeded', postsRes.success && postsRes.type === 'posts');
  assert('CSV Posts count is 2', postsRes.rowCount === 2 && postsRes.posts?.length === 2);
  assert('CSV Post hashtag extracted', postsRes.posts?.[0].hashtags.includes('#AI'));

  // 3. Test JSON Metrics Parsing
  const jsonData = JSON.stringify([
    { platform: 'YouTube', followers: 380000, reach: 95000, impressions: 160000, likes: 8000, comments: 1200, shares: 900, saves: 400, videoViews: 92000 },
    { platform: 'LinkedIn', followers: 140000, reach: 45000, impressions: 72000, likes: 3200, comments: 650, shares: 700, saves: 280, videoViews: 18000 }
  ]);
  const jsonRes = await parseSocialJson(jsonData);
  assert('JSON Metrics Parsing succeeded', jsonRes.success && jsonRes.type === 'metrics');
  assert('JSON Total Reach aggregated', jsonRes.aggregated?.reach === 140000);
  assert('JSON Total Followers computed', jsonRes.aggregated?.followers === 380000);

  // 4. Test Native Excel (.xlsx) Parsing via SheetJS buffer
  const excelRows = [
    { Date: '2026-10-05', Platform: 'Twitter', Followers: 170000, Reach: 55000, Impressions: 92000, Likes: 4100, Comments: 620, Shares: 850, Saves: 120, VideoViews: 22000 },
    { Date: '2026-10-06', Platform: 'Facebook', Followers: 215000, Reach: 38000, Impressions: 58000, Likes: 2800, Comments: 410, Shares: 390, Saves: 80, VideoViews: 14000 }
  ];
  const ws = XLSX.utils.json_to_sheet(excelRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'TestMetrics');
  const xlsxBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });

  const xlsxRes = await parseSocialXlsx(xlsxBuffer);
  assert('Excel (.xlsx) Parsing succeeded', xlsxRes.success && xlsxRes.type === 'metrics');
  assert('Excel Format identified as xlsx', xlsxRes.fileFormat === 'xlsx');
  assert('Excel Row count is 2', xlsxRes.rowCount === 2);
  assert('Excel Reach aggregated correctly', xlsxRes.aggregated?.reach === 93000);
  assert('Excel Likes aggregated correctly', xlsxRes.aggregated?.likes === 6900);

  // 5. Test Excel Posts Parsing
  const excelPostRows = [
    { PostId: 'EX-1', Platform: 'Instagram', Caption: 'Excel ingested carousel! #Automation', Format: 'carousel', Likes: 5200, Shares: 1100, Reach: 65000 },
    { PostId: 'EX-2', Platform: 'LinkedIn', Caption: 'B2B Case Study in Spreadsheet format', Format: 'article', Likes: 2300, Shares: 450, Reach: 34000 }
  ];
  const wsPosts = XLSX.utils.json_to_sheet(excelPostRows);
  const wbPosts = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wbPosts, wsPosts, 'Posts');
  const xlsxPostsBuffer = XLSX.write(wbPosts, { type: 'array', bookType: 'xlsx' });

  const xlsxPostsRes = await parseSocialXlsx(xlsxPostsBuffer);
  assert('Excel (.xlsx) Posts Parsing succeeded', xlsxPostsRes.success && xlsxPostsRes.type === 'posts');
  assert('Excel Posts count is 2', xlsxPostsRes.rowCount === 2);
  assert('Excel Post #1 caption preserved', xlsxPostsRes.posts?.[0].caption.includes('Excel ingested'));

  // 6. Test Error Handling
  const emptyRes = await parseSocialCsv('');
  assert('Empty CSV yields graceful error', !emptyRes.success && emptyRes.error !== undefined);

  const corruptJson = await parseSocialJson('{ broken json');
  assert('Corrupt JSON yields graceful error', !corruptJson.success && corruptJson.error !== undefined);

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests();
