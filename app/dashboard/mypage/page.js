"use client";
import CreatorPageContent from "@/components/CreatorPageContent";
import { useSession } from "next-auth/react";

export default function DashboardMyPage() {
  const { data: session } = useSession();

  return (
    <div className='pb-12'>
      <CreatorPageContent username={session?.user?.name || "Your Page"} />
    </div>
  );
}
