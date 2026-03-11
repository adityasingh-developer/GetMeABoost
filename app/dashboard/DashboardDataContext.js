"use client";

import { createContext, useContext } from "react"

const DashboardDataContext = createContext(null);

export function DashboardDataProvider({ value, children }) {
  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext);
  if (!context) {
    throw new Error("useDashboardData must be used within DashboardDataProvider.");
  }
  return context;
}

