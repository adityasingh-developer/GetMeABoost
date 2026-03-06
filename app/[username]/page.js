import React from "react";
import CreatorPageContent from "@/components/CreatorPageContent";
import QuickSupportForm from "@/components/QuickSupportForm";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const Username = async ({ params }) => {
  const { username } = await params;
  await connectDB();

  const user = await User.findOne({ username: username?.toLowerCase() }).lean();
  const displayName = user?.name || username;

  return (
    <div className='pb-12'>
      <CreatorPageContent
        username={displayName}
        description={user?.description || ""}
        profileImage={user?.profileImage || ""}
        bannerImage={user?.bannerImage || ""}
        supporterCount={user?.supporterCount}
        followersCount={user?.followersCount}
        membersCount={user?.membersCount}
        rightSlot={<QuickSupportForm />}
      />
    </div>
  );
};

export default Username;
