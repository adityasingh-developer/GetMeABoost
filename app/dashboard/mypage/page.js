import CreatorPageContent from "@/components/CreatorPageContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function DashboardMyPage() {
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
    .select("name username description profileImage bannerImage supporterCount followersCount membersCount")
    .lean();

  return (
    <div className='pb-12'>
      <CreatorPageContent
        creatorUsername={user?.username || ""}
        username={user?.name || session.user.name || "Your Page"}
        description={user?.description || ""}
        profileImage={user?.profileImage || ""}
        bannerImage={user?.bannerImage || ""}
        supporterCount={user?.supporterCount ?? 0}
        followersCount={user?.followersCount ?? 0}
        membersCount={user?.membersCount ?? 0}
      />
    </div>
  );
}
