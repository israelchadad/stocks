import { FIELD_PATTERNS } from '../data/constants';

export function guessField(header) {
  const h = header.toLowerCase().replace(/[\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
  for (const [field, patterns] of Object.entries(FIELD_PATTERNS)) {
    if (patterns.some(p => h === p)) return field;
  }
  for (const [field, patterns] of Object.entries(FIELD_PATTERNS)) {
    if (patterns.some(p => h.startsWith(p) || p.startsWith(h))) return field;
  }
  for (const [field, patterns] of Object.entries(FIELD_PATTERNS)) {
    if (patterns.some(p => p.length > 2 && h.includes(p))) return field;
  }
  return '';
}

export function buildInitialMapping(headers) {
  const mapping = {};
  headers.forEach((h, i) => {
    const field = guessField(h);
    if (field && !(field in mapping)) mapping[field] = i;
  });
  return mapping;
}
