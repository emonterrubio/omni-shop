"use client";
import React from "react";
import { QuickActions } from "./QuickActions";

export function QuickActionsClient({ actions }: { actions: any[] }) {
  const handleActionClick = (query: string) => {
    // Implement action logic here
  };
  return <QuickActions actions={actions} onActionClick={handleActionClick} />;
} 