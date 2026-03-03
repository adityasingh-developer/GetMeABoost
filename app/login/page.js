"use client";

import Image from "next/image";
import { Player } from "@lordicon/react";
import React, { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const ICON_URLS = {
  github: "/githubLogin.json",
  discord: "/discordLogin.json",
  google: "/googleLogin.json",
};

const iconOrder = ["google", "github","discord"];
const providerLabels = {
  github: "GitHub",
  google: "Google",
  discord: "Discord",
};

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [icons, setIcons] = useState({});
  const iconRefs = useRef({});

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    let cancelled = false;

    const loadIcons = async () => {
      try {
        const entries = await Promise.all(
          Object.entries(ICON_URLS).map(async ([name, url]) => {
            const icon = await fetch(url).then((res) => res.json());
            return [name, icon];
          })
        );

        if (!cancelled) {
          setIcons(Object.fromEntries(entries));
        }
      } catch {
      }
    };

    loadIcons();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <div className="flex justify-center items-center min-h-[92.3vh]">
        <p className="text-2xl">You are already logged in as:-</p>
        <p className="text-2xl text-center">{session?.user?.name}</p>
      </div>
    );
  }

  return (
    <section className="flex justify-center items-center min-h-[92.3vh] gap-38 px-4">
      <div className="flex justify-center items-center">
        <Image src="/loginLogo.png" alt="BuyMeABoost logo" width={550} height={50} />
      </div>
      <div className="flex flex-col gap-8 items-center w-full max-w-sm">
        <h1 className="font-medium text-4xl">
          Login in <span className="text-[#d5ba80]">GetMeABoost</span>
        </h1>
        <div className="flex flex-col w-full items-center gap-3">
          {iconOrder.map((name) => (
            <button
              key={name}
              type="button"
              aria-label={`Continue with ${providerLabels[name]}`}
              className="h-15 w-[90%] rounded-lg border cursor-pointer border-neutral-300 bg-white px-4 flex justify-center items-center gap-4 hover:bg-neutral-200 transition-colors"
              onClick={() => signIn(name)}
              onMouseEnter={() => iconRefs.current[name]?.playFromBeginning()}
            >
              {icons[name] && (
                <Player
                  ref={(el) => {
                    iconRefs.current[name] = el;
                  }}
                  icon={icons[name]}
                  size={36}
                />
              )}
              <span className="text-lg font-medium text-neutral-700">
                Continue with {providerLabels[name]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
