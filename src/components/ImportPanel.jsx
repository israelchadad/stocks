import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Database, FileSpreadsheet, UploadCloud } from 'lucide-react';
import { FIELD_LABELS, initialStocksDb } from '../data/constants';
import { buildInitialMapping, guessField } from '../utils/xlsxMapper';
import { fmtPct, fmtDollar, fmtNum } from '../utils/formatters';

export default function ImportPanel({ onImport }) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({});
  const [status, setStatus] = useState('');

  function processRaw(json, name) {
    if (!json || json.length < 2) { setStatus('קובץ ריק או לא תקין'); return; }
    const hdrs = json[0].map(h => String(h ?? '').trim());
    const dataRows = json.slice(1).filter(r => r.some(c => c !== undefined && c !== '' && c !== null));
    setHeaders(hdrs);
    setRows(dataRows);
    setMapping(buildInitialMapping(hdrs));
    setStatus(`✓ ${name}: ${dataRows.length} שורות, ${hdrs.length} עמודות`);
  }

  function handleFile(file) {
    if (!file) return;
    setStatus('טוען...');
    const isCsv = file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv';
    const reader = new FileReader();
    if (isCsv) {
      reader.onload = e => {
        try {
          const wb = XLSX.read(e.target.result, { type: 'string' });
          processRaw(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, raw: false }), file.name);
        } catch(err) { setStatus('שגיאת CSV: ' + err.message); }
      };
      reader.readAsText(file, 'UTF-8');
    } else {
      reader.onload = e => {
        try {
          const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
          processRaw(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 }), file.name);
        } catch(err) { setStatus('שגיאת Excel: ' + err.message); }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  function confirmImport() {
    try {
      const newDb = {};
      rows.forEach((row, ri) => {
        const item = {};
        Object.entries(mapping).forEach(([f, ci]) => { if (ci !== '') item[f] = row[ci] ?? ''; });
        const key = item.ticker ? String(item.ticker).trim().toUpperCase() : `STOCK_${ri + 1}`;
        if (!item.name && key.startsWith('STOCK_')) return;
        newDb[key] = {
          name: item.name ? String(item.name).trim() : key,
          price: fmtDollar(item.price), dailyChange: fmtPct(item.dailyChange),
          volume: item.volume ? String(item.volume).trim() : '0.00M',
          marketcap: fmtDollar(item.marketcap),
          peTtm: fmtNum(item.peTtm), pe2026: fmtNum(item.pe2026), cagr: fmtPct(item.cagr),
          peg: fmtNum(item.peg), peg2026: fmtNum(item.peg2026), beta: fmtNum(item.beta),
          high52: fmtPct(item.high52), low52: fmtPct(item.low52),
          m1: fmtPct(item.m1), m3: fmtPct(item.m3), m6: fmtPct(item.m6),
          m12: fmtPct(item.m12), ytd: fmtPct(item.ytd),
          epsTtm: fmtNum(item.epsTtm), eps26: fmtNum(item.eps26),
          eps27: fmtNum(item.eps27), eps28: fmtNum(item.eps28),
          recommendation: 'קנייה (BUY)',
          desc: `חברת ${item.name || key} - פרטים מקובץ Excel. יש לערוך.`,
          aiRel: 'יש לערוך טקסט זה.', moat: 'יש לערוך טקסט זה.',
          perfReason: 'יש לערוך טקסט זה.', investorCall: 'יש לערוך טקסט זה.',
          sections: null,
        };
      });
      if (!Object.keys(newDb).length) { setStatus('לא נמצאו נתונים תקינים'); return; }
      onImport(newDb);
      const now = new Date();
      localStorage.setItem('last_import_date_v3',
        `${String(now.getDate()).padStart(2,'0')}.${String(now.getMonth()+1).padStart(2,'0')}.${now.getFullYear()} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
      setOpen(false); setRows([]); setHeaders([]); setStatus('');
      alert(`ייבוא הושלם! נוספו ${Object.keys(newDb).length} מניות.`);
    } catch(err) { setStatus('שגיאה: ' + err.message); }
  }

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
      <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2 mb-2">
        <Database className="text-emerald-600 w-4 h-4" />
        ייבוא נתונים מ-Excel
      </h3>
      <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">
        העלה קובץ XLSX עם נתוני מניות (Ticker, Company Name, Price...)
      </p>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
      >
        <FileSpreadsheet className="w-4 h-4" />
        פתח ייבוא נתונים
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-emerald-300 border-dashed rounded-lg cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition-all">
            <UploadCloud className="w-5 h-5 text-emerald-500 mb-0.5" />
            <p className="text-[10px] text-emerald-700 font-bold">לחץ / גרור: XLSX או CSV</p>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={e => handleFile(e.target.files[0])}
            />
          </label>

          {status && <div className="text-[10px] text-center text-slate-500">{status}</div>}

          {headers.length > 0 && (
            <>
              <p className="text-[10px] font-bold text-slate-700">מיפוי עמודות:</p>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(FIELD_LABELS).map(([field, label]) => (
                  <div key={field}>
                    <span className="text-[9px] text-slate-500 block">{label}</span>
                    <select
                      value={mapping[field] ?? ''}
                      onChange={e => setMapping(m => ({ ...m, [field]: e.target.value === '' ? '' : parseInt(e.target.value) }))}
                      className="text-[9px] border border-slate-300 rounded px-1 py-0.5 w-full focus:outline-none"
                    >
                      <option value="">-- לא ממופה --</option>
                      {headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <button
                onClick={confirmImport}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded text-xs font-bold"
              >
                אשר ייבוא נתונים
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
