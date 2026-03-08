import DashboardShell from "./DashboardShell";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import { normalizePageSections } from "@/lib/pageSections";
import User from "@/models/User";

export const metadata = {
  title: "GetMeABoost - Dashboard",
  description: "GetMeABoost - This website is a crowdfunding platform for creators.",
  icons: {
    icon: "logo_dark.png"
  }
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const sessionEmail = session.user.email?.trim().toLowerCase();

  if (!sessionEmail) {
    redirect("/complete-profile");
  }

  await connectDB();
  const user = await User.findOne({ email: sessionEmail })
    .select("name username email profileImage bannerImage description links supporters followersCount members totalSupportAmount memberTiers membershipTiers pageSections")
    .lean();

  const isComplete = Boolean(
    user?.username &&
      user?.email &&
      user?.profileImage &&
      user?.bannerImage &&
      user?.description
  );

  if (!isComplete) {
    redirect("/complete-profile");
  }

  const dashboardUser = {
    name: user?.name || session.user.name || "",
    username: user?.username || "",
    email: user?.email || sessionEmail || "",
    profileImage: user?.profileImage || "",
  };

  const supporters = Array.isArray(user?.supporters) ? user.supporters : [];
  const members = Array.isArray(user?.members) ? user.members : [];
  const supporterUserIds = supporters.map((supporter) => supporter?.user).filter(Boolean);
  const memberUserIds = members.map((member) => member?.user).filter(Boolean);
  const relatedUserIds = Array.from(
    new Set([...supporterUserIds, ...memberUserIds].map((id) => id.toString()))
  );
  const relatedUsers = relatedUserIds.length
    ? await User.find({ _id: { $in: relatedUserIds } })
        .select("name username profileImage")
        .lean()
    : [];
  const relatedUsersById = new Map(
    relatedUsers.map((relatedUser) => [relatedUser._id.toString(), relatedUser])
  );

  const formattedSupporters = supporters.map((supporter, index) => {
    const supporterUserId = supporter?.user?.toString?.() || "";
    const supporterUser = relatedUsersById.get(supporterUserId);
    return {
      id: supporter?._id?.toString?.() || `${supporterUserId || "supporter"}-${index}`,
      name: supporterUser?.name || supporterUser?.username || supporter?.name || "Anonymous",
      profileImage: supporterUser?.profileImage || "",
      message: String(supporter?.message || ""),
      amount: Number(supporter?.amount || 0),
      supportedAt: supporter?.supportedAt ? new Date(supporter.supportedAt).toISOString() : null,
    };
  });

  const formattedMembers = members.map((member, index) => {
    const memberUserId = member?.user?.toString?.() || "";
    const memberUser = relatedUsersById.get(memberUserId);
    return {
      id: member?._id?.toString?.() || `${memberUserId || "member"}-${index}`,
      name: memberUser?.name || memberUser?.username || "Unknown member",
      type: member?.tier?.name?.trim() || "Member",
      amount: Number(member?.tier?.price || 0),
    };
  });

  const initialDashboardData = {
    name: user?.name || session.user.name || "",
    username: user?.username || "",
    email: user?.email || sessionEmail || "",
    profileImage: user?.profileImage || "",
    bannerImage: user?.bannerImage || "",
    description: user?.description || "",
    links: user?.links || {},
    pageSections: normalizePageSections(user?.pageSections),
    followersCount: Number(user?.followersCount || 0),
    totalSupportAmount: Number(user?.totalSupportAmount || 0),
    membersCount: members.length,
    supporters: formattedSupporters,
    members: formattedMembers,
    membershipTiers: user?.memberTiers ?? user?.membershipTiers ?? [],
  };

  return (
    <DashboardShell dashboardUser={dashboardUser} initialDashboardData={initialDashboardData}>
      {children}
    </DashboardShell>
  );
}
