"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

const hiddenPaths = new Set([
  "/privacy",
  "/terms",
  "/dashboard",
  "/dashboard/mypage",
  "/dashboard/supporters",
  "/dashboard/payout",
  "/dashboard/settings",
]);

const PublicNavbar = () => {
  const pathname = usePathname();
  const shouldHideNavbar = hiddenPaths.has(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <nav className="py-2 px-1 sm:px-15 fixed top-0 z-100000000000 shadow-[0_6px_32px_rgba(0,0,0,0.5)] w-full bg-[#191919] flex justify-center items-center">
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo_dark-removebg-preview.png"
            alt="BuyMeABoost logo"
            width={75}
            height={35}
            priority
            fetchPriority="high"
            sizes="75px"
          />
        </Link>

        <div className="flex gap-5 md:flex-row flex-row-reverse items-center">
          <button
            type="button"
            className="flex md:hidden cursor-pointer mr-4 p-1"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <img src="/icons/menu.svg" alt="Menu" className="w-9 h-9" />
          </button>

          <div
            className={`${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed inset-0 bg-black/45 z-30 transition-opacity duration-300 md:hidden`}
            onClick={() => setIsMenuOpen(false)}
          />

          <ul
            className={`flex md:flex-row flex-col navLinks list-none items-center text-[18px] fixed md:static right-0 top-0 md:top-auto h-screen md:h-auto w-64 md:w-auto bg-[#191919] md:bg-transparent px-6 md:px-0 py-16 md:py-0 gap-4 md:gap-0 transition-transform duration-300 ease-out z-40 md:z-auto md:translate-x-0 ${isMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"} ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none md:pointer-events-auto"}`}
          >
            <li>
              <Link className="navLinkItem" href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <a
                href="https://r.mtdv.me/blog/posts/why-does-this-even-exist-man"
                target="_blank"
                rel="noreferrer"
                className="navLinkItem"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <Link
                className="bg-[#d5ba80] duration-200 hover:brightness-90 brightness-110 text-black font-medium py-3 px-5 rounded-2xl"
                href="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
