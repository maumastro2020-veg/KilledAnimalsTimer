// Human mass-death event death tolls, used for the optional "compare to human
// history" toggle on the summary screen.
//
// This is a sensitive framing (per the PRD's own design note): keep it opt-in,
// off by default, and always show the source next to each figure. Prefer the
// most conservative, least-disputed estimate for each event over higher or
// more contested figures.

export interface ComparisonEvent {
  id: string;
  label: string;
  deathToll: number;
  yearRange: string;
  source: string;
  sourceUrl: string;
}

export const COMPARISON_EVENTS: ComparisonEvent[] = [
  {
    id: "wwii",
    label: "World War II",
    deathToll: 75_000_000,
    yearRange: "1939-1945",
    source: "Midpoint of the 70-85 million historians' consensus range (military + civilian)",
    sourceUrl: "https://en.wikipedia.org/wiki/World_War_II_casualties",
  },
  {
    id: "holocaust",
    label: "the Holocaust",
    deathToll: 6_000_000,
    yearRange: "1941-1945",
    source: "Jewish victims of the Holocaust, United States Holocaust Memorial Museum",
    sourceUrl:
      "https://encyclopedia.ushmm.org/content/en/article/documenting-numbers-of-victims-of-the-holocaust-and-nazi-persecution",
  },
  {
    id: "covid19",
    label: "the COVID-19 pandemic",
    deathToll: 7_000_000,
    yearRange: "2020-2023",
    source: "WHO cumulative confirmed deaths (WHO's own excess-mortality analysis estimates the true toll is significantly higher)",
    sourceUrl: "https://www.who.int/data/stories/the-true-death-toll-of-covid-19-estimating-global-excess-mortality",
  },
];

export function computeComparisonMultiple(totalAnimalsKilled: number, event: ComparisonEvent): number {
  return totalAnimalsKilled / event.deathToll;
}
