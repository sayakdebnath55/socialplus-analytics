import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Download, CheckCircle2, AlertCircle, X, RefreshCw, FileSpreadsheet, Code2 } from 'lucide-react';
import { parseSocialFile, parseSocialCsv, parseSocialJson, downloadSampleExcel, ParsedCsvResult } from '../../utils/csvParser';
import { SAMPLE_METRICS_CSV, SAMPLE_POSTS_CSV, downloadSampleCsv } from '../../data/csvTemplates';

interface DataUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataLoaded: (result: ParsedCsvResult) => void;
}

export const DataUploadModal: React.FC<DataUploadModalProps> = ({ isOpen, onClose, onDataLoaded }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [rawText, setRawText] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'templates'>('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [parseStatus, setParseStatus] = useState<ParsedCsvResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileProcess = async (file: File) => {
    setIsLoading(true);
    setSelectedFileName(file.name);
    try {
      const res = await parseSocialFile(file);
      setParseStatus(res);
    } catch (err: any) {
      setParseStatus({
        success: false,
        type: 'unknown',
        rowCount: 0,
        error: err.message || 'Failed to read file'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handlePasteSubmit = async () => {
    if (!rawText.trim()) return;
    setIsLoading(true);
    try {
      // Auto-detect JSON or CSV in pasted text
      let res: ParsedCsvResult;
      if (rawText.trim().startsWith('{') || rawText.trim().startsWith('[')) {
        res = await parseSocialJson(rawText);
      } else {
        res = await parseSocialCsv(rawText);
      }
      setParseStatus(res);
    } finally {
      setIsLoading(false);
    }
  };

  const applyData = () => {
    if (parseStatus && parseStatus.success) {
      onDataLoaded(parseStatus);
      onClose();
    }
  };

  const handleDownloadExcelSample = () => {
    const sampleRows = [
      { Date: '2026-10-01', Platform: 'Instagram', Followers: 520000, Reach: 42000, Impressions: 68000, Engagement: 4200, Likes: 3100, Comments: 450, Shares: 420, Saves: 230, VideoViews: 28000 },
      { Date: '2026-10-01', Platform: 'YouTube', Followers: 380000, Reach: 31000, Impressions: 52000, Engagement: 3900, Likes: 2800, Comments: 710, Shares: 290, Saves: 100, VideoViews: 45000 },
      { Date: '2026-10-01', Platform: 'LinkedIn', Followers: 140000, Reach: 14000, Impressions: 22000, Engagement: 1600, Likes: 1100, Comments: 240, Shares: 190, Saves: 70, VideoViews: 6000 },
      { Date: '2026-10-01', Platform: 'Twitter', Followers: 166000, Reach: 26000, Impressions: 44000, Engagement: 1950, Likes: 1300, Comments: 310, Shares: 300, Saves: 40, VideoViews: 10000 },
      { Date: '2026-10-01', Platform: 'Facebook', Followers: 214000, Reach: 20500, Impressions: 31000, Engagement: 1400, Likes: 980, Comments: 180, Shares: 200, Saves: 40, VideoViews: 9500 },
      { Date: '2026-10-02', Platform: 'Instagram', Followers: 520800, Reach: 45000, Impressions: 74000, Engagement: 4600, Likes: 3400, Comments: 490, Shares: 460, Saves: 250, VideoViews: 31000 }
    ];
    downloadSampleExcel('socialpulse_metrics_template.xlsx', 'SocialMetrics', sampleRows);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <UploadCloud className="text-brand-400" size={22} />
              Connect & Upload Social Media Data
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Import CSV, Excel (.xlsx), or JSON data exports from Instagram, YouTube, Facebook, X, or LinkedIn.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selectors */}
        <div className="flex items-center gap-2 mt-4 border-b border-slate-800 pb-2 shrink-0">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            File Upload (CSV / XLSX / JSON)
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'paste'
                ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Paste Raw CSV / JSON
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'templates'
                ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Download Sample Templates
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-4 overflow-y-auto flex-1">
          {activeTab === 'upload' && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv,application/json,.json,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
                  dragActive
                    ? 'border-brand-400 bg-brand-500/10'
                    : 'border-slate-700 bg-slate-950/40 hover:border-slate-500 hover:bg-slate-950/70'
                }`}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 mb-3">
                  <UploadCloud size={28} />
                </div>
                <h4 className="text-sm font-semibold text-slate-200">
                  {selectedFileName ? selectedFileName : 'Drag & drop CSV, Excel (.xlsx), or JSON file here'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Automatically parses columns, calculates metrics, and updates dashboard KPIs.
                </p>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-300 border border-slate-700">.CSV</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-emerald-300 border border-slate-700">.XLSX (Excel)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-amber-300 border border-slate-700">.JSON</span>
                </div>

                <span className="inline-block mt-4 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors">
                  Browse Files
                </span>
              </div>
            </div>
          )}

          {activeTab === 'paste' && (
            <div className="space-y-3">
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Date,Platform,Followers,Reach,Impressions,Engagement,Likes,Comments,Shares,Saves,VideoViews&#10;2026-10-01,Instagram,520000,42000,68000,4200,3100,450,420,230,28000&#10;&#10;Or paste a JSON array [ { ... } ]"
                rows={8}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
              />
              <button
                onClick={handlePasteSubmit}
                disabled={!rawText.trim() || isLoading}
                className="px-4 py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500 disabled:opacity-50 transition-colors"
              >
                Parse & Validate Data
              </button>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-4 py-2">
              <p className="text-xs text-slate-400">
                Download structured templates ready to populate into SocialPulse Analytics:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-white font-medium text-xs">
                      <FileSpreadsheet size={16} className="text-emerald-400" />
                      Excel Metrics Template
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Native .XLSX workbook with multi-platform sheets.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadExcelSample}
                    className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors"
                  >
                    <Download size={13} /> .XLSX Excel
                  </button>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-white font-medium text-xs">
                      <FileText size={16} className="text-cyan-400" />
                      Daily Metrics CSV
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Followers, Reach, Impressions, Engagements, Views.
                    </p>
                  </div>
                  <button
                    onClick={() => downloadSampleCsv('socialpulse_metrics_template.csv', SAMPLE_METRICS_CSV)}
                    className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors"
                  >
                    <Download size={13} /> .CSV Metrics
                  </button>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-white font-medium text-xs">
                      <Code2 size={16} className="text-violet-400" />
                      Posts Content CSV
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      PostId, Platform, Caption, Format, Reach, Likes.
                    </p>
                  </div>
                  <button
                    onClick={() => downloadSampleCsv('socialpulse_posts_template.csv', SAMPLE_POSTS_CSV)}
                    className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors"
                  >
                    <Download size={13} /> .CSV Posts
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Parse Status Feedback */}
          {isLoading && (
            <div className="mt-4 flex items-center gap-2 text-xs text-brand-300">
              <RefreshCw size={14} className="animate-spin" />
              Parsing file contents and aggregating data points...
            </div>
          )}

          {parseStatus && (
            <div className={`mt-4 rounded-xl p-3 border text-xs ${
              parseStatus.success
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <div className="flex items-start gap-2">
                {parseStatus.success ? (
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-400" />
                ) : (
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                )}
                <div className="flex-1">
                  <div className="font-semibold flex items-center justify-between">
                    <span>{parseStatus.success ? 'Data Parsed Successfully' : 'Parse Error'}</span>
                    {parseStatus.fileFormat && (
                      <span className="uppercase text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Format: {parseStatus.fileFormat}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 opacity-90">
                    {parseStatus.success
                      ? `Detected ${parseStatus.rowCount} valid records of ${parseStatus.type === 'posts' ? 'Social Post Content' : 'Aggregated Metric Telemetry'}.`
                      : parseStatus.error}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={applyData}
            disabled={!parseStatus || !parseStatus.success}
            className="flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:hover:bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-brand-600/30 transition-all"
          >
            Apply to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
