import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

// TODO(owner): replace this generic placeholder with your real story — who
// you are, why you started Active Vegan, and anything else worth sharing.
export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          About
        </h1>

        <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            Active Vegan exists to make vegan outreach easier — for the
            activist starting a conversation on the street, and for anyone
            curious enough to ask a question afterward.
          </p>
          <p>
            It started as a single tool, a timer built to make the scale of
            animal agriculture tangible during a conversation. It&apos;s
            growing into a small toolkit: answers to common questions, resources for
            going deeper, and a starting point for finding other activists
            and educators worth following.
          </p>
          <p>
            This page is a placeholder — the real story of who built this and
            why belongs here next.
          </p>
        </div>
      </main>
    </div>
  );
}
