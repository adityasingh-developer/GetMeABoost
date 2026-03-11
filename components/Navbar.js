"use client";

import Image from "next/image"
import { usePathname } from "next/navigation"
import Link from "next/link"
import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"

const dashboardPaths = new Set([
  "/dashboard",
  "/dashboard/mypage",
  "/dashboard/supporters",
  "/dashboard/payout",
  "/dashboard/settings",
]);

const avatarColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-teal-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-pink-500",
];

const Navbar = () => {
  const pathname = usePathname();
  const shouldHideNavbar = pathname === "/privacy" || pathname === "/terms";
  const { data: session, status } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getAvatarData = (sessionUser) => {
    const displayName =
      sessionUser?.username || sessionUser?.name || sessionUser?.email || "User";
    const identifier = sessionUser?.username || sessionUser?.name || sessionUser?.email || "U";
    const initial = displayName
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    const seed = identifier.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const backgroundColorClass = avatarColors[seed % avatarColors.length];

    return {
      initial,
      backgroundColorClass,
      title: displayName,
      profileImage: sessionUser?.profileImage || "",
    };
  };

  const { initial, backgroundColorClass, title, profileImage } = getAvatarData(session?.user);

  if (shouldHideNavbar) {
    return <></>;
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
                // href="https://itsaditya.vercel.app"
                href="https://r.mtdv.me/blog/posts/why-does-this-even-exist-man"
                target="_blank"
                rel="noreferrer"
                className="navLinkItem"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </li>
            {status === "authenticated" && !dashboardPaths.has(pathname) && (
              <li>
                <Link className="navLinkItem" href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
            )}
            {status === "unauthenticated" && (
              <li>
                <Link
                  className="bg-[#d5ba80] duration-200 hover:brightness-90 brightness-110 text-black font-medium py-3 px-5 rounded-2xl"
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>

          {status === "authenticated" && (
            <div className="relative group">
              <Link
                type="button"
                href={`/${title}`}
                title={title}
                aria-label={`User avatar for ${title}`}
                onMouseEnter={() => setIsProfileOpen((prev) => !prev)}
                onMouseLeave={() => setIsProfileOpen((prev) => !prev)}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={`${title} profile`}
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover cursor-pointer"
                  />
                ) : (
                  <span
                    className={`${backgroundColorClass} h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer`}
                  >
                    {initial}
                  </span>
                )}
              </Link>

              <ul
                className={`${isProfileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto absolute right-0 top-10 md:top-1/2 md:right-full md:mr-2 md:-translate-y-1/2 w-48 bg-neutral-800 rounded-md shadow-lg p-1 z-20 transition-opacity duration-200`}
              >
                <li
                  className="px-4 py-2 text-[17px] text-neutral-50 hover:bg-neutral-700 duration-200 rounded-md cursor-pointer"
                  onClick={() => signOut()}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
