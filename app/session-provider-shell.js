import SessionWrapper from "@/components/SessionWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function SessionProviderShell({ children }) {
  const session = await getServerSession(authOptions);

  return <SessionWrapper session={session}>{children}</SessionWrapper>;
}
