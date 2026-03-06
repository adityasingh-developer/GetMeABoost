"use client";
import CreatorPageContent from "@/components/CreatorPageContent";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardMyPage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState({
    name: "",
    description: "",
    profileImage: "",
    bannerImage: "",
  });

  useEffect(() => {
    if (status !== "authenticated") return;

    const loadProfile = async () => {
      try {
        const res = await fetch("/api/users/me/profile-status", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        setProfile({
          name: data?.user?.name || "",
          description: data?.user?.description || "",
          profileImage: data?.user?.profileImage || "",
          bannerImage: data?.user?.bannerImage || "",
        });
      } catch {
      }
    };

    loadProfile();
  }, [status]);

  return (
    <div className='pb-12 border-3 border-dashed border-neutral-200'>
      <CreatorPageContent
        username={profile.name || session?.user?.name || "Your Page"}
        description={profile.description}
        profileImage={profile.profileImage}
        bannerImage={profile.bannerImage}
      />
    </div>
  );
}
