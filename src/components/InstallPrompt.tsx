"use client";

import { useEffect, useState } from "react";

// Not yet in lib.dom.d.ts.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  // Default to "standalone" so the first client render matches the server's
  // (no window/navigator during SSR) — the real values land after mount.
  const [{ isStandalone, isIOS }, setEnv] = useState({ isStandalone: true, isIOS: false });
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of matchMedia/userAgent after mount, mirrors Next's own PWA guide pattern
    setEnv({
      isStandalone: window.matchMedia("(display-mode: standalone)").matches,
      isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    });

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, []);

  if (isStandalone || (!installEvent && !isIOS)) return null;

  const handleClick = async () => {
    if (installEvent) {
      await installEvent.prompt();
      setInstallEvent(null);
      return;
    }
    setShowIOSHint((v) => !v);
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={handleClick}
        className="text-xs font-medium text-red-600 hover:underline dark:text-red-500"
      >
        Install this timer as an app
      </button>
      {showIOSHint && (
        <p className="max-w-[220px] text-center text-xs text-zinc-500 dark:text-zinc-400">
          Tap the Share icon, then &ldquo;Add to Home Screen&rdquo;.
        </p>
      )}
    </div>
  );
}
