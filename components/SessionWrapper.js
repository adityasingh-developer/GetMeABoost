"use client";
import React from 'react'
import { SessionProvider } from 'next-auth/react';

const SessionWrapper = ({ children, session = null }) => {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
        {children}
    </SessionProvider>
  )
}

export default SessionWrapper
