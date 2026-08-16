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
