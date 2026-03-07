import CreatorPageContent from "@/components/CreatorPageContent";
import QuickSupportForm from "@/components/QuickSupportForm";
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

  await connectDB();
  const user = await User.findOne({ email: sessionEmail })
    .select("name username description profileImage bannerImage supporters followersCount members memberTiers membershipTiers")
    .lean();
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
      ...supporter,
      id: supporter?._id?.toString?.() || `${supporterUserId || "supporter"}-${index}`,
      name: supporterUser?.name || supporterUser?.username || supporter?.name || "Anonymous",
      profileImage: supporterUser?.profileImage || "",
    };
  });

  return (
    <div className='pb-12'>
      <CreatorPageContent
        creatorUsername={user?.username || ""}
        username={user?.name || session.user.name || "Your Page"}
        description={user?.description || ""}
        profileImage={user?.profileImage || ""}
        bannerImage={user?.bannerImage || ""}
        supporters={formattedSupporters}
        followersCount={user?.followersCount ?? 0}
        membershipTiers={user?.memberTiers ?? user?.membershipTiers ?? []}
        membersCount={user?.members?.length ?? 0}
        rightSlot={<QuickSupportForm creatorUsername={user?.username || ""} disabled />}
      />
    </div>
  );
}
