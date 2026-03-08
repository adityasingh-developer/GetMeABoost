"use client";

import MyPageEditor from "@/components/MyPageEditor";
import { useDashboardData } from "@/app/dashboard/DashboardDataContext";

export default function DashboardMyPage() {
  const { dashboardData, setDashboardData } = useDashboardData();

  return (
    <MyPageEditor
      creatorUsername={dashboardData?.username || ""}
      username={dashboardData?.name || "Your Page"}
      description={dashboardData?.description || ""}
      profileImage={dashboardData?.profileImage || ""}
      bannerImage={dashboardData?.bannerImage || ""}
      links={dashboardData?.links || {}}
      supporters={dashboardData?.supporters || []}
      followersCount={dashboardData?.followersCount ?? 0}
      membershipTiers={dashboardData?.membershipTiers ?? []}
      membersCount={dashboardData?.membersCount ?? 0}
      pageSections={dashboardData?.pageSections || {}}
      onPageSectionsChange={(nextPageSections) =>
        setDashboardData((prev) => ({
          ...prev,
          pageSections: nextPageSections,
        }))
      }
    />
  );
}
