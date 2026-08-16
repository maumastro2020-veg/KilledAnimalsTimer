import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
};

const RESOURCE_SECTIONS = [
  {
    section: "Documentaries",
    items: [
      { title: "Dominion", note: "Undercover footage across farming, and the industries built on animals." },
      { title: "Earthlings", note: "A foundational look at humanity's use of animals for food, clothing, and entertainment." },
      { title: "Cowspiracy", note: "Animal agriculture's environmental footprint." },
      { title: "Seaspiracy", note: "The fishing industry and its impact on marine life." },
      { title: "What the Health", note: "Diet, health, and the links between animal products and chronic disease." },
    ],
  },
  {
    section: "Books",
    items: [
      { title: "How to Argue with a Meat Eater (And Win Every Time)", note: "Ed Winters — a practical guide to vegan advocacy conversations." },
      { title: "Eating Animals", note: "Jonathan Safran Foer — a personal, well-researched look at the food system." },
      { title: "Why We Love Dogs, Eat Pigs, and Wear Cows", note: "Melanie Joy — on carnism, the invisible belief system behind eating animals." },
    ],
  },
  {
    section: "Podcasts & YouTube",
    items: [
      { title: "Earthling Ed", note: "Debates, street interviews, and advocacy breakdowns." },
      { title: "NutritionFacts.org", note: "Dr. Michael Greger — evidence-based nutrition science." },
      { title: "Bite Size Vegan", note: "Emily Moran Barwick — research-driven videos on ethics and nutrition." },
    ],
  },
  {
    section: "Getting started",
    items: [
      { title: "Meal planning basics", note: "Build meals around a protein (beans, tofu, lentils), a grain, and vegetables — variety takes care of the rest." },
      { title: "B12 supplementation", note: "Take a B12 supplement or eat fortified foods regularly — this one's non-negotiable, and it's simple." },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Resources
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Documentaries, books, and podcasts to go deeper.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {RESOURCE_SECTIONS.map((section) => (
            <section key={section.section} className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-500">
                {section.section}
              </h2>
              <ul className="flex flex-col divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
                {section.items.map((item) => (
                  <li key={item.title} className="flex flex-col gap-0.5 px-4 py-3">
                    <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                      {item.title}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">{item.note}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
