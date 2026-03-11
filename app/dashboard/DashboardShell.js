"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { DashboardDataProvider } from "@/app/dashboard/DashboardDataContext";

const tabs = [
  {
    href: "/dashboard",
    label: "Overview",
    iconPath: "/icons/dashboard-overview.svg",
  },
  {
    href: "/dashboard/mypage",
    label: "My Page",
    iconPath: "/icons/dashboard-mypage.svg",
  },
  {
    href: "/dashboard/supporters",
    label: "Supporters",
    iconPath: "/icons/dashboard-supporters.svg",
  },
  {
    href: "/dashboard/payout",
    label: "Payout",
    iconPath: "/icons/dashboard-payout.svg",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    iconPath: "/icons/dashboard-settings.svg",
  },
];

const titleByPath = {
  "/dashboard": "Overview",
  "/dashboard/mypage": "My Page",
  "/dashboard/supporters": "Supporters",
  "/dashboard/payout": "Payout",
  "/dashboard/settings": "Settings",
};

const avatarColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-teal-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-pink-500",
];

export default function DashboardLayout({ children, dashboardUser, initialDashboardData }) {
  const pathname = usePathname();
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const user = dashboardUser;
  const displayName = user?.username || user?.name || user?.email || "User";
  const identifier = user?.username || user?.name || user?.email || "U";
  const initial = displayName
    ? displayName
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "U";
  const seed = identifier.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const avatarClass = avatarColors[seed % avatarColors.length];
  const activeTitle = titleByPath[pathname] || "Dashboard";
  const contextValue = useMemo(
    () => ({
      dashboardData,
      setDashboardData,
    }),
    [dashboardData]
  );

  useEffect(() => { 
    if (dashboardData?.isFullyLoaded) return;
    const hydrateDashboardData = async () => {
      const res = await fetch("/api/users/me/profile-status?scope=dashboard", { cache: "no-store" });
      const data = await res.json();
      setDashboardData((prev) => ({
        ...prev,
        ...data,
        isFullyLoaded: true,
      }));
    };

    hydrateDashboardData();

  }, [dashboardData?.isFullyLoaded]);

  return (
    <div className="flex pt-20 w-full">
      <aside className="sticky top-20 h-[calc(100vh-5rem)] w-[20%] shrink-0 bg-neutral-900 py-3 px-3 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold px-4 mt-2 mb-4">Dashboard</h2>
          <ul className="flex gap-1 flex-col">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    className={`flex items-center rounded-md gap-2 text-xl py-2 px-4 transition-colors ${isActive ? "bg-neutral-700 text-white" : "hover:bg-neutral-800 text-neutral-100"
                      }`}
                  >
                    <img src={tab.iconPath} alt="" aria-hidden className="w-5 h-5" />
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-8 items-center justify-between px-4 flex gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${displayName} profile`}
                className="h-10 w-10 rounded-full object-cover shrink-0"
              />
            ) : (
              <button
                title={displayName}
                className={`${avatarClass} h-10 w-10 rounded-full flex items-center justify-center text-white font-medium shrink-0`}
                aria-label={`User avatar for ${displayName}`}
              >
                {initial}
              </button>
            )}
            <h1 className="text-lg truncate">{displayName}</h1>
          </div>

          <button
            type="button"
            onClick={() => signOut()}
            className="bg-neutral-800 hover:bg-neutral-600 duration-200 text-white font-medium py-2 px-3 rounded-md cursor-pointer"
            aria-label="Logout"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </aside>

      <section className="w-[80%] py-5 px-6">
        <h1 className="text-3xl font-semibold mb-4">{activeTitle}</h1>
        <DashboardDataProvider value={contextValue}>{children}</DashboardDataProvider>
      </section>
    </div>
  );
}
