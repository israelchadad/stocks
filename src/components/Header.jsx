import { TrendingUp, Code, FileText, Printer, Menu } from 'lucide-react';

export default function Header({ onExportHTML, onExportWord, onPrint, onReset, onToggleMobile }) {
  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-3 py-2 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMobile}
            className="mobile-toggle bg-slate-700 hover:bg-slate-600 p-2 rounded-lg items-center gap-1"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none">REPORT GENERATOR</h1>
            <span className="text-[9px] text-slate-400 hidden sm:block">
              מחולל דוחות מחקר אינטראקטיביים - AI &amp; טכנולוגיה
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onExportHTML}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 text-xs"
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ייצוא ל-</span>HTML
          </button>
          <button
            onClick={onExportWord}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 text-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ייצוא ל-</span>DOCX
          </button>
          <button
            onClick={onPrint}
            className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 text-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={onReset}
            className="bg-rose-950 hover:bg-rose-900 text-rose-200 px-2.5 py-1.5 rounded-lg text-xs border border-rose-800"
          >
            איפוס
          </button>
        </div>
      </div>
    </header>
  );
}
