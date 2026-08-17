"use client";

import { useState, type ReactNode } from "react";

export default function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="flex w-full flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left text-base font-semibold text-zinc-950 dark:text-zinc-50"
      >
        {title}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform dark:text-zinc-500 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M5 7.5L10 12.5L15 7.5" />
        </svg>
      </button>

      {open && children}
    </section>
  );
}
