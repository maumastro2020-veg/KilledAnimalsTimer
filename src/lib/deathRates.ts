// Global animal death-rate config.
//
// Each entry is a global annual slaughter count for one species/category. The app
// divides that by SECONDS_PER_YEAR to get a "deaths per second" rate, then multiplies
// by the conversation's elapsed seconds. This mirrors the methodology used by public
// kill-counter tools like ADAPTT (https://www.adaptt.org/about/the-kill-counter.html):
// it estimates how many animals are killed worldwide during the time span of the
// conversation, not deaths caused by the conversation itself.
//
// Keep this the single place these numbers live — update annualGlobalCount and the
// source fields together whenever a figure is refreshed.

export const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;

export type SpeciesCategory = "land" | "aquatic";

export interface SpeciesDeathRate {
  id: string;
  label: string;
  category: SpeciesCategory;
  /** Estimated number of individuals of this species slaughtered worldwide per year. */
  annualGlobalCount: number;
  source: string;
  sourceUrl: string;
  /** Catch-all bucket: always rendered last in the breakdown, not sorted by count. */
  isOther?: boolean;
}

// Land animals: FAOSTAT "Producing Animals/Slaughtered" data, 2024 (latest available).
//
// Aquatic animals: FAO only reports fish by tonnage, not head count, so individual
// counts come from fishcount.org.uk's peer-reviewed conversion methodology instead.
// Those figures are less fresh than the land data by nature of the source: wild-caught
// is a 2000-2019 average (not a single recent year) and farmed is a 2022 estimate.
// Both are the midpoints of the published ranges (wild-caught: 1.1-2.2 trillion/yr;
// farmed: 86-180 billion/yr) — treat them as order-of-magnitude, not precise counts.
export const SPECIES_DEATH_RATES: SpeciesDeathRate[] = [
  {
    id: "wild-fish",
    label: "Wild-caught fish",
    category: "aquatic",
    annualGlobalCount: 1_650_000_000_000,
    source: "fishcount.org.uk, Fish Count Estimates (2000-2019 avg., range 1.1-2.2 trillion/yr)",
    sourceUrl: "https://fishcount.org.uk/fish-count-estimates-2",
  },
  {
    id: "chickens",
    label: "Chickens",
    category: "land",
    annualGlobalCount: 78_500_000_000,
    source: "FAOSTAT, Producing Animals/Slaughtered, 2024",
    sourceUrl: "https://www.fao.org/faostat/en/#data/QCL",
  },
  {
    id: "farmed-fish",
    label: "Farmed fish",
    category: "aquatic",
    annualGlobalCount: 130_000_000_000,
    source: "fishcount.org.uk, Numbers of Farmed Fish Slaughtered Each Year, 2022 (range 86-180 billion/yr)",
    sourceUrl: "https://fishcount.org.uk/fish-count-estimates-2/numbers-of-farmed-fish-slaughtered-each-year",
  },
  {
    id: "ducks",
    label: "Ducks",
    category: "land",
    annualGlobalCount: 4_200_000_000,
    source: "FAOSTAT, Producing Animals/Slaughtered, 2024",
    sourceUrl: "https://www.fao.org/faostat/en/#data/QCL",
  },
  {
    id: "pigs",
    label: "Pigs",
    category: "land",
    annualGlobalCount: 1_500_000_000,
    source: "FAOSTAT, Producing Animals/Slaughtered, 2024",
    sourceUrl: "https://www.fao.org/faostat/en/#data/QCL",
  },
  {
    id: "rabbits",
    label: "Rabbits",
    category: "land",
    annualGlobalCount: 604_000_000,
    source: "FAOSTAT, Producing Animals/Slaughtered, 2024",
    sourceUrl: "https://www.fao.org/faostat/en/#data/QCL",
  },
  {
    id: "sheep",
    label: "Sheep",
    category: "land",
    annualGlobalCount: 704_000_000,
    source: "FAOSTAT, Producing Animals/Slaughtered, 2024",
    sourceUrl: "https://www.fao.org/faostat/en/#data/QCL",
  },
  {
    id: "goats",
    label: "Goats",
    category: "land",
    annualGlobalCount: 564_000_000,
    source: "FAOSTAT, Producing Animals/Slaughtered, 2024",
    sourceUrl: "https://www.fao.org/faostat/en/#data/QCL",
  },
  {
    id: "geese",
    label: "Geese",
    category: "land",
    annualGlobalCount: 803_000_000,
    source: "FAOSTAT, Producing Animals/Slaughtered, 2024",
    sourceUrl: "https://www.fao.org/faostat/en/#data/QCL",
  },
  {
    id: "turkeys",
    label: "Turkeys",
    category: "land",
    annualGlobalCount: 504_000_000,
    source: "FAOSTAT, Producing Animals/Slaughtered, 2024",
    sourceUrl: "https://www.fao.org/faostat/en/#data/QCL",
  },
  {
    id: "cattle",
    label: "Cattle",
    category: "land",
    annualGlobalCount: 305_000_000,
    source: "FAOSTAT, Producing Animals/Slaughtered, 2024",
    sourceUrl: "https://www.fao.org/faostat/en/#data/QCL",
  },
  {
    id: "other-land",
    label: "Other land animals",
    category: "land",
    // Buffaloes, rodents, other birds, horses, camels, other camelids, donkeys, mules.
    annualGlobalCount: 156_000_000,
    source: "FAOSTAT, Producing Animals/Slaughtered, 2024 (minor species combined)",
    sourceUrl: "https://www.fao.org/faostat/en/#data/QCL",
    isOther: true,
  },
];

export interface SpeciesBreakdownEntry {
  species: SpeciesDeathRate;
  count: number;
}

export function perSecondRate(species: SpeciesDeathRate): number {
  return species.annualGlobalCount / SECONDS_PER_YEAR;
}

export function computeSpeciesBreakdown(elapsedMs: number): SpeciesBreakdownEntry[] {
  const elapsedSeconds = Math.max(0, elapsedMs / 1000);
  const entries = SPECIES_DEATH_RATES.map((species) => ({
    species,
    count: perSecondRate(species) * elapsedSeconds,
  }));
  const named = entries.filter((e) => !e.species.isOther).sort((a, b) => b.count - a.count);
  const other = entries.filter((e) => e.species.isOther);
  return [...named, ...other];
}

export function computeTotalAnimalsKilled(elapsedMs: number): number {
  const elapsedSeconds = Math.max(0, elapsedMs / 1000);
  return SPECIES_DEATH_RATES.reduce((sum, species) => sum + perSecondRate(species) * elapsedSeconds, 0);
}
