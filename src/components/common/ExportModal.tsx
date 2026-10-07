import React, { useState } from 'react';
import { Download, FileText, Check, Printer, FileSpreadsheet, Code2, X } from 'lucide-react';
import { KpiMetric } from '../../types/analytics';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpis: KpiMetric[];
  activePlatform: string;
  activeRange: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  kpis,
  activePlatform,
  activeRange
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'csv' | 'json' | 'pdf'>('csv');

  if (!isOpen) return null;

  const handleExportCsv = () => {
    let csv = 'Metric,Current Value,Previous Value,Change Percent,Trend\n';
    kpis.forEach(k => {
      csv += `"${k.label}","${k.formattedValue}","${k.formattedPreviousValue}","${k.change}%","${k.trend}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `socialpulse_report_${activePlatform}_${activeRange}_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleExportJson = () => {
    const data = {
      platform: activePlatform,
      dateRange: activeRange,
      exportedAt: new Date().toISOString(),
      kpis: kpis.map(k => ({
        id: k.id,
        label: k.label,
        value: k.value,
        formattedValue: k.formattedValue,
        change: k.change,
        previousValue: k.previousValue,
        trend: k.trend
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `socialpulse_metrics_${activePlatform}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
  };

  const handlePrintPdf = () => {
    window.print();
    onClose();
  };

  const handleCopySummary = () => {
    const text = `📊 SocialPulse Analytics Report (${activePlatform.toUpperCase()} - ${activeRange.toUpperCase()})\n` +
      kpis.map(k => `• ${k.label}: ${k.formattedValue} (${k.change >= 0 ? '+' : ''}${k.change}% vs prev)`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Download className="text-brand-400" size={20} />
            <h2 className="text-lg font-bold text-white">Export Analytics Report</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-3">
          Download or print the current analytics metrics for <span className="text-white font-medium capitalize">{activePlatform}</span> ({activeRange.toUpperCase()}).
        </p>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <button
            onClick={() => setDownloadFormat('csv')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
              downloadFormat === 'csv'
                ? 'border-brand-500 bg-brand-500/10 text-white'
                : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white'
            }`}
          >
            <FileSpreadsheet size={24} className={downloadFormat === 'csv' ? 'text-brand-400' : 'text-slate-400'} />
            <span className="text-xs font-semibold">CSV Data</span>
          </button>

          <button
            onClick={() => setDownloadFormat('pdf')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
              downloadFormat === 'pdf'
                ? 'border-brand-500 bg-brand-500/10 text-white'
                : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Printer size={24} className={downloadFormat === 'pdf' ? 'text-brand-400' : 'text-slate-400'} />
            <span className="text-xs font-semibold">Print / PDF</span>
          </button>

          <button
            onClick={() => setDownloadFormat('json')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
              downloadFormat === 'json'
                ? 'border-brand-500 bg-brand-500/10 text-white'
                : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Code2 size={24} className={downloadFormat === 'json' ? 'text-brand-400' : 'text-slate-400'} />
            <span className="text-xs font-semibold">JSON Export</span>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-brand-300 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <FileText size={14} />}
            {copied ? 'Copied Summary!' : 'Copy Summary Text'}
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={
                downloadFormat === 'csv'
                  ? handleExportCsv
                  : downloadFormat === 'pdf'
                  ? handlePrintPdf
                  : handleExportJson
              }
              className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/30 transition-all flex items-center gap-1.5"
            >
              <Download size={14} />
              Confirm Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
