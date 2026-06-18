import { useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { Upload, LineChart, BarChart2 } from 'lucide-react';
import EditableField from './EditableField';
import { perfColor, perfArrow, isNeg, stripArrow } from '../utils/formatters';

function DynIcon({ name, className }) {
  const pascal = name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
  const Icon = LucideIcons[pascal];
  return Icon ? <Icon className={className} /> : <span>●</span>;
}

function PerfVal({ value, onChange }) {
  const raw = stripArrow(value);
  const color = perfColor(raw);
  const arrow = perfArrow(raw);
  return (
    <EditableField
      tag="span"
      value={raw}
      onChange={v => onChange(stripArrow(v))}
      className="font-bold font-sans perf-val"
      style={{ color, direction: 'ltr' }}
      data-raw={raw}
    />
  );
}

function EpsChart({ stock, onUpdate }) {
  const vals = [
    parseFloat(stock.epsTtm) || 0,
    parseFloat(stock.eps26)  || 0,
    parseFloat(stock.eps27)  || 0,
    parseFloat(stock.eps28)  || 0,
  ];
  const mx = Math.max(...vals, 0.01);
  const h = v => `${Math.max(4, (v / mx) * 88)}%`;

  const bars = [
    { id: 'epsTtm', field: 'epsTtm', label: 'TTM',  color: 'bg-slate-400', val: vals[0] },
    { id: 'eps26',  field: 'eps26',  label: '2026', color: 'bg-blue-500',  val: vals[1] },
    { id: 'eps27',  field: 'eps27',  label: '2027', color: 'bg-blue-500',  val: vals[2] },
    { id: 'eps28',  field: 'eps28',  label: '2028', color: 'bg-blue-500',  val: vals[3] },
  ];

  return (
    <div className="bar-chart-container">
      {bars.map((b, i) => (
        <div key={b.id} className="bar-chart-bar-wrap">
          <EditableField
            tag="div"
            value={stock[b.field]}
            onChange={v => onUpdate({ [b.field]: v })}
            className={`bar-chart-val ${i === 0 ? 'text-slate-300' : 'text-slate-200'}`}
          />
          <div
            className={`bar-chart-bar ${b.color}`}
            style={{ height: h(b.val) }}
            data-val={b.val.toFixed(2)}
          />
          <div className="bar-chart-label">{b.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Report({
  ticker, stock, sections, onUpdateStock, onUpdateSections,
  logoSrc, logoTextMain, logoTextSub, headerDate, headerAuthor, headerContact,
  onLogoUpdate, onUpdateLogoTextMain, onUpdateLogoTextSub,
  onUpdateHeaderDate, onUpdateHeaderAuthor, onUpdateHeaderContact,
  onOpenIconPicker,
}) {
  const logoInputRef = useRef(null);

  function handleLogoFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onLogoUpdate(ev.target.result);
    reader.readAsDataURL(file);
  }

  const DEFAULT_LOGO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%231e293b' stroke-width='2'><polygon points='12 2 2 7 12 12 22 7 12 2'></polygon><polyline points='2 17 12 22 22 17'></polyline><polyline points='2 12 12 17 22 12'></polyline></svg>";

  const dailyClass = isNeg(stock.dailyChange)
    ? 'font-extrabold text-rose-600 font-sans'
    : 'font-extrabold text-emerald-600 font-sans';

  return (
    <div className="report-page" id="activeReport">
      <div className="report-content">

        {/* ── Report Header ── */}
        <div className="flex justify-between items-center border-b-2 border-slate-900 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="relative group cursor-pointer shrink-0" onClick={() => logoInputRef.current?.click()}>
              <img
                src={logoSrc || DEFAULT_LOGO}
                className="w-9 h-9 object-contain rounded border border-dashed border-slate-300 p-0.5 bg-slate-50"
                alt="לוגו"
              />
              <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-3 h-3 text-white" />
              </div>
              <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoFile} />
            </div>
            <div>
              <EditableField
                tag="div"
                value={logoTextMain}
                onChange={onUpdateLogoTextMain}
                className="text-xl font-black text-slate-900 tracking-wider leading-none"
              />
              <EditableField
                tag="div"
                value={logoTextSub}
                onChange={onUpdateLogoTextSub}
                className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5"
              />
            </div>
          </div>
          <div className="text-left text-[10px] text-slate-600">
            <EditableField tag="div" value={headerDate} onChange={onUpdateHeaderDate} className="font-bold" />
            <EditableField tag="div" value={headerAuthor} onChange={onUpdateHeaderAuthor} />
            <EditableField tag="div" value={headerContact} onChange={onUpdateHeaderContact} />
          </div>
        </div>

        {/* ── Title Banner ── */}
        <div className="bg-slate-900 text-white p-3 rounded-lg flex justify-between items-center mb-3">
          <div>
            <EditableField
              tag="span"
              value={ticker}
              onChange={v => onUpdateStock({ ticker: v })}
              className="bg-blue-600 text-[9px] text-white px-1.5 py-0.5 rounded font-bold uppercase"
            />
            <EditableField
              tag="h2"
              value={stock.name}
              onChange={v => onUpdateStock({ name: v })}
              className="text-base font-extrabold mt-1"
            />
            <EditableField
              tag="p"
              value={stock.headerSubtitle || 'עדכון אנליזה - דוח רבעוני ועדכון ממודל הערכת שווי'}
              onChange={v => onUpdateStock({ headerSubtitle: v })}
              className="text-[10px] text-slate-400"
            />
          </div>
          <div className="text-left">
            <EditableField
              tag="div"
              value={stock.headerRecLabel || 'המלצה ומחיר יעד'}
              onChange={v => onUpdateStock({ headerRecLabel: v })}
              className="text-[9px] text-slate-300 font-semibold"
            />
            <EditableField
              tag="div"
              value={stock.recommendation || 'קנייה (BUY)'}
              onChange={v => onUpdateStock({ recommendation: v })}
              className="text-sm font-bold text-emerald-400"
            />
            <div className="text-[10px] text-slate-200">
              מחיר שוק:{' '}
              <EditableField
                tag="span"
                value={stock.price}
                onChange={v => onUpdateStock({ price: v })}
              />
            </div>
          </div>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Sections column */}
          <div className="md:col-span-8 flex flex-col gap-2.5 border-r border-slate-100 pr-3">
            {sections.map(sec => (
              <div key={sec.id} className="section-block">
                <div className="flex items-center mb-0.5">
                  <h3 className="text-xs font-extrabold text-slate-900 border-b-2 border-slate-900 pb-0.5 flex items-center gap-1.5 flex-1 min-w-0 w-full">
                    <button
                      onClick={() => onOpenIconPicker(sec.id)}
                      className="no-print hover:bg-slate-100 rounded p-0.5 shrink-0 transition-all"
                    >
                      <DynIcon name={sec.icon} className="w-3.5 h-3.5 text-slate-800" />
                    </button>
                    <EditableField
                      tag="span"
                      value={sec.title}
                      onChange={v => {
                        const updated = sections.map(s => s.id === sec.id ? { ...s, title: v } : s);
                        onUpdateSections(updated);
                      }}
                      className="outline-none"
                    />
                  </h3>
                </div>
                <EditableField
                  tag="div"
                  value={sec.content || ''}
                  onChange={v => {
                    const updated = sections.map(s => s.id === sec.id ? { ...s, content: v } : s);
                    onUpdateSections(updated);
                  }}
                  className="text-[11px] text-slate-700 mt-0.5 leading-normal text-justify whitespace-pre-line"
                  style={{ fontSize: '0.77rem', color: 'black' }}
                />
              </div>
            ))}
          </div>

          {/* Right column: indicators + chart + disclosure */}
          <div className="md:col-span-4 flex flex-col gap-2.5">

            {/* Financial indicators */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
              <h3 className="text-[12px] font-black text-slate-900 border-b border-slate-300 pb-1 mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                <LineChart className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <EditableField
                  tag="span"
                  value={stock.indCardTitle || 'אינדיקטורים פיננסיים מרכזיים'}
                  onChange={v => onUpdateStock({ indCardTitle: v })}
                />
              </h3>
              <div className="flex flex-col gap-0.5">
                {[
                  { label: 'שווי שוק:',        field: 'marketcap',   className: 'text-slate-800' },
                  { label: 'מחיר מניה:',        field: 'price',       className: '' },
                ].map(({ label, field, className }) => (
                  <div key={field} className="ind-row-c">
                    <span className="ind-lbl">{label}</span>
                    <EditableField tag="span" value={stock[field]} onChange={v => onUpdateStock({ [field]: v })} className={`ind-val ${className}`} />
                  </div>
                ))}

                <div className="ind-row-c">
                  <span className="ind-lbl">שינוי יומי:</span>
                  <EditableField
                    tag="span"
                    value={stock.dailyChange}
                    onChange={v => onUpdateStock({ dailyChange: v })}
                    className={`ind-val ${dailyClass}`}
                    style={{ direction: 'ltr' }}
                  />
                </div>

                {[
                  { label: 'מחזור מסחר:', field: 'volume' },
                ].map(({ label, field }) => (
                  <div key={field} className="ind-row-c">
                    <span className="ind-lbl">{label}</span>
                    <EditableField tag="span" value={stock[field]} onChange={v => onUpdateStock({ [field]: v })} className="ind-val" />
                  </div>
                ))}

                <div className="border-t border-slate-200 my-0.5" />

                {[
                  { label: 'מכפיל רווח (TTM):', field: 'peTtm',  cls: '' },
                  { label: 'P/E 2026:',           field: 'pe2026', cls: 'text-blue-700' },
                  { label: 'CAGR:',               field: 'cagr',   cls: '' },
                  { label: 'PEG:',                field: 'peg',    cls: '' },
                  { label: 'PEG 2026:',           field: 'peg2026',cls: 'text-emerald-700' },
                  { label: 'בטא (Beta):',         field: 'beta',   cls: '' },
                ].map(({ label, field, cls }) => (
                  <div key={field} className="ind-row-c">
                    <span className="ind-lbl">{label}</span>
                    <EditableField tag="span" value={stock[field]} onChange={v => onUpdateStock({ [field]: v })} className={`ind-val ${cls}`} />
                  </div>
                ))}

                <div className="border-t border-slate-200 my-0.5" />

                <div className="ind-row-c">
                  <span className="ind-lbl">גבוה 52 שבועות:</span>
                  <EditableField tag="span" value={stock.high52} onChange={v => onUpdateStock({ high52: v })} className="ind-val text-rose-700 font-sans" style={{ direction: 'ltr' }} />
                </div>
                <div className="ind-row-c">
                  <span className="ind-lbl">נמוך 52 שבועות:</span>
                  <EditableField tag="span" value={stock.low52} onChange={v => onUpdateStock({ low52: v })} className="ind-val text-emerald-700 font-sans" style={{ direction: 'ltr' }} />
                </div>

                <div className="border-t border-slate-200 my-0.5" />
                <div className="text-[12px] font-bold text-slate-700 mb-0.5">תשואות לתקופות מסחר:</div>

                <div className="grid grid-cols-2 gap-1 text-[12px]">
                  {[
                    { label: 'חודש:', field: 'm1' },
                    { label: '3M:',   field: 'm3' },
                    { label: '6M:',   field: 'm6' },
                    { label: '12M:',  field: 'm12' },
                  ].map(({ label, field }) => (
                    <div key={field} className="flex justify-between bg-white p-1 rounded border border-slate-100">
                      <span className="text-slate-400">{label}</span>
                      <PerfVal value={stock[field]} onChange={v => onUpdateStock({ [field]: v })} />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-[12px] bg-blue-50 p-1 rounded border border-blue-100">
                  <span className="text-blue-700 font-bold">YTD:</span>
                  <PerfVal value={stock.ytd} onChange={v => onUpdateStock({ ytd: v })} />
                </div>
              </div>
            </div>

            {/* EPS Bar Chart */}
            <div className="bg-slate-900 text-white rounded-xl p-3">
              <h3 className="text-[11px] font-black border-b border-slate-700 pb-1 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-slate-200">
                <BarChart2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <EditableField
                  tag="span"
                  value={stock.epsCardTitle || 'תחזית רווח למניה (EPS)'}
                  onChange={v => onUpdateStock({ epsCardTitle: v })}
                />
              </h3>
              <EpsChart stock={stock} onUpdate={onUpdateStock} />
            </div>

            {/* Disclosure */}
            <EditableField
              tag="div"
              value={stock.disclosureBlock || 'הצהרת גילוי נאות:\nדוח מחקר זה מבוסס על נתונים פיננסיים גלויים שנאספו נכון לרבעון הראשון לשנת 2026. הניתוח בוצע לצורך כלי סימולציה ומחקר מקצועי בלבד ואינו מהווה הצעה או ייעוץ לרכישת ניירות ערך כלשהם.'}
              onChange={v => onUpdateStock({ disclosureBlock: v })}
              className="p-2 border border-dashed border-slate-300 rounded-lg text-[9px] text-slate-500 leading-normal whitespace-pre-line"
            />
          </div>
        </div>
      </div>

      {/* Glossary */}
      <div className="mt-2 pt-2 border-t border-slate-100">
        <div className="text-[7.5px] text-slate-400 leading-relaxed">
          <span className="font-bold text-slate-500 text-[8px]">מקרא אינדיקטורים: </span>
          <b className="text-slate-500">P/E</b> — יחס בין מחיר המניה לרווח למניה; ככל שנמוך יותר, המניה זולה יחסית לרווחיה.
          <span className="mx-0.5 text-slate-300">|</span>
          <b className="text-slate-500">EPS</b> — רווח נקי חלקי מספר המניות; מדד ישיר לרווחיות.
          <span className="mx-0.5 text-slate-300">|</span>
          <b className="text-slate-500">CAGR</b> — שיעור צמיחה שנתי ממוצע לתקופת התחזית.
          <span className="mx-0.5 text-slate-300">|</span>
          <b className="text-slate-500">PEG</b> — מכפיל P/E חלקי קצב הצמיחה; ערך מתחת ל-1 מעיד על הזדמנות.
          <span className="mx-0.5 text-slate-300">|</span>
          <b className="text-slate-500">Beta</b> — תנודתיות המניה ביחס לשוק.
          <span className="mx-0.5 text-slate-300">|</span>
          <b className="text-slate-500">YTD</b> — תשואה מתחילת השנה הנוכחית.
        </div>
      </div>

      {/* Footer */}
      <div className="report-footer mt-3 flex justify-between items-center text-[9px] text-slate-400 border-t border-slate-100 pt-1.5">
        <EditableField
          tag="span"
          value={stock.footerTextL || 'כל הזכויות שמורות - זיו חודדה סקירת אנליסטים'}
          onChange={v => onUpdateStock({ footerTextL: v })}
        />
        <EditableField
          tag="span"
          value={stock.footerTextR || 'עמוד 1 מתוך 1'}
          onChange={v => onUpdateStock({ footerTextR: v })}
        />
      </div>
    </div>
  );
}
