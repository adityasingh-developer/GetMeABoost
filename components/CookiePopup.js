"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie_consent_choice";

const CookiePopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(CONSENT_KEY);
    if (!savedChoice) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full h-[40vh] rounded-t-2xl border border-neutral-700 bg-[#111] p-5 shadow-2xl md:bottom-4 md:right-4 md:h-auto md:w-[380px] md:rounded-2xl">
      <div className="flex h-full flex-col justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#d5ba80]">Cookies</p>
          <h2 className="text-xl font-semibold text-white">Can we use cookies?</h2>
          <p className="text-sm leading-relaxed text-neutral-300">
            We use cookies to keep your session secure and improve site performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-neutral-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            onClick={() => handleChoice("necessary")}
          >
            Necessary only
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-lg bg-[#d5ba80] px-4 py-3 text-sm font-semibold text-black transition-colors hover:brightness-95"
            onClick={() => handleChoice("accepted")}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
