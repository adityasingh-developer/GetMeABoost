import React from "react";
import CreatorPageContent from "@/components/CreatorPageContent";
import QuickSupportForm from "@/components/QuickSupportForm";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

const Username = async ({ params }) => {
  noStore();
  const { username } = await params;
  const session = await getServerSession(authOptions);
  await connectDB();

  const user = await User.findOne({ username: username?.toLowerCase() }).lean();
  const currentUser = session?.user?.email
    ? await User.findOne({ email: session.user.email.trim().toLowerCase() })
        .select("_id")
        .lean()
    : null;

  const isFollowed = Boolean(
    currentUser?._id &&
      user?.followers?.some((id) => id.toString() === currentUser._id.toString())
  );
  const displayName = user?.name || username;

  return (
    <div className='pb-12'>
      <CreatorPageContent
        creatorUsername={user?.username || username?.toLowerCase() || ""}
        username={displayName}
        description={user?.description || ""}
        profileImage={user?.profileImage || ""}
        bannerImage={user?.bannerImage || ""}
        supporterCount={user?.supporterCount ?? 0}
        followersCount={user?.followersCount ?? 0}
        membersCount={user?.membersCount ?? 0}
        isFollowed={isFollowed}
        rightSlot={<QuickSupportForm />}
      />
    </div>
  );
};

export default Username;
