import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who to Follow",
};

const FOLLOW_GROUPS = [
  {
    group: "Street activism",
    people: [
      { name: "Ed Winters (Earthling Ed)", handle: "@earthlinged", url: "https://instagram.com/earthlinged" },
      { name: "Joey Carbstrong", handle: "@joey_carbstrong", url: "https://instagram.com/joey_carbstrong" },
      { name: "Gary Yourofsky", handle: null, url: null, note: "Known for \"The Best Speech You Will Ever Hear\"" },
      { name: "Paul Bashir", handle: "@paulbashr", url: "https://instagram.com/paulbashr", note: "Co-founder, Anonymous for the Voiceless" },
      { name: "Oliver Loos", handle: "@derextremeveganer", url: "https://instagram.com/derextremeveganer" },
      { name: "Jamie Logan", handle: "@itsjamielogan", url: "https://instagram.com/itsjamielogan" },
      { name: "Raffaela Raab", handle: "@vegan.militant", url: "https://instagram.com/vegan.militant" },
      { name: "Clif Grant", handle: "@clif_grant", url: "https://instagram.com/clif_grant" },
      { name: "Tash Peterson", handle: "@tashpeterson", url: "https://instagram.com/tashpeterson" },
    ],
  },
  {
    group: "Nutrition & health",
    people: [
      {
        name: "Dr. Michael Greger (NutritionFacts.org)",
        handle: "@nutrition_facts_org",
        url: "https://instagram.com/nutrition_facts_org",
      },
    ],
  },
  {
    group: "Food & chefs",
    people: [
      { name: "Alexis Gauthier (Chef Gauthier)", handle: "@gauthierinsoho", url: "https://instagram.com/gauthierinsoho" },
    ],
  },
];

export default function WhoToFollowPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Who to Follow
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            A personally curated list of activists, educators, and creators worth your feed.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {FOLLOW_GROUPS.map((group) => (
            <section key={group.group} className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-500">
                {group.group}
              </h2>
              <ul className="flex flex-col divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
                {group.people.map((person) => (
                  <li
                    key={person.name}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                        {person.name}
                      </span>
                      {person.note && (
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          {person.note}
                        </span>
                      )}
                    </div>
                    {person.url && (
                      <a
                        href={person.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-500"
                      >
                        {person.handle}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">
          This list keeps growing — check back for more.
        </p>
      </main>
    </div>
  );
}
