import React from "react";
import CreatorPageContent from "@/components/CreatorPageContent";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const Username = async ({ params }) => {
  noStore();
  const { username } = await params;
  const session = await getServerSession(authOptions);
  await connectDB();

  const user = await User.findOne({ username: username?.toLowerCase() }).lean();

  if (!user) {
    notFound();
  }
  const supporters = Array.isArray(user?.supporters) ? user.supporters : [];
  const supporterUserIds = supporters
    .map((supporter) => supporter?.user)
    .filter(Boolean);
  const supporterUsers = supporterUserIds.length
    ? await User.find({ _id: { $in: supporterUserIds } })
        .select("name username profileImage")
        .lean()
    : [];
  const supporterUsersById = new Map(
    supporterUsers.map((supporterUser) => [supporterUser._id.toString(), supporterUser])
  );
  const formattedSupporters = supporters.map((supporter, index) => {
    const supporterUserId = supporter?.user?.toString?.() || "";
    const supporterUser = supporterUsersById.get(supporterUserId);

    return {
      id: supporter?._id?.toString?.() || `${supporterUserId || "supporter"}-${index}`,
      name: supporterUser?.name || supporterUser?.username || supporter?.name || "Anonymous",
      profileImage: supporterUser?.profileImage || "",
      message: String(supporter?.message || ""),
      amount: Number(supporter?.amount || 0),
      supportedAt: supporter?.supportedAt ? new Date(supporter.supportedAt).toISOString() : null,
    };
  });

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
        links={user?.links || {}}
        supporters={formattedSupporters}
        followersCount={user?.followersCount ?? 0}
        membershipTiers={user?.memberTiers ?? user?.membershipTiers ?? []}
        membersCount={user?.members?.length ?? 0}
        goal={user?.goal ?? 0}
        supportUnlocks={user?.supportUnlocks ?? []}
        totalSupportAmount={user?.totalSupportAmount ?? 0}
        isFollowed={isFollowed}
        sectionVisibility={user?.pageSections || {}}
      />
    </div>
  );
};

export default Username;
