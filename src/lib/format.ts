const ABBREVIATIONS: [number, string][] = [
  [1e12, "T"],
  [1e9, "B"],
  [1e6, "M"],
];

export function formatCount(n: number): string {
  if (n < 1000) return Math.max(0, Math.round(n)).toLocaleString("en-US");
  for (const [value, suffix] of ABBREVIATIONS) {
    if (n >= value) return `${(n / value).toFixed(2)}${suffix}`;
  }
  return Math.round(n).toLocaleString("en-US");
}

// For ratios like "12.4x", where formatCount's integer rounding for n < 1000
// would collapse small multiples (e.g. 0.03) down to a misleading "0".
export function formatMultiple(n: number): string {
  if (n < 0.01) return "<0.01";
  if (n < 1000) return (Math.round(n * 100) / 100).toString();
  return formatCount(n);
}
