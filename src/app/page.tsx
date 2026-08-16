import Link from "next/link";

const TOOL_LINKS = [
  {
    href: "/timer",
    label: "Timer Calculator",
    description: "Time a conversation and see its worldwide impact, species by species.",
  },
  {
    href: "/faq",
    label: "Vegan FAQ",
    description: "Straight answers to the questions people ask most about going vegan.",
  },
  {
    href: "/resources",
    label: "Resources",
    description: "Documentaries, books, podcasts, and guides to go deeper.",
  },
  {
    href: "/who-to-follow",
    label: "Who to Follow",
    description: "Activists, educators, and creators worth your feed.",
  },
  {
    href: "/about",
    label: "About",
    description: "Why this site exists.",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Get in touch.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Active Vegan
          </h1>
          <p className="max-w-md text-base text-zinc-600 dark:text-zinc-400">
            A toolkit for vegan activists and for anyone exploring veganism —
            built for street outreach, and for the conversations that follow.
          </p>
          <Link
            href="/timer"
            className="mt-2 rounded-full bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-emerald-700 active:bg-emerald-800"
          >
            Open Timer Calculator
          </Link>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {TOOL_LINKS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30"
            >
              <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                {tool.label}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {tool.description}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
