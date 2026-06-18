import { ICON_EMO } from '../data/constants';
import { perfColor, perfArrow, isNeg } from './formatters';

const ico = s => ICON_EMO[s] || '●';
function stripRaw(s) { return String(s||'').replace(/^[▲▼⬆⬇↑↓]\s*/u,'').trim(); }

export async function exportToWord({ ticker, stock, sections, logoSrc, logoTextMain, logoTextSub, headerDate, headerAuthor, headerContact }) {
  const htmlDocx = window.htmlDocx;

  const v = [
    parseFloat(stock.epsTtm)||0,
    parseFloat(stock.eps26)||0,
    parseFloat(stock.eps27)||0,
    parseFloat(stock.eps28)||0,
  ];
  const mx = Math.max(...v, 1);
  const w = val => Math.round((val / mx) * 120);

  const secHtml = sections.map(sec =>
    `<div class="section-title">${ico(sec.icon)} ${sec.title}</div>
     <div class="content-text">${(sec.content||'').replace(/\n/g,'<br>')}</div>`
  ).join('');

  const wordHtml = `<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8"><style>
body{font-family:Arial,sans-serif;direction:rtl;text-align:right;color:#1e293b;line-height:1.35;}
.ht{width:100%;border-bottom:2px solid #0f172a;margin-bottom:12px;}
.banner{background:#0f172a;color:#fff;padding:10px 15px;margin-bottom:15px;}
.section-title{font-size:11px;font-weight:bold;color:#0f172a;border-bottom:1.5px solid #0f172a;padding-bottom:2px;margin-top:10px;margin-bottom:4px;}
.content-text{font-size:9.5px;color:#334155;margin-bottom:8px;text-align:justify;}
.it{width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #cbd5e1;margin-bottom:10px;}
.it td{padding:4px 6px;font-size:9px;border-bottom:1px solid #e2e8f0;}
.ititle{background:#f1f5f9;color:#0f172a;font-weight:bold;font-size:10px;padding:5px 6px;border:1px solid #cbd5e1;border-bottom:none;}
.eb{background:#0f172a;color:#fff;padding:8px;border-radius:8px;margin-bottom:10px;}
.etitle{font-size:10px;font-weight:bold;color:#38bdf8;border-bottom:1px solid #334155;padding-bottom:3px;margin-bottom:6px;}
.ebt{width:100%;border-collapse:collapse;}.ebt td{padding:3px 2px;font-size:9px;color:#e2e8f0;vertical-align:middle;}
.bg{background:#1e293b;width:120px;height:12px;border-radius:3px;overflow:hidden;display:inline-block;}
.bf{height:12px;border-radius:3px;display:inline-block;}
</style></head><body>
<table class="ht"><tr>
  <td style="text-align:right;vertical-align:middle;"><table><tr>
    <td style="padding-left:8px;"><img src="${logoSrc}" width="32" height="32"></td>
    <td><div style="font-size:18px;font-weight:bold;color:#0f172a;">${logoTextMain}</div><div style="font-size:8px;color:#64748b;">${logoTextSub}</div></td>
  </tr></table></td>
  <td style="text-align:left;font-size:9px;color:#475569;vertical-align:middle;"><b>תאריך:</b> ${headerDate}<br><b>אנליסט:</b> ${headerAuthor}<br>${headerContact}</td>
</tr></table>
<div class="banner"><table style="width:100%;border-collapse:collapse;"><tr>
  <td style="text-align:right;">
    <span style="background:#2563eb;color:white;padding:1px 4px;font-size:8px;font-weight:bold;border-radius:2px;">${ticker}</span>
    <div style="font-size:15px;font-weight:bold;margin-top:3px;">${stock.name}</div>
    <div style="font-size:9px;color:#94a3b8;">${stock.headerSubtitle||'עדכון אנליזה'}</div>
  </td>
  <td style="text-align:left;vertical-align:middle;">
    <div style="font-size:8px;color:#cbd5e1;">${stock.headerRecLabel||'המלצה ומחיר יעד'}</div>
    <div style="font-size:13px;font-weight:bold;color:#4ade80;">${stock.recommendation||'קנייה (BUY)'}</div>
    <div style="font-size:9px;color:#f1f5f9;">מחיר שוק: ${stock.price}</div>
  </td>
</tr></table></div>
<table style="width:100%;border-collapse:collapse;"><tr>
  <td style="width:58%;vertical-align:top;padding-left:12px;border-left:1px solid #e2e8f0;">${secHtml}</td>
  <td style="width:42%;vertical-align:top;padding-right:12px;">
    <div class="ititle">אינדיקטורים פיננסיים מרכזיים</div>
    <table class="it">
      <tr><td><b>שווי שוק:</b></td><td style="text-align:left;"><b>${stock.marketcap}</b></td></tr>
      <tr><td>מחיר:</td><td style="text-align:left;">${stock.price}</td></tr>
      <tr><td>שינוי יומי:</td><td style="text-align:left;color:${isNeg(stock.dailyChange)?'#dc2626':'#059669'};">${stock.dailyChange}</td></tr>
      <tr><td>מחזור:</td><td style="text-align:left;">${stock.volume}</td></tr>
      <tr><td>P/E TTM:</td><td style="text-align:left;">${stock.peTtm}</td></tr>
      <tr><td><b>P/E 2026:</b></td><td style="text-align:left;"><b style="color:#1d4ed8;">${stock.pe2026}</b></td></tr>
      <tr><td>CAGR:</td><td style="text-align:left;">${stock.cagr}</td></tr>
      <tr><td>PEG:</td><td style="text-align:left;">${stock.peg}</td></tr>
      <tr><td><b>PEG 2026:</b></td><td style="text-align:left;"><b style="color:#059669;">${stock.peg2026}</b></td></tr>
      <tr><td>Beta:</td><td style="text-align:left;">${stock.beta}</td></tr>
      <tr><td>גבוה 52 שב':</td><td style="text-align:left;color:#dc2626;">${stock.high52}</td></tr>
      <tr><td>נמוך 52 שב':</td><td style="text-align:left;color:#059669;">${stock.low52}</td></tr>
    </table>
    <div style="font-size:11px;font-weight:bold;color:#334155;margin:6px 0 3px;">תשואות:</div>
    <table style="width:100%;border-collapse:collapse;font-size:11px;">
      <tr>
        <td style="padding:2px 4px;border:1px solid #e2e8f0;">חודש:</td><td style="padding:2px 4px;border:1px solid #e2e8f0;color:${perfColor(stock.m1)};font-weight:bold;">${perfArrow(stock.m1)}${stripRaw(stock.m1)}</td>
        <td style="padding:2px 4px;border:1px solid #e2e8f0;">3M:</td><td style="padding:2px 4px;border:1px solid #e2e8f0;color:${perfColor(stock.m3)};font-weight:bold;">${perfArrow(stock.m3)}${stripRaw(stock.m3)}</td>
      </tr>
      <tr>
        <td style="padding:2px 4px;border:1px solid #e2e8f0;">6M:</td><td style="padding:2px 4px;border:1px solid #e2e8f0;color:${perfColor(stock.m6)};font-weight:bold;">${perfArrow(stock.m6)}${stripRaw(stock.m6)}</td>
        <td style="padding:2px 4px;border:1px solid #e2e8f0;">12M:</td><td style="padding:2px 4px;border:1px solid #e2e8f0;color:${perfColor(stock.m12)};font-weight:bold;">${perfArrow(stock.m12)}${stripRaw(stock.m12)}</td>
      </tr>
      <tr>
        <td colspan="2" style="padding:2px 4px;border:1px solid #e2e8f0;font-weight:bold;color:#1d4ed8;">YTD:</td>
        <td colspan="2" style="padding:2px 4px;border:1px solid #e2e8f0;color:${perfColor(stock.ytd)};font-weight:bold;">${perfArrow(stock.ytd)}${stripRaw(stock.ytd)}</td>
      </tr>
    </table>
    <div class="eb">
      <div class="etitle">תחזית EPS</div>
      <table class="ebt">
        <tr><td>TTM:</td><td><div class="bg"><div class="bf" style="background:#94a3b8;width:${w(v[0])}px;"></div></div></td><td style="text-align:left;"><b>${stock.epsTtm}</b></td></tr>
        <tr><td style="color:#4ade80;font-weight:bold;">2026:</td><td><div class="bg"><div class="bf" style="background:#10b981;width:${w(v[1])}px;"></div></div></td><td style="text-align:left;color:#4ade80;"><b>${stock.eps26}</b></td></tr>
        <tr><td>2027:</td><td><div class="bg"><div class="bf" style="background:#3b82f6;width:${w(v[2])}px;"></div></div></td><td style="text-align:left;"><b>${stock.eps27}</b></td></tr>
        <tr><td>2028:</td><td><div class="bg"><div class="bf" style="background:#6366f1;width:${w(v[3])}px;"></div></div></td><td style="text-align:left;"><b>${stock.eps28}</b></td></tr>
      </table>
    </div>
  </td>
</tr></table>
</body></html>`;

  const blob = htmlDocx.asBlob(wordHtml);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `ZIV_Report_${ticker}_2026.docx`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}
