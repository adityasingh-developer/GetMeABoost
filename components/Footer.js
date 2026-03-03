"use client";

import Image from "next/image";
import { Player } from "@lordicon/react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const ICON_URLS = {
    github: "/github.json",
    profile: "/portfolio.json",
    email: "/mail.json",
    privacy: "/privacy.json",
  };

  const pathname = usePathname();
  if (pathname === "/privacy" || pathname === "/terms" || pathname === "/dashboard") {
    return <></>;
  }

  const [icons, setIcons] = useState({ github: null, profile: null, email: null, privacy: null });
  const githubRef = useRef(null);
  const profileRef = useRef(null);
  const emailRef = useRef(null);
  const privacyRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const loadIcons = async () => {
      try {
        const [github, profile, email, privacy] = await Promise.all([
          fetch(ICON_URLS.github).then((res) => res.json()),
          fetch(ICON_URLS.profile).then((res) => res.json()),
          fetch(ICON_URLS.email).then((res) => res.json()),
          fetch(ICON_URLS.privacy).then((res) => res.json()),
        ]);

        if (!cancelled) {
          setIcons({ github, profile, email, privacy });
        }
      } catch {
      }
    };

    loadIcons();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="h-[7.7vh] flex justify-between items-center px-15 bg-[#191919]">
      <div className="flex items-center gap-2 text-sm text-neutral-100">
        <h2 className="font-medium tracking-tight text-lg">GetMeABoost</h2>
        <span className="opacity-80 text-xl">|</span>
        <p>(c) 2026 GetMeABoost. All rights reserved.</p>
        <a href="https://lordicon.com/">&nbsp;Icons by Lordicon.com</a>
      </div>
      <div className="flex gap-5">
        <a
          href="https://github.com/adityasingh-developer"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          onMouseEnter={() => githubRef.current?.playFromBeginning()}
        >
          {icons.github && <Player ref={githubRef} icon={icons.github} size={30} />}
        </a>
        <a
          href="https://itsaditya.vercel.app"
          aria-label="Portfolio"
          target="_blank"
          onMouseEnter={() => profileRef.current?.playFromBeginning()}
        >
          {icons.profile && <Player ref={profileRef} icon={icons.profile} size={28} />}
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=adityasingh.dev@yahoo.com&su=Topic:-&body=Your%20Message:-"
          aria-label="Email"
          target="_blank"
          onMouseEnter={() => emailRef.current?.playFromBeginning()}
        >
          {icons.email && <Player ref={emailRef} icon={icons.email} size={28} />}
        </a>
        <a
          href="/privacy"
          aria-label="Privacy Policy"
          onMouseEnter={() => privacyRef.current?.playFromBeginning()}
        >
          {icons.privacy && <Player ref={privacyRef} icon={icons.privacy} size={28} />}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
