export function stripArrow(s) {
  return String(s || '').replace(/^[▲▼⬆⬇↑↓]\s*/u, '').trim();
}

export function isNeg(s) {
  const c = stripArrow(s);
  return c.startsWith('-') || parseFloat(c) < 0;
}

export function perfColor(s) {
  return isNeg(s) ? '#dc2626' : '#059669';
}

export function perfArrow(s) {
  return isNeg(s) ? '▼ ' : '▲ ';
}

export function perfDisplay(s) {
  const raw = stripArrow(s);
  if (!raw || raw === '-') return raw;
  return perfArrow(raw) + raw;
}

export function fmtPct(v) {
  if (!v && v !== 0) return '0.00%';
  const s = String(v).trim();
  if (!s || s === '-') return '-';
  if (s.includes('%')) return s;
  const n = parseFloat(s);
  if (isNaN(n)) return s;
  if (Math.abs(n) < 5 && Math.abs(n) > 0) return (n * 100).toFixed(2) + '%';
  return n.toFixed(2) + '%';
}

export function fmtDollar(v) {
  if (!v) return '$0.00';
  const s = String(v).trim();
  return s.startsWith('$') ? s : '$' + s;
}

export function fmtNum(v) {
  if (!v && v !== 0) return '-';
  const s = String(v).trim();
  if (!s || s === '-') return '-';
  const n = parseFloat(s);
  if (isNaN(n)) return s;
  return n.toFixed(2);
}
