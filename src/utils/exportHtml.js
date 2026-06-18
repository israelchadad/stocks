import { ICON_EMO } from '../data/constants';
import { perfColor, perfArrow, isNeg } from './formatters';

const ico = s => ICON_EMO[s] || '●';

export function buildStaticHtml({ ticker, stock, sections, logoSrc, logoTextMain, logoTextSub, headerDate, headerAuthor, headerContact }) {
  const v = [
    parseFloat(stock.epsTtm) || 0,
    parseFloat(stock.eps26)  || 0,
    parseFloat(stock.eps27)  || 0,
    parseFloat(stock.eps28)  || 0,
  ];
  const mx = Math.max(...v, 0.01);
  const pct = val => Math.round((val / mx) * 85);
  const dailyClr = isNeg(stock.dailyChange) ? '#dc2626' : '#059669';

  const perfCell = (lbl, val) =>
    `<div class="perf-cell"><span>${lbl}</span><b style="color:${perfColor(val)};direction:ltr;">${perfArrow(val)}${stripRaw(val)}</b></div>`;

  function stripRaw(s) { return String(s||'').replace(/^[▲▼⬆⬇↑↓]\s*/u,'').trim(); }

  const secHtml = sections.map(sec => `
<div style="margin-bottom:12px;">
  <div style="font-size:13px;font-weight:bold;color:#0f172a;border-bottom:1.5px solid #0f172a;padding-bottom:2px;margin-bottom:4px;">${ico(sec.icon)} ${sec.title}</div>
  <div style="font-size:12px;color:black;text-align:justify;line-height:1.4;">${(sec.content||'').replace(/\n/g,'<br>')}</div>
</div>`).join('');

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>דוח מחקר - ${ticker} - ${stock.name}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Assistant',Arial,sans-serif;background:#f3f4f6;direction:rtl;text-align:right;color:#1e293b;}
.page{width:210mm;min-height:297mm;background:white;margin:20px auto;padding:12mm 15mm;box-shadow:0 4px 20px rgba(0,0,0,.1);display:flex;flex-direction:column;}
.page-content{flex:1;}
.hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0f172a;padding-bottom:8px;margin-bottom:12px;}
.logo-wrap{display:flex;align-items:center;gap:10px;}
.logo-main{font-size:20px;font-weight:900;color:#0f172a;letter-spacing:2px;line-height:1;}
.logo-sub{font-size:8px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-top:2px;}
.hdr-info{text-align:left;font-size:10px;color:#475569;}
.banner{background:#0f172a;color:white;padding:10px 14px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.two-col{display:grid;grid-template-columns:65% 35%;gap:14px;}
.ind-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:9px;}
.ind-title{font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:5px;margin-bottom:7px;}
.ind-row{display:flex;justify-content:space-between;align-items:baseline;font-size:12px;margin-bottom:3px;gap:6px;}
.ind-lbl{color:#64748b;white-space:nowrap;flex-shrink:1;}
.ind-val{font-weight:700;white-space:nowrap;flex-shrink:0;text-align:left;direction:ltr;}
.eps-box{background:#0f172a;color:white;border-radius:10px;padding:10px;margin-top:10px;}
.eps-title{font-size:11px;font-weight:900;border-bottom:1px solid #334155;padding-bottom:3px;margin-bottom:8px;}
.eps-chart{display:flex;flex-direction:row;direction:ltr;align-items:flex-end;justify-content:space-evenly;height:120px;padding:0 6px;}
.eps-bar-wrap{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;width:26px;height:100%;}
.eps-bar{width:100%;border-radius:3px 3px 0 0;}
.eps-bar-lbl{font-size:9px;color:#94a3b8;margin-top:3px;text-align:center;direction:ltr;}
.eps-bar-val{font-size:9px;font-weight:bold;margin-bottom:1px;text-align:center;direction:ltr;}
.perf-grid{display:grid;grid-template-columns:1fr 1fr;gap:3px;font-size:12px;margin-top:3px;}
.perf-cell{display:flex;justify-content:space-between;background:white;border:1px solid #f1f5f9;padding:2px 4px;border-radius:3px;}
.disc{border:1px dashed #cbd5e1;border-radius:6px;padding:7px;font-size:9px;color:#64748b;margin-top:8px;line-height:1.4;}
.glossary{font-size:8px;color:#94a3b8;line-height:1.6;margin-top:8px;padding-top:6px;border-top:1px solid #e2e8f0;}
.glossary b{color:#64748b;}
.footer{display:flex;justify-content:space-between;font-size:8px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:8px;margin-top:auto;}
@media(max-width:600px){.two-col{grid-template-columns:1fr;}.page{width:100%;padding:4mm;margin:0;}}
@media print{body{background:none;}.page{box-shadow:none;margin:0;width:210mm;padding:12mm 15mm;}}
</style>
</head>
<body>
<div class="page">
<div class="page-content">
<div class="hdr">
  <div class="logo-wrap">
    <img src="${logoSrc}" width="36" height="36" style="object-fit:contain;" alt="לוגו">
    <div><div class="logo-main">${logoTextMain}</div><div class="logo-sub">${logoTextSub}</div></div>
  </div>
  <div class="hdr-info"><b>${headerDate}</b><br>${headerAuthor}<br>${headerContact}</div>
</div>
<div class="banner">
  <div>
    <span style="background:#2563eb;color:white;padding:1px 5px;font-size:8px;font-weight:bold;border-radius:3px;">${ticker}</span>
    <div style="font-size:16px;font-weight:bold;margin-top:3px;">${stock.name}</div>
    <div style="font-size:9px;color:#94a3b8;">${stock.headerSubtitle||'עדכון אנליזה - דוח רבעוני ועדכון ממודל הערכת שווי'}</div>
  </div>
  <div style="text-align:left;">
    <div style="font-size:8px;color:#cbd5e1;">${stock.headerRecLabel||'המלצה ומחיר יעד'}</div>
    <div style="font-size:13px;font-weight:bold;color:#4ade80;">${stock.recommendation||'קנייה (BUY)'}</div>
    <div style="font-size:9px;color:#f1f5f9;">מחיר שוק: ${stock.price}</div>
  </div>
</div>
<div class="two-col">
  <div>${secHtml}</div>
  <div>
    <div class="ind-box">
      <div class="ind-title">📊 אינדיקטורים פיננסיים מרכזיים</div>
      <div class="ind-row"><span class="ind-lbl">שווי שוק:</span><span class="ind-val">${stock.marketcap}</span></div>
      <div class="ind-row"><span class="ind-lbl">מחיר מניה:</span><span class="ind-val">${stock.price}</span></div>
      <div class="ind-row"><span class="ind-lbl">שינוי יומי:</span><span class="ind-val" style="color:${dailyClr};">${stock.dailyChange}</span></div>
      <div class="ind-row"><span class="ind-lbl">מחזור מסחר:</span><span class="ind-val">${stock.volume}</span></div>
      <hr style="margin:3px 0;border:none;border-top:1px solid #e2e8f0;">
      <div class="ind-row"><span class="ind-lbl">מכפיל רווח (TTM):</span><span class="ind-val">${stock.peTtm}</span></div>
      <div class="ind-row"><span class="ind-lbl">P/E 2026:</span><span class="ind-val" style="color:#1d4ed8;">${stock.pe2026}</span></div>
      <div class="ind-row"><span class="ind-lbl">CAGR:</span><span class="ind-val">${stock.cagr}</span></div>
      <div class="ind-row"><span class="ind-lbl">PEG:</span><span class="ind-val">${stock.peg}</span></div>
      <div class="ind-row"><span class="ind-lbl">PEG 2026:</span><span class="ind-val" style="color:#059669;">${stock.peg2026}</span></div>
      <div class="ind-row"><span class="ind-lbl">Beta:</span><span class="ind-val">${stock.beta}</span></div>
      <hr style="margin:3px 0;border:none;border-top:1px solid #e2e8f0;">
      <div class="ind-row"><span class="ind-lbl">גבוה 52 שבועות:</span><span class="ind-val" style="color:#dc2626;">${stock.high52}</span></div>
      <div class="ind-row"><span class="ind-lbl">נמוך 52 שבועות:</span><span class="ind-val" style="color:#059669;">${stock.low52}</span></div>
      <hr style="margin:3px 0;border:none;border-top:1px solid #e2e8f0;">
      <div style="font-size:12px;font-weight:bold;color:#334155;margin-bottom:3px;">תשואות לתקופות מסחר:</div>
      <div class="perf-grid">
        ${perfCell('חודש:',stock.m1)}${perfCell('3M:',stock.m3)}
        ${perfCell('6M:',stock.m6)}${perfCell('12M:',stock.m12)}
      </div>
      <div class="ind-row" style="margin-top:3px;background:#eff6ff;padding:2px 4px;border-radius:3px;">
        <span style="color:#1d4ed8;font-weight:bold;">YTD:</span>
        <b style="color:${perfColor(stock.ytd)};direction:ltr;">${perfArrow(stock.ytd)}${stripRaw(stock.ytd)}</b>
      </div>
    </div>
    <div class="eps-box">
      <div class="eps-title">📈 תחזית רווח למניה (EPS)</div>
      <div class="eps-chart">
        <div class="eps-bar-wrap"><div class="eps-bar-val" style="color:#94a3b8;">${stock.epsTtm}</div><div class="eps-bar" style="background:#94a3b8;height:${pct(v[0])}%;"></div><div class="eps-bar-lbl">TTM</div></div>
        <div class="eps-bar-wrap"><div class="eps-bar-val" style="color:#e2e8f0;">${stock.eps26}</div><div class="eps-bar" style="background:#3b82f6;height:${pct(v[1])}%;"></div><div class="eps-bar-lbl">2026</div></div>
        <div class="eps-bar-wrap"><div class="eps-bar-val" style="color:#e2e8f0;">${stock.eps27}</div><div class="eps-bar" style="background:#3b82f6;height:${pct(v[2])}%;"></div><div class="eps-bar-lbl">2027</div></div>
        <div class="eps-bar-wrap"><div class="eps-bar-val" style="color:#e2e8f0;">${stock.eps28}</div><div class="eps-bar" style="background:#3b82f6;height:${pct(v[3])}%;"></div><div class="eps-bar-lbl">2028</div></div>
      </div>
    </div>
    <div class="disc">${stock.disclosureBlock||'דוח מחקר זה מבוסס על נתונים פיננסיים גלויים ואינו מהווה ייעוץ לרכישת ניירות ערך.'}</div>
  </div>
</div>
</div>
<div class="glossary">
  <b style="color:#475569;">מקרא: </b>
  <b>P/E</b> — יחס בין מחיר המניה לרווח למניה.&nbsp;|&nbsp;<b>EPS</b> — רווח נקי חלקי מספר המניות.&nbsp;|&nbsp;<b>CAGR</b> — שיעור צמיחה שנתי ממוצע.&nbsp;|&nbsp;<b>PEG</b> — P/E חלקי קצב הצמיחה; ערך מתחת ל-1 מעיד על הזדמנות.&nbsp;|&nbsp;<b>Beta</b> — תנודתיות ביחס לשוק.&nbsp;|&nbsp;<b>YTD</b> — תשואה מתחילת השנה.
</div>
<div class="footer">
  <span>${stock.footerTextL||'כל הזכויות שמורות - זיו חודדה סקירת אנליסטים'}</span>
  <span>${stock.footerTextR||'עמוד 1 מתוך 1'}</span>
</div>
</div>
</body>
</html>`;
}

export function downloadHtml(html, ticker) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Report_${ticker}_${new Date().toISOString().slice(0,10)}.html`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}
