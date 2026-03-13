import { Suspense } from "react";
import DashboardShellServer from "./DashboardShellServer";

export const metadata = {
  title: "GetMeABoost - Dashboard",
  description: "GetMeABoost - This website is a crowdfunding platform for creators.",
  icons: {
    icon: "logo_dark.png"
  }
};

export default async function DashboardLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f]" />}>
      <DashboardShellServer>{children}</DashboardShellServer>
    </Suspense>
  );
}
