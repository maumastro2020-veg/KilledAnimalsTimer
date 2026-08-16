"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { computeSpeciesBreakdown, computeTotalAnimalsKilled } from "@/lib/deathRates";
import { formatCount } from "@/lib/format";

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

function useClock(active: boolean): number {
  return useSyncExternalStore(
    active ? subscribeToClock : subscribeNever,
    () => Date.now(),
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

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      <main className="flex w-full max-w-sm flex-col items-center gap-10 text-center">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Timer Calculator
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Track the length of this conversation.
          </p>
        </div>

        <div
          className="tabular-nums text-6xl font-bold text-zinc-950 dark:text-zinc-50"
          aria-live="polite"
        >
          {formatElapsed(elapsedMs)}
        </div>

        {state.status === "idle" && (
          <button
            type="button"
            onClick={handleStart}
            className="flex h-40 w-40 items-center justify-center rounded-full bg-emerald-600 text-2xl font-semibold text-white shadow-lg transition-colors hover:bg-emerald-700 active:bg-emerald-800"
          >
            Start
          </button>
        )}

        {state.status === "running" && (
          <button
            type="button"
            onClick={handleStop}
            className="flex h-40 w-40 items-center justify-center rounded-full bg-red-600 text-2xl font-semibold text-white shadow-lg transition-colors hover:bg-red-700 active:bg-red-800"
          >
            Stop
          </button>
        )}

        {state.status === "stopped" && (
          <div className="flex w-full flex-col items-center gap-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Conversation stopped at {formatElapsed(elapsedMs)}.
            </p>

            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Animals killed worldwide, same duration
              </span>
              <span className="text-4xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                ≈ {formatCount(totalAnimals)}
              </span>
            </div>

            <ul className="w-full divide-y divide-zinc-200 rounded-xl border border-zinc-200 text-left dark:divide-zinc-800 dark:border-zinc-800">
              {breakdown.map(({ species, count }) => (
                <li
                  key={species.id}
                  className="flex items-center justify-between px-4 py-2 text-sm"
                >
                  <span className="text-zinc-700 dark:text-zinc-300">{species.label}</span>
                  <span className="font-medium tabular-nums text-zinc-950 dark:text-zinc-50">
                    {formatCount(count)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="max-w-sm text-xs leading-relaxed text-zinc-400 dark:text-zinc-600">
              Estimated from global annual slaughter figures (FAOSTAT and
              fishcount.org.uk), spread evenly across this conversation&apos;s
              duration — not deaths caused by the conversation itself.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-zinc-300 px-6 py-3 text-base font-medium text-zinc-950 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              New conversation
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
