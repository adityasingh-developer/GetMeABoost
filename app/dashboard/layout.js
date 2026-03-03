import DashboardShell from "./DashboardShell";

export const metadata = {
  title: "GetMeABoost - Dashboard",
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
