"use client";

import { useDashboardData } from "@/app/dashboard/DashboardDataContext";
import SupportersList from "@/components/SupportersList";

export default function DashboardSupportersPage() {
  const { dashboardData } = useDashboardData();
  const supporters = Array.isArray(dashboardData?.supporters)
    ? dashboardData.supporters.slice().reverse()
    : [];
  const isHydrating = !dashboardData?.isFullyLoaded && supporters.length === 0;

  return (
    <div className="rounded-2xl border border-[#222] bg-[#151515] p-4 md:p-6">
      <h2 className="text-2xl font-semibold text-neutral-100">All Supporters</h2>
      <p className="mt-1 text-sm text-neutral-400">
        Latest supporters and their messages.
      </p>

      <div className="mt-5">
        {isHydrating ? (
          <p className="text-neutral-400 text-sm">Loading supporters...</p>
        ) : (
          <SupportersList supporters={supporters} />
        )}
      </div>
    </div>
  );
}
