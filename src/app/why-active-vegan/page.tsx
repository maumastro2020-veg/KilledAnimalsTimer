import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why “Active Vegan”?",
};

export default function WhyActiveVeganPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-6">
        <Link
          href="/about"
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-500"
        >
          ← About
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Why &ldquo;Active Vegan&rdquo;?
        </h1>

        <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            I&apos;ve gone out for street outreach. I&apos;ve stood in
            vigils. But I can&apos;t call myself &ldquo;an activist&rdquo;
            — it&apos;s not my job, it&apos;s not my full-time identity.
            For a long time, that made me feel like I wasn&apos;t doing
            enough.
          </p>

          <p className="font-medium text-zinc-950 dark:text-zinc-50">
            But not every vegan needs to be an activist. Every vegan should
            be active.
          </p>

          <p>For me, &ldquo;active&rdquo; means a few things.</p>

          <p>
            It means speaking up for animals when the opportunity shows up,
            even when it&apos;s uncomfortable. It means creating and
            sharing content, because a post or a video can reach people a
            conversation never will. It means moving, nourishing,
            and training your body — because every vegan who runs a
            marathon or lifts weights is breaking, with their own body, the
            myth that this way of eating makes you weak. It means taking
            your health seriously, because a vegan who&apos;s visibly
            thriving is the most convincing argument there is. It means
            preparing: knowing how to defend your cause with facts, not
            just conviction. And it means doing a little more than
            what&apos;s required — a vegan meal for your family, a
            conversation you didn&apos;t have to start — because sometimes
            that extra effort is what makes someone else curious.
          </p>

          <p className="font-medium text-zinc-950 dark:text-zinc-50">
            You don&apos;t have to be a full-time activist. You just have
            to be active.
          </p>
        </div>

        <Link
          href="/who-are-we"
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-500"
        >
          Who are we?
        </Link>
      </main>
    </div>
  );
}
