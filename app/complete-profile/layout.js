import { Suspense } from "react";
import SessionWrapper from "@/components/SessionWrapper";

export default function CompleteProfileLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#222]" />}>
      <SessionWrapper>{children}</SessionWrapper>
    </Suspense>
  );
}
