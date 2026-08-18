import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          About
        </h1>

        <p className="text-base leading-relaxed font-medium text-zinc-950 dark:text-zinc-50">
          Being vegan is a great first step — but it&apos;s not the
          destination. The world we&apos;re fighting for needs more than
          personal choice; it needs vegans doing outreach, sharing facts,
          opening minds, and connecting hearts. Animals have no one else to
          speak for them. Silence isn&apos;t neutral — it&apos;s a choice
          too. Be active.
        </p>

        <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            Active Vegan is an initiative built to give vegans and curious
            allies the tools, resources, and data they need to help more
            people go vegan. We believe this movement grows through
            collaboration, not competition. If you have ideas, feedback, or
            want to get involved, reach out through our{" "}
            <Link
              href="/contact"
              className="font-medium text-emerald-700 underline hover:no-underline dark:text-emerald-500"
            >
              contact page
            </Link>
            .
          </p>

          <p>
            One of our first tools is the Active Vegan Timer — an
            open-source web app, currently in MVP stage, published under
            GPLv3. It&apos;s built for street outreach activists: start the
            timer when a conversation begins, stop it when it ends, and see
            how many animals died in that window — broken down by species,
            with historical context for scale. It&apos;s a small tool with a
            simple goal: make the invisible visible.
          </p>

          <p>
            This project is maintained by Mauricio Mastropiero, a vegan
            advocate and builder who believes technology should serve the
            movement, not just document it.
          </p>

          <blockquote className="border-l-2 border-emerald-600 pl-4 text-zinc-700 italic dark:border-emerald-500 dark:text-zinc-300">
            &ldquo;I believe more than 99% of people are already vegan —
            they just haven&apos;t realized it yet.&rdquo;
          </blockquote>

          <p>
            We&apos;re just getting started, and there&apos;s a lot more to
            build. If you want to help this project grow — through code,
            ideas, outreach, or a donation — we&apos;d love to hear from
            you. We prefer contributions in Bitcoin/Lightning, but
            we&apos;re grateful for support in any form.
          </p>
        </div>
      </main>
    </div>
  );
}
