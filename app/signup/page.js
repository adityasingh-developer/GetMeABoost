"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") return null;

  if (session) {
    return (
      <div className="flex justify-center items-center min-h-[92.3vh]">
        <p className="text-2xl">You are already logged in as:-</p>
        <p className="text-2xl text-center">{session?.user?.name}</p>
      </div>
    );
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data?.message || "Signup failed.");
      setIsSubmitting(false);
      return;
    }

    const loginResult = await signIn("credentials", {
      identifier: email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (loginResult?.error) {
      router.replace("/login");
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <section className="flex justify-center items-center min-h-[92.3vh] gap-24 px-4">
      <div className="flex justify-center items-center">
        <Image src="/loginLogo.png" alt="BuyMeABoost logo" width={550} height={50} />
      </div>

      <div className="flex flex-col gap-8 items-center w-full max-w-sm">
        <h1 className="font-medium text-4xl text-center">
          Sign up for <span className="text-[#d5ba80]">GetMeABoost</span>
        </h1>

        <form onSubmit={handleSignup} className="w-full flex flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="h-12 w-full rounded-lg border border-neutral-600 bg-neutral-900 px-4 text-white placeholder:text-neutral-400 outline-none focus:border-[#d5ba80]"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="h-12 w-full rounded-lg border border-neutral-600 bg-neutral-900 px-4 text-white placeholder:text-neutral-400 outline-none focus:border-[#d5ba80]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="h-12 w-full rounded-lg border border-neutral-600 bg-neutral-900 px-4 text-white placeholder:text-neutral-400 outline-none focus:border-[#d5ba80]"
          />

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-lg cursor-pointer bg-[#d5ba80] text-black font-semibold disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

          <Link href="/login" className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors text-center">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Page;
