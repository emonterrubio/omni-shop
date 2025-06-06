"use client";
import React, { useState } from "react";
import { BottomNavigation } from "./BottomNavigation";

export function BottomNavigationClient() {
  const [activeTab, setActiveTab] = useState("home");
  return <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />;
} 