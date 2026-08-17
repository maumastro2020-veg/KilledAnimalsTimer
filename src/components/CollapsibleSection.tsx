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
    <section className="w-full border-t border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-zinc-950 dark:text-zinc-50"
      >
        {title}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform dark:text-zinc-600 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M5 7.5L10 12.5L15 7.5" />
        </svg>
      </button>

      {open && <div className="pb-4">{children}</div>}
    </section>
  );
}
