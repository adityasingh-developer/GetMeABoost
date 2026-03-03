"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return null;
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to your dashboard, {session?.user?.name || 'User'}!</h1>
    </div>
  )
}

export default page
