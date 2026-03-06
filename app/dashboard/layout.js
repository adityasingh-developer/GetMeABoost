import DashboardShell from "./DashboardShell";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
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
    .select("name username email profileImage bannerImage description")
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

  return <DashboardShell dashboardUser={dashboardUser}>{children}</DashboardShell>;
}
