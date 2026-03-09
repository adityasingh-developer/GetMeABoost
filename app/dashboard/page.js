
"use client";

import { useDashboardData } from "@/app/dashboard/DashboardDataContext";
import SupportersList from "@/components/SupportersList";

export default function DashboardOverviewPage() {
  const { dashboardData } = useDashboardData();
  const supporters = Array.isArray(dashboardData?.supporters) ? dashboardData.supporters : [];
  const members = Array.isArray(dashboardData?.members) ? dashboardData.members : [];
  const supportersCount = dashboardData?.supportersCount ?? supporters.length;
  const followersCount = dashboardData?.followersCount ?? 0;
  const membersCount = dashboardData?.membersCount ?? members.length;
  const formattedSupporters = supporters.map((supporter) => ({
    id: supporter?.id || `${supporter?.name || "supporter"}-${supporter?.supportedAt || "0"}`,
    name: supporter?.name || "Anonymous",
    email: supporter?.email || "",
    profileImage: supporter?.profileImage || "",
    amount: supporter?.amount ?? 0,
    message: String(supporter?.message || "-"),
  }));
  const recentSupporters = formattedSupporters.slice().reverse();
  const formattedMembers = members.map((member) => ({
    id: member?.id || `${member?.name || "member"}-${member?.type || "tier"}`,
    name: member?.name || "Unknown member",
    type: member?.type || "Member",
    amount: member?.amount ?? 0,
  }));
  const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const totalSupportAmount = dashboardData?.totalSupportAmount ?? 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-around">
        <div className="flex flex-col px-16 py-5 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <img src="/icons/stats-supporters.svg" alt="" aria-hidden className="w-6 h-6" />
            Supporters</span>
          <span className=" text-2xl">{supportersCount}</span>
        </div>
        <div className="flex flex-col px-16 py-5 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <img src="/icons/stats-followers.svg" alt="" aria-hidden className="w-6 h-6" />
            Followers</span>
          <span className=" text-2xl">{followersCount}</span>
        </div>
        <div className="flex flex-col px-16 py-5 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <img src="/icons/stats-members.svg" alt="" aria-hidden className="w-6 h-6" />
            Members</span>
          <span className=" text-2xl">{membersCount}</span>
        </div>
        <div className="flex flex-col px-12 py-5 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <img src="/icons/stats-total-support.svg" alt="" aria-hidden className="w-7 h-7" />
            Total Support</span>
          <span className=" text-2xl">{usdFormatter.format(totalSupportAmount)}</span>
        </div>
      </div>

      <div>
        <h1 className="text-2xl mb-4 font-medium">Recent Supports, Members</h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#222] bg-[#151515] p-4">
            <div className="px-5 py-4 border-b border-[#222]">
              <h2 className="text-lg font-semibold text-neutral-100">Supporters</h2>
            </div>
            <div className="mt-4">
              <SupportersList
                supporters={recentSupporters}
                showEmail
                formatAmount={(amount) => usdFormatter.format(Number(amount || 0))}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#222] bg-[#151515] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#222]">
              <h2 className="text-lg font-semibold text-neutral-100">Members</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead className="bg-[#191919]">
                  <tr className="text-left text-sm text-neutral-300">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Membership Type</th>
                    <th className="px-5 py-3 font-medium">Membership Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {formattedMembers.length ? (
                    formattedMembers.slice().reverse().map((member) => (
                      <tr key={member.id} className="border-t border-[#222] text-neutral-200">
                        <td className="px-5 py-4">{member.name}</td>
                        <td className="px-5 py-4">{member.type}</td>
                        <td className="px-5 py-4 font-semibold">{usdFormatter.format(member.amount)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-t border-[#222] text-neutral-400">
                      <td colSpan={3} className="px-5 py-8 text-center">
                        No members yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

