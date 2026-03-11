"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [description, setDescription] = useState("");
  const [missing, setMissing] = useState({
    username: true,
    email: true,
    profileImage: true,
    bannerImage: true,
    description: true,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (status !== "authenticated") {
      return;
    }

    const loadStatus = async () => {
      try {
        const res = await fetch("/api/users/me/profile-status", { cache: "no-store" });
        if (!res.ok) {
          setError("Unable to load profile status.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (data?.complete) {
          router.replace("/dashboard");
          return;
        }

        setMissing(
          data?.missing || {
            username: true,
            email: true,
            profileImage: true,
            bannerImage: true,
            description: true,
          }
        );
        setName(data?.user?.name || session?.user?.name || "");
        setUsername(data?.user?.username || "");
        setEmail(data?.user?.email || session?.user?.email || "");
        setProfileImage(data?.user?.profileImage || "");
        setBannerImage(data?.user?.bannerImage || "");
        setDescription(data?.user?.description || "");
      } catch {
        setError("Unable to load profile status.");
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, [status, router, session?.user?.name, session?.user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/users/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, profileImage, bannerImage, description }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Failed to save profile.");
        setIsSubmitting(false);
        return;
      }

      router.replace("/dashboard");
    } catch {
      setError("Failed to save profile.");
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || loading) return null;

  return (
    <section className="min-h-[92.3vh] flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-xl border border-neutral-700 bg-neutral-900 p-6">
        <h1 className="text-3xl font-semibold">Complete your profile</h1>
        <p className="mt-2 text-sm text-neutral-300">
          Please add missing details before entering your dashboard.
        </p>

        <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="h-12 w-full border border-neutral-600 bg-neutral-950 px-4 text-white outline-none focus:border-[#d5ba80]"
          />

          {missing.username ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username (lowercase, numbers, _)"
              required
              className="h-12 w-full border border-neutral-600 bg-neutral-950 px-4 text-white outline-none focus:border-[#d5ba80]"
            />
          ) : null}

          {missing.email ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="h-12 w-full border border-neutral-600 bg-neutral-950 px-4 text-white outline-none focus:border-[#d5ba80]"
            />
          ) : null}

          {missing.profileImage ? (
            <input
              type="url"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              placeholder="Profile image URL"
              required
              className="h-12 w-full border border-neutral-600 bg-neutral-950 px-4 text-white outline-none focus:border-[#d5ba80]"
            />
          ) : null}

          {missing.bannerImage ? (
            <input
              type="url"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
              placeholder="Banner image URL"
              required
              className="h-12 w-full border border-neutral-600 bg-neutral-950 px-4 text-white outline-none focus:border-[#d5ba80]"
            />
          ) : null}

          {missing.description ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
              rows={4}
              className="w-full border border-neutral-600 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-[#d5ba80] resize-none"
            />
          ) : null}

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full bg-[#d5ba80] text-black font-semibold disabled:opacity-70 cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save and continue"}
          </button>
        </form>
      </div>
    </section>
  );
}
