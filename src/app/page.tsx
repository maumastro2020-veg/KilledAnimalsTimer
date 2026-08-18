import Image from "next/image";
import Link from "next/link";
import logoDark from "../../image_bank/brand/Logo-Monogram-Av-01-dark.png";
import logoLight from "../../image_bank/brand/Logo-Monogram-Av-01-light.png";
import timerSectionDark from "../../image_bank/timer-section-dark.jpg";
import timerSectionLight from "../../image_bank/timer-section-light.jpg";

const IMAGE_FADE_MASK =
  "radial-gradient(ellipse 78% 82% at center, black 58%, transparent 100%)";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full flex-col items-center">
        <div className="flex w-full max-w-2xl flex-col items-center gap-4 px-6 pt-16 pb-16 text-center">
          <Image
            src={logoLight}
            alt="Active Vegan"
            className="h-14 w-14 rounded-2xl border border-zinc-200 shadow-sm dark:hidden"
            priority
          />
          <Image
            src={logoDark}
            alt="Active Vegan"
            className="hidden h-14 w-14 rounded-2xl border border-zinc-800 shadow-sm dark:block"
            priority
          />
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Active Vegan
          </h1>
          <p className="max-w-md text-base text-zinc-600 dark:text-zinc-400">
            Tools, data & resources to empower minds and expand veganism.
          </p>
        </div>

        <section className="flex w-full justify-center px-6 pt-12 pb-20">
          <div className="flex w-full max-w-2xl flex-col items-center gap-5 text-center md:max-w-4xl md:flex-row md:items-center md:gap-12 md:text-left">
            <div className="flex flex-col items-center gap-5 text-center md:w-[46%] md:shrink-0 md:items-start md:text-left">
              <h2 className="max-w-[11ch] text-4xl font-extrabold tracking-tight text-balance text-zinc-950 md:text-5xl dark:text-zinc-50">
                Make your active time count
              </h2>
              <p className="max-w-md text-base leading-relaxed text-zinc-600 md:max-w-none dark:text-zinc-400">
                Turn your outreach time into a number that matters. Start the
                timer when your conversation begins. Stop it when it ends.
                See how many animals didn&apos;t make it through that same
                window of time — broken down by species, with sources you
                can trust.
              </p>
              <Link
                href="/timer"
                className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 active:bg-emerald-800"
              >
                Open Timer Calculator
              </Link>
            </div>

            <div
              className="w-full max-w-md md:max-w-none md:flex-1"
              style={{ WebkitMaskImage: IMAGE_FADE_MASK, maskImage: IMAGE_FADE_MASK }}
            >
              <Image
                src={timerSectionLight}
                alt="The Timer Calculator's results and start screens, shown on two phones"
                className="w-full dark:hidden"
                sizes="(min-width: 768px) 50vw, 90vw"
                priority
              />
              <Image
                src={timerSectionDark}
                alt="The Timer Calculator's results and start screens, shown on two phones"
                className="hidden w-full dark:block"
                sizes="(min-width: 768px) 50vw, 90vw"
                priority
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
