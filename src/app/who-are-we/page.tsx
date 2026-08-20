import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import photo from "../../../image_bank/who-are-we.jpg";

export const metadata: Metadata = {
  title: "Who are we?",
};

export default function WhoAreWePage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-6">
        <Link
          href="/why-active-vegan"
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-500"
        >
          ← Why &ldquo;Active Vegan&rdquo;?
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Who are we?
        </h1>

        <Image
          src={photo}
          alt="Mauricio crouching and hugging Kubo, his dog"
          className="w-full max-w-xs self-center rounded-2xl"
          priority
        />

        <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            We are Mauricio and Kubo. He turned me into a vegan with his
            intelligence and communication skills — he made me dig deeper
            and question everything I knew.
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
        </div>
      </main>
    </div>
  );
}
