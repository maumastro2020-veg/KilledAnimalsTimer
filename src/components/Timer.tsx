"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { computeSpeciesBreakdown, computeTotalAnimalsKilled } from "@/lib/deathRates";
import { COMPARISON_EVENTS, computeComparisonMultiple } from "@/lib/comparisonEvents";
import { formatCount, formatHeroAbbreviation, formatMultiple } from "@/lib/format";
import CollapsibleSection from "@/components/CollapsibleSection";
import InstallPrompt from "@/components/InstallPrompt";

const STORAGE_KEY = "kat_timer_state";
const TIMER_EVENT = "kat-timer-change";

type TimerStatus = "idle" | "running" | "stopped";

type TimerState = {
  status: TimerStatus;
  startedAt: number | null;
  stoppedAt: number | null;
};

const IDLE_STATE: TimerState = { status: "idle", startedAt: null, stoppedAt: null };

function parseState(raw: string): TimerState {
  if (!raw) return IDLE_STATE;
  try {
    const parsed = JSON.parse(raw) as TimerState;
    if (parsed.status === "idle" || parsed.status === "running" || parsed.status === "stopped") {
      return parsed;
    }
    return IDLE_STATE;
  } catch {
    return IDLE_STATE;
  }
}

function saveState(state: TimerState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(TIMER_EVENT));
}

// Timer state lives in localStorage, not React state, so it's read fresh on every
// subscription notification instead of trusted from an in-memory counter.
function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(TIMER_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(TIMER_EVENT, callback);
  };
}

function getStorageSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
}

function getServerStorageSnapshot() {
  return "";
}

function useTimerState(): TimerState {
  const raw = useSyncExternalStore(subscribeToStorage, getStorageSnapshot, getServerStorageSnapshot);
  return useMemo(() => parseState(raw), [raw]);
}

// Elapsed time is always Date.now() - startedAt, recomputed on every tick/visibility
// change, never an incrementing counter — so it stays correct across screen lock.
function subscribeToClock(callback: () => void) {
  const id = window.setInterval(callback, 1000);
  const onVisibilityChange = () => {
    if (document.visibilityState === "visible") callback();
  };
  document.addEventListener("visibilitychange", onVisibilityChange);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}

function subscribeNever() {
  return () => {};
}

// getSnapshot must return a stable value when there's no active subscription —
// Date.now() on every call (even while inactive) tears on any unrelated re-render
// (e.g. toggling the comparison panel while stopped), which useSyncExternalStore
// reports as "Maximum update depth exceeded".
function useClock(active: boolean): number {
  return useSyncExternalStore(
    active ? subscribeToClock : subscribeNever,
    active ? () => Date.now() : () => 0,
    () => 0,
  );
}

function formatElapsed(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

// Hero digits are always 1-3 characters (each unit tier tops out just under
// 1000), so sizing keys off digit count rather than measuring rendered width.
// The vw coefficients are tuned against the max-w-sm (384px) content column,
// not the full viewport, so the digits stay dominant on mobile without
// overrunning the column once the viewport grows past it.
function heroDigitsFontSize(digitCount: number): string {
  if (digitCount <= 1) return "clamp(80px, 50vw, 220px)";
  if (digitCount === 2) return "clamp(72px, 46vw, 200px)";
  return "clamp(56px, 32vw, 136px)";
}

function heroUnitFontSize(digitCount: number): string {
  if (digitCount <= 1) return "clamp(22px, 14vw, 60px)";
  if (digitCount === 2) return "clamp(20px, 12vw, 54px)";
  return "clamp(16px, 9vw, 38px)";
}

const ROUNDED_DISPLAY_FONT = "ui-rounded, 'SF Pro Rounded', 'Segoe UI', -apple-system, sans-serif";

// "00:00" (5 chars) fits comfortably inside the ring; once hours kick in
// ("00:00:00", 8 chars) the clock needs to shrink to keep clear of the border.
function ringClockFontSize(formatted: string): string {
  return formatted.length > 5 ? "clamp(28px, 9vw, 40px)" : "clamp(32px, 11vw, 52px)";
}

export default function Timer() {
  const state = useTimerState();
  const now = useClock(state.status === "running");

  const handleStart = useCallback(() => {
    saveState({ status: "running", startedAt: Date.now(), stoppedAt: null });
  }, []);

  const handleStop = useCallback(() => {
    saveState({ ...state, status: "stopped", stoppedAt: Date.now() });
  }, [state]);

  const handleReset = useCallback(() => {
    saveState(IDLE_STATE);
  }, []);

  const elapsedMs =
    state.status === "running" && state.startedAt !== null
      ? now - state.startedAt
      : state.status === "stopped" && state.startedAt !== null && state.stoppedAt !== null
        ? state.stoppedAt - state.startedAt
        : 0;

  const totalAnimals = useMemo(() => computeTotalAnimalsKilled(elapsedMs), [elapsedMs]);
  const breakdown = useMemo(() => computeSpeciesBreakdown(elapsedMs), [elapsedMs]);

  const heroAbbrev = useMemo(() => formatHeroAbbreviation(totalAnimals), [totalAnimals]);
  const heroDigitCount = heroAbbrev.digits.length;

  const allFishCount = useMemo(
    () => breakdown.filter((e) => e.species.category === "aquatic").reduce((sum, e) => sum + e.count, 0),
    [breakdown],
  );
  const chickenCount = breakdown.find((e) => e.species.id === "chickens")?.count ?? 0;
  const pigCount = breakdown.find((e) => e.species.id === "pigs")?.count ?? 0;
  const cattleCount = breakdown.find((e) => e.species.id === "cattle")?.count ?? 0;

  const covidEvent = COMPARISON_EVENTS.find((e) => e.id === "covid19");
  const wwiiEvent = COMPARISON_EVENTS.find((e) => e.id === "wwii");

  const summaryItems = [
    { value: formatCount(allFishCount), label: "All fish" },
    { value: formatCount(chickenCount), label: "Chickens" },
    { value: formatCount(pigCount), label: "Pigs" },
    { value: formatCount(cattleCount), label: "Cattle (cows)" },
    ...(covidEvent
      ? [
          {
            value: `${formatMultiple(computeComparisonMultiple(totalAnimals, covidEvent))}×`,
            label: `The death toll of ${covidEvent.label} (${covidEvent.yearRange})`,
          },
        ]
      : []),
    ...(wwiiEvent
      ? [
          {
            value: `${formatMultiple(computeComparisonMultiple(totalAnimals, wwiiEvent))}×`,
            label: `The death toll of ${wwiiEvent.label} (${wwiiEvent.yearRange})`,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      <main className="flex w-full max-w-sm flex-1 flex-col">
        {state.status !== "stopped" && (
          <div className="w-full text-left">
            <h1 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Timer Calculator
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Time elapsed</p>
          </div>
        )}

        {state.status !== "stopped" && (
          <div className="flex w-full flex-1 flex-col items-center justify-center">
            <button
              type="button"
              onClick={state.status === "idle" ? handleStart : handleStop}
              className={`flex aspect-square w-[70%] max-w-xs flex-col items-center justify-center gap-2 rounded-full border-2 border-zinc-950 bg-transparent transition-colors dark:border-zinc-50 ${
                state.status === "idle"
                  ? "hover:border-emerald-600 dark:hover:border-emerald-500"
                  : "hover:border-red-600 dark:hover:border-red-500"
              }`}
            >
              <span
                className="tabular-nums font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50"
                style={{ fontFamily: ROUNDED_DISPLAY_FONT, fontSize: ringClockFontSize(formatElapsed(elapsedMs)) }}
                aria-live="polite"
              >
                {formatElapsed(elapsedMs)}
              </span>
              <span
                className={`text-sm font-bold tracking-widest uppercase ${
                  state.status === "idle"
                    ? "text-emerald-600 dark:text-emerald-500"
                    : "text-red-600 dark:text-red-500"
                }`}
              >
                {state.status === "idle" ? "Start" : "Stop"}
              </span>
            </button>

            {state.status === "idle" && (
              <div className="mt-8">
                <InstallPrompt />
              </div>
            )}
          </div>
        )}

        {state.status === "stopped" && (
          <div className="flex w-full flex-col items-start gap-8 text-left">
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                {formatElapsed(elapsedMs)}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Time elapsed</span>
            </div>

            <div className="flex w-full flex-col items-start">
              <div className="flex items-start" style={{ fontFamily: ROUNDED_DISPLAY_FONT }}>
                <span
                  className="font-extrabold leading-[0.82] tracking-tight text-zinc-950 tabular-nums dark:text-zinc-50"
                  style={{ fontSize: heroDigitsFontSize(heroDigitCount) }}
                >
                  {heroAbbrev.digits}
                </span>
                {heroAbbrev.unit && (
                  <span
                    className="mt-2 ml-0.5 font-extrabold text-zinc-950 dark:text-zinc-50"
                    style={{ fontSize: heroUnitFontSize(heroDigitCount) }}
                  >
                    {heroAbbrev.unit}
                  </span>
                )}
              </div>

              <span className="mt-4 text-lg font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                ≈{formatCount(totalAnimals)}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Animals killed worldwide, same duration
              </span>
            </div>

            <div className="flex w-full flex-col">
              <div className="border-b-[1.5px] border-zinc-950 pb-2 text-xs font-bold uppercase tracking-wide text-zinc-950 dark:border-zinc-50 dark:text-zinc-50">
                Summary
              </div>
              <div className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-5">
                {summaryItems.map((item) => (
                  <div key={item.label}>
                    <p className="text-xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col">
              <div className="border-b-[1.5px] border-zinc-950 pb-2 text-xs font-bold uppercase tracking-wide text-zinc-950 dark:border-zinc-50 dark:text-zinc-50">
                More information
              </div>

              <div className="flex w-full flex-col [&>section:first-child]:border-t-0">
                <CollapsibleSection title="Animal deaths" defaultOpen={false}>
                  <div className="flex w-full flex-col">
                    <ul className="flex w-full flex-col">
                      {breakdown.map(({ species, count }) => (
                        <li
                          key={species.id}
                          className="flex items-center justify-between border-b border-zinc-200 py-2 text-sm dark:border-zinc-800"
                        >
                          <span className="text-zinc-700 dark:text-zinc-300">{species.label}</span>
                          <span className="font-semibold tabular-nums text-zinc-950 dark:text-zinc-50">
                            {formatCount(count)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-3 text-xs leading-relaxed text-zinc-400 dark:text-zinc-600">
                      Estimated from global annual slaughter figures (FAOSTAT and
                      fishcount.org.uk), spread evenly across this conversation&apos;s
                      duration — not deaths caused by the conversation itself.
                    </p>
                  </div>
                </CollapsibleSection>

                <CollapsibleSection title="The scale of numbers" defaultOpen={false}>
                  <div className="flex w-full flex-col gap-3">
                    <p className="text-xs text-zinc-500 italic dark:text-zinc-400">
                      For scale, not a comparison of suffering — these are among
                      history&apos;s deadliest events.
                    </p>
                    <ul className="flex w-full flex-col">
                      {COMPARISON_EVENTS.map((event) => (
                        <li
                          key={event.id}
                          className="border-b border-zinc-200 py-2.5 text-sm dark:border-zinc-800"
                        >
                          <span className="font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                            {formatMultiple(computeComparisonMultiple(totalAnimals, event))}×
                          </span>{" "}
                          <span className="text-zinc-700 dark:text-zinc-300">
                            the death toll of {event.label} ({event.yearRange})
                          </span>
                          <div className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-600">
                            {event.source}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleSection>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-full border border-zinc-300 px-6 py-3 text-center text-base font-medium text-zinc-950 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              New conversation
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
