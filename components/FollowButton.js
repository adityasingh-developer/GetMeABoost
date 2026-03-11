"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FollowButton({
  creatorUsername,
  initialFollowed = false,
  initialFollowersCount = 0,
}) {
  const router = useRouter();
  const [followed, setFollowed] = useState(initialFollowed);
  const [followersCount, setFollowersCount] = useState(initialFollowersCount);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const syncStatus = async () => {
      if (!creatorUsername) return;
      try {
        const res = await fetch(`/api/users/${creatorUsername}/follow`, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (typeof data?.followersCount === "number") {
          setFollowersCount(data.followersCount);
        }
        setFollowed(Boolean(data?.followed));
      } catch {
      }
    };

    syncStatus();
  }, [creatorUsername]);

  const handleFollow = async () => {
    if (!creatorUsername || followed || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/users/${creatorUsername}/follow`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        setError(data?.message || "Unable to follow right now.");
        setIsSubmitting(false);
        return;
      }

      setFollowed(Boolean(data?.followed));
      setFollowersCount(
        typeof data?.followersCount === "number"
          ? data.followersCount
          : followersCount + 1
      );
      router.refresh();
    } catch {
      setError("Unable to follow right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleFollow}
        disabled={followed || isSubmitting}
        className='border border-[#d5ba80] duration-200 cursor-pointer hover:bg-[#d5ba80] hover:text-black font-bold py-3 text-lg px-7 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed'
      >
        {followed ? "Followed" : "Follow"}
      </button>
      {error ? <p className="text-xs text-red-400 mt-1">{error}</p> : null}
      <p className="sr-only">Followers count: {followersCount}</p>
    </div>
  );
}
