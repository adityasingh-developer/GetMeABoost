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
  const [user] = await User.aggregate([
    { $match: { email: sessionEmail } },
    {
      $project: {
        name: 1,
        username: 1,
        email: 1,
        profileImage: 1,
        bannerImage: 1,
        description: 1,
        links: 1,
        followersCount: 1,
        totalSupportAmount: 1,
        memberTiers: 1,
        membershipTiers: 1,
        pageSections: 1,
        supportersCount: { $size: { $ifNull: ["$supporters", []] } },
        membersCount: { $size: { $ifNull: ["$members", []] } },
      },
    },
    { $limit: 1 },
  ]);

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
    supportersCount: Number(user?.supportersCount || 0),
    membersCount: Number(user?.membersCount || 0),
    supporters: [],
    members: [],
    membershipTiers: user?.memberTiers ?? user?.membershipTiers ?? [],
    isFullyLoaded: false,
  };

  return (
    <DashboardShell dashboardUser={dashboardUser} initialDashboardData={initialDashboardData}>
      {children}
    </DashboardShell>
  );
}
