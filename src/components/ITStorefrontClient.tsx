"use client";
import React, { useState } from "react";
import { SearchBar } from "./search/SearchBar";
import { AIResponsePanel } from "./search/AIResponsePanel";
import { QuickActions } from "./home/QuickActions";
import { Categories } from "./home/Categories";
import { RecommendedItems } from "./home/RecommendedItems";
import { RecentOrders } from "./home/RecentOrders";
import { EligibilityInfo } from "./home/EligibilityInfo";
import { MainNavigation } from "./layout/MainNavigation";
import { QuickAction, RecentOrder, EligibilityData, Category } from "@/types";
import { HardwareSpec } from "@/data/hardwareData";

interface ITStorefrontClientProps {
  quickActions: QuickAction[];
  categories: Category[];
  displayedProducts: HardwareSpec[];
  showCompareButton: boolean;
  recentOrders: RecentOrder[];
  eligibilityData: EligibilityData;
}

export function ITStorefrontClient({
  quickActions,
  categories,
  displayedProducts,
  showCompareButton,
  recentOrders,
  eligibilityData,
}: ITStorefrontClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Simulate AI response to user query
  const handleAIQuery = (query: string) => {
    setLoadingAI(true);
    setShowAIPanel(true);
    setTimeout(() => {
      if (query.toLowerCase().includes("laptop")) {
        setAiResponse("Based on your role as a Senior Developer, you're eligible for a high-performance laptop. I recommend the Dell XPS 15 with 32GB RAM or the MacBook Pro 14\". Both are approved for your department and within your budget allocation. Would you like details on either option?");
      } else if (query.toLowerCase().includes("home office") || query.toLowerCase().includes("remote setup")) {
        setAiResponse("I can help with your home office setup! Based on your remote work status, you're eligible for: a secondary monitor, docking station, ergonomic keyboard, mouse, and headset. Would you like me to create a bundle with our recommended items for Engineering team members?");
      } else if (query.toLowerCase().includes("monitor")) {
        setAiResponse("For your role, you're eligible for up to two external monitors. I see you currently have one Dell 27\" monitor. Would you like a matching second monitor? I can also suggest ultrawide alternatives if you prefer a single-monitor setup.");
      } else {
        setAiResponse("I understand you're looking for IT equipment. Could you tell me more about what you need? I can help with laptops, monitors, accessories, or complete workspace setups tailored to your role and eligibility.");
      }
      setLoadingAI(false);
    }, 1000);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      handleAIQuery(searchQuery);
    }
  };

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />
      <Categories />
      <QuickActions actions={quickActions} onActionClick={handleAIQuery} />
      {showAIPanel && (
        <AIResponsePanel
          response={aiResponse}
          isLoading={loadingAI}
          onAccept={() => setShowAIPanel(false)}
          onDecline={() => setShowAIPanel(false)}
        />
      )}
      <RecommendedItems displayedProducts={displayedProducts} showCompareButton={showCompareButton} />
      <RecentOrders orders={recentOrders} />
      <EligibilityInfo data={eligibilityData} />
      <MainNavigation />
    </>
  );
} 