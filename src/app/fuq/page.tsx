import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FUQ",
};

const FUQ_ITEMS = [
  {
    q: "Would you be willing to kill the animal yourself?",
    a: "If not, that's worth sitting with — someone is doing it so you don't have to think about it.",
  },
  {
    q: "If you watched exactly how it got to your plate, would you still eat it?",
    a: "Most people who avoid the footage already know the answer.",
  },
  {
    q: "Why is it normal to grieve a dog but not think twice about a pig?",
    a: "They're both capable of fear, pain, and forming bonds. The difference is what we were raised to call food.",
  },
  {
    q: "Are you eating this because you chose to, or because you never stopped to choose?",
    a: "Most diets are inherited, not decided. That's worth noticing at least once.",
  },
  {
    q: "What would you tell a child who asked where meat comes from — the real answer, not the easy one?",
    a: "If the honest answer feels hard to say out loud, that's information too.",
  },
  {
    q: "If lab-grown meat tasted identical tomorrow, would you switch — and if so, why not sooner?",
    a: "If the only reason was taste or convenience, the animal was never really the obstacle.",
  },
  {
    q: "How much of your resistance to this page is about the argument, and how much is about not wanting to change?",
    a: "Fair question for us too — change is hard for everyone, including people who've already gone vegan.",
  },
  {
    q: "In a world where you can choose cruelty or compassion, which do you choose?",
    a: "Most people answer compassion, then eat in a way that requires the other one. Worth reconciling.",
  },
  {
    q: "If you were in the position of the animals you eat, would you want everything to stay the same?",
    a: "It's an easy question to skip when you're not the one on the other end of it.",
  },
  {
    q: "And if you weren't — how fast would you want people to change, knowing the clock doesn't stop for you either?",
    a: "Speed is easy to ask for when you're not the one paying for the delay.",
  },
  {
    q: "Is it possible to truly respect animals while still paying for their exploitation — meat, milk, eggs?",
    a: "Respect that stops at your fork isn't respect. It's a feeling, not a practice.",
  },
  {
    q: "From today onward, how many animals should be exploited and killed in your name?",
    a: "That's the one number on this entire site that's actually up to you.",
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
            The uncommon and sometimes uncomfortable questions we should ask
            ourselves more often.
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
