import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FUQ",
};

const FUQ_ITEMS = [
  {
    q: "If you had to eat one vegetable for the rest of your life, which one?",
    a: "Potatoes. Fries, mash, roasted, in a curry — it's basically a different food every time.",
  },
  {
    q: "Would you still be vegan stranded on a desert island with one pig and infinite coconuts?",
    a: "Yes, and the pig and I would split the coconuts.",
  },
  {
    q: "Is a seitan hot dog a sandwich?",
    a: "Wrong website. But also, no.",
  },
  {
    q: "Have you ever made eye contact with a chicken and felt personally judged?",
    a: "Every time. They know.",
  },
  {
    q: "What's the most aggressive way someone has tried to disprove veganism with a burger emoji?",
    a: "Someone once sent 🍔 with no other text, mid-argument, as if it were a closing statement.",
  },
  {
    q: "If plants scream when cut, why hasn't anyone recorded a lettuce diss track?",
    a: "We're still waiting on the mixtape.",
  },
  {
    q: "What would happen if a lion went vegan?",
    a: "Nothing good, biologically. Lions are obligate carnivores. Humans, mercifully, are not.",
  },
];

export default function FuqPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            FUQ
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Frequently Unasked Questions — nobody asked, we answered anyway.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
          {FUQ_ITEMS.map((item) => (
            <details key={item.q} className="group px-4 py-3 open:pb-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-zinc-950 marker:content-none dark:text-zinc-50">
                {item.q}
                <span className="shrink-0 text-zinc-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </main>
    </div>
  );
}
