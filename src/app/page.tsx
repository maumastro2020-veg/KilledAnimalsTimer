import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Active Vegan
          </h1>
          <p className="max-w-md text-base text-zinc-600 dark:text-zinc-400">
            Tools, data & resources to empower minds and expand veganism.
          </p>
          <Link
            href="/timer"
            className="mt-2 rounded-full bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-emerald-700 active:bg-emerald-800"
          >
            Open Timer Calculator
          </Link>
        </div>
      </main>
    </div>
  );
}
