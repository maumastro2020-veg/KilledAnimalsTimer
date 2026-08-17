export function formatCount(n: number): string {
  return Math.max(0, Math.round(n)).toLocaleString("en-US");
}

// For ratios like "12.4x", where formatCount's integer rounding for n < 1000
// would collapse small multiples (e.g. 0.03) down to a misleading "0".
export function formatMultiple(n: number): string {
  if (n < 0.01) return "<0.01";
  if (n < 1000) return (Math.round(n * 100) / 100).toString();
  return formatCount(n);
}

const HERO_UNITS: [number, string][] = [
  [1e12, "T"],
  [1e9, "B"],
  [1e6, "M"],
  [1e3, "K"],
];

export interface HeroAbbreviation {
  digits: string;
  unit: string;
}

// Truncates (never rounds up) to the largest unit under 1000, e.g. 88,831,614
// -> "88" + "M". A floor reads as "at least this many", which suits a headline
// number sitting right above its own exact figure.
export function formatHeroAbbreviation(n: number): HeroAbbreviation {
  const safe = Math.max(0, n);
  for (const [magnitude, unit] of HERO_UNITS) {
    if (safe >= magnitude) {
      return { digits: String(Math.floor(safe / magnitude)), unit };
    }
  }
  return { digits: String(Math.round(safe)), unit: "" };
}
