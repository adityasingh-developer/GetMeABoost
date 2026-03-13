"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomeCta() {
  const { data: session, status } = useSession();
  const isSignedIn = Boolean(session?.user);
  const primaryHref = isSignedIn ? "/dashboard" : "/login";
  const primaryLabel = isSignedIn ? "Go To Dashboard" : "Create A Page";

  return (
    <div className="flex gap-10">
      <Link href={primaryHref}>
        <button
          className="cursor-pointer bg-[#d5ba80] duration-200 hover:brightness-90 brightness-110 text-black text-lg font-medium py-3 px-7 rounded-2xl"
          disabled={status === "loading"}
        >
          {primaryLabel}
        </button>
      </Link>
      <Link href="/login">
        <button className="cursor-pointer border-[#d5ba80] hover:bg-[#d5ba80] hover:text-black duration-200 border text-lg font-medium py-3 px-7 rounded-2xl">
          Explore Creators
        </button>
      </Link>
    </div>
  );
}
