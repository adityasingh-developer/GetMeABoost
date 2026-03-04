import React from "react";
import CreatorPageContent from "@/components/CreatorPageContent";
import QuickSupportForm from "@/components/QuickSupportForm";

const Username = async ({ params }) => {
  const { username } = await params;

  return (
    <div className='pb-12'>
      <CreatorPageContent username={username} rightSlot={<QuickSupportForm />} />
    </div>
  );
};

export default Username;
