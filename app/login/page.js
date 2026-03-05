"use client";

import Image from "next/image";
import { Player } from "@lordicon/react";
import React, { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

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
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

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

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsSubmitting(true);

    if (!executeRecaptcha) {
      setAuthError("reCAPTCHA is still loading. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const recaptchaToken = await executeRecaptcha("login");
    if (!recaptchaToken) {
      setAuthError("Please complete reCAPTCHA verification.");
      setIsSubmitting(false);
      return;
    }

    const result = await signIn("credentials", {
      identifier,
      password,
      recaptchaToken,
      recaptchaAction: "login",
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setAuthError("Invalid username/email or password.");
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <section className="flex justify-center items-center min-h-[92.3vh] gap-38 px-4">
      <div className="flex justify-center items-center">
        <Image src="/loginLogo.png" alt="BuyMeABoost logo" width={550} height={50} />
      </div>
      <div className="flex flex-col gap-8 items-center w-full max-w-sm">
        <h1 className="font-medium text-4xl">
          Login in <span className="text-[#d5ba80]">GetMeABoost</span>
        </h1>
        <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-3">
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Username or Email"
            required
            className="h-12 w-full rounded-lg border border-neutral-600 bg-neutral-900 px-4 text-white placeholder:text-neutral-400 outline-none focus:border-[#d5ba80]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="h-12 w-full rounded-lg border border-neutral-600 bg-neutral-900 px-4 text-white placeholder:text-neutral-400 outline-none focus:border-[#d5ba80]"
          />
          {authError ? <p className="text-sm text-red-400">{authError}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting || !executeRecaptcha}
            className="h-12 w-full rounded-lg cursor-pointer bg-[#d5ba80] text-black font-semibold disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
          <Link href="/signup" className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors text-center">
            Don&apos;t have an account? Register
          </Link>
        </form>
        <div className="w-full flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-700"></div>
          <span className="text-sm text-neutral-400">or continue with</span>
          <div className="h-px flex-1 bg-neutral-700"></div>
        </div>
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
