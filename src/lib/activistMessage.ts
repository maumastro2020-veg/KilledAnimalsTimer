"use client";

import { useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "kat_activist_message";
const MESSAGE_EVENT = "kat-activist-message-change";

export const DEFAULT_ACTIVIST_MESSAGE =
  "Thanks for talking with me! If any of this stuck with you, check out the FAQ and resources on this site for where to go next.";

// Same storage-as-source-of-truth pattern as the timer state (see Timer.tsx):
// stable top-level subscribe/snapshot functions, parsed outside the store read.
function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(MESSAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(MESSAGE_EVENT, callback);
  };
}

function getStorageSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
}

function getServerStorageSnapshot() {
  return "";
}

function parseMessage(raw: string): string {
  if (!raw) return DEFAULT_ACTIVIST_MESSAGE;
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "string" ? parsed : DEFAULT_ACTIVIST_MESSAGE;
  } catch {
    return DEFAULT_ACTIVIST_MESSAGE;
  }
}

export function saveActivistMessage(message: string) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(message));
  window.dispatchEvent(new Event(MESSAGE_EVENT));
}

export function useActivistMessage(): string {
  const raw = useSyncExternalStore(subscribeToStorage, getStorageSnapshot, getServerStorageSnapshot);
  return useMemo(() => parseMessage(raw), [raw]);
}
