import React from "react";
import CreatorPageContent from "@/components/CreatorPageContent";
import QuickSupportForm from "@/components/QuickSupportForm";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const Username = async ({ params }) => {
  const { username } = params;
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
        rightSlot={<QuickSupportForm />}
      />
    </div>
  );
};

export default Username;
