import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

const CONTACT_EMAIL = "animal.mau.animal@gmail.com";
const INSTAGRAM_HANDLE = "@mmastropiero";
const INSTAGRAM_URL = "https://instagram.com/mmastropiero";

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Contact
        </h1>

        <div className="flex flex-col gap-4 text-left text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            Got a comment about the timer, or Active Vegan in general?
            We&apos;d love to hear from you — whether you loved it, hated
            it, or have ideas for new features.
          </p>
          <p>
            Want to help the project grow? Whether it&apos;s translation,
            code, design, or just spreading the word, reach out — every bit
            helps.
          </p>
          <p>
            Want to support us financially? We prefer contributions in
            Bitcoin/Lightning, but we&apos;re grateful for any form of
            support.
          </p>
          <p>
            And of course — use the app! If you share your outreach
            content, tag us {INSTAGRAM_HANDLE} on Instagram so we can see
            it and share it too.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-full bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-emerald-700 active:bg-emerald-800"
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-500"
          >
            {INSTAGRAM_HANDLE} on Instagram
          </a>
        </div>
      </main>
    </div>
  );
}
