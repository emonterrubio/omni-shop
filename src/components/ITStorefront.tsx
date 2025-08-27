import React from "react";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Categories } from "./home/Categories";
import { FeaturedItems } from "./home/FeaturedItems";
import { RecommendedItems } from "./home/RecommendedItems";
import { RecentOrders } from "./home/RecentOrders";
import { EligibilityInfo } from "./home/EligibilityInfo";
import { SearchBarClient } from "./search/SearchBarClient";
import { QuickActionsClient } from "./home/QuickActionsClient";
import { MainNavigationClient } from "./layout/MainNavigationClient";
import { HeroBanner } from "./home/HeroBanner";
import { RequestHardwareBanner } from "./product/RequestHardwareBanner";
interface ITStorefrontProps {
  categories: any[];
  products: any[];
  quickActions: any[];
  eligibilityData: any;
}

function getRandomItems(arr: any[], n: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function getFeaturedProducts(products: any[], n = 3) {
  return getRandomItems(products, n);
}

function getRecommendedProducts(products: any[], n = 3) {
  const eligibleProducts = products.filter((product) => Boolean(product.battery));
  const brands = Array.from(new Set(eligibleProducts.map((p) => p.brand)));
  const selectedBrand = brands[Math.floor(Math.random() * brands.length)];
  const brandProducts = eligibleProducts.filter((p) => p.brand === selectedBrand);
  const displayedProducts = getRandomItems(brandProducts, n);
  const showCompareButton = eligibleProducts.length > 3;
  return { displayedProducts, showCompareButton };
}

function getRandomHeroBanner(products: any[]) {
  // Filter for products that would make good hero banners (laptops, desktops, monitors)
  const heroEligibleProducts = products.filter(product => {
    const category = product.category?.toLowerCase() || '';
    const model = product.model?.toLowerCase() || '';
    return category === 'laptops' || category === 'desktops' || 
           category === 'monitors' || category === 'keyboards' || 
           category === 'mice' || category === 'headphones' || 
           category === 'webcams' || category === 'docking stations' ||
           category === 'backpacks' || model.includes('laptop') || 
           model.includes('desktop') || model.includes('monitor') ||
           model.includes('keyboard') || model.includes('mouse') ||
           model.includes('headphone') || model.includes('webcam');
  });

  if (heroEligibleProducts.length === 0) {
    // Fallback to any product if no eligible ones found
    return products[Math.floor(Math.random() * products.length)];
  }

  return heroEligibleProducts[Math.floor(Math.random() * heroEligibleProducts.length)];
}

function generateHeroBannerContent(product: any) {
  const brand = product.brand || 'Premium';
  const model = product.model || 'Device';
  const category = product.category || 'Hardware';
  
  // Use the actual product descriptions when available
  const productDescription = product.card_description || product.description || '';
  
  // Generate dynamic content based on product type
  let title, subtitle, description;
  
  if (category.toLowerCase() === 'laptops' || product.model?.toLowerCase().includes('laptop')) {
    title = `Featured ${category}`;
    subtitle = `${brand} ${model}`;
    // Use product description if available, otherwise fallback to generic
    description = productDescription || `Experience next-generation performance with cutting-edge technology. Perfect for productivity, creativity, and everything in between.`;
  } else if (category.toLowerCase() === 'desktops' || product.model?.toLowerCase().includes('desktop')) {
    title = `Featured ${category}`;
    subtitle = `${brand} ${model}`;
    description = productDescription || `Unleash your potential with desktop-grade performance. Built for demanding workloads and seamless multitasking.`;
  } else if (category.toLowerCase() === 'monitors' || product.model?.toLowerCase().includes('monitor')) {
    title = `Featured ${category}`;
    subtitle = `${brand} ${model}`;
    description = productDescription || `Immerse yourself in stunning visuals with our premium display technology. Enhanced productivity meets exceptional clarity.`;
  } else if (category.toLowerCase() === 'keyboards' || product.model?.toLowerCase().includes('keyboard')) {
    title = `Featured ${category}`;
    subtitle = `${brand} ${model}`;
    description = productDescription || `Elevate your typing experience with premium keyboard technology. Precision, comfort, and style for every keystroke.`;
  } else if (category.toLowerCase() === 'mice' || product.model?.toLowerCase().includes('mouse')) {
    title = `Featured ${category}`;
    subtitle = `${brand} ${model}`;
    description = productDescription || `Navigate with precision and comfort. Advanced tracking technology meets ergonomic design for seamless control.`;
  } else if (category.toLowerCase() === 'headphones' || product.model?.toLowerCase().includes('headphone')) {
    title = `Featured ${category}`;
    subtitle = `${brand} ${model}`;
    description = productDescription || `Immerse yourself in crystal-clear audio. Premium sound quality meets comfort for hours of listening pleasure.`;
  } else if (category.toLowerCase() === 'webcams' || product.model?.toLowerCase().includes('webcam')) {
    title = `Featured ${category}`;
    subtitle = `${brand} ${model}`;
    description = productDescription || `Connect with confidence through high-quality video. Crystal-clear imaging for professional meetings and personal calls.`;
  } else if (category.toLowerCase() === 'docking stations' || product.model?.toLowerCase().includes('dock')) {
    title = `Featured ${category}`;
    subtitle = `${brand} ${model}`;
    description = productDescription || `Transform your workspace with powerful connectivity. Seamless integration for maximum productivity and organization.`;
  } else if (category.toLowerCase() === 'backpacks' || product.model?.toLowerCase().includes('backpack')) {
    title = `Featured ${category}`;
    subtitle = `${brand} ${model}`;
    description = productDescription || `Carry your essentials with style and protection. Premium materials and smart organization for the modern professional.`;
  } else {
    title = `Featured ${category}`;
    subtitle = `${brand} ${model}`;
    description = productDescription || `Discover exceptional quality and performance. Designed to enhance your workflow and exceed expectations.`;
  }

  return {
    title,
    subtitle,
    description,
    buttonText: "See Details",
    buttonLink: `/product/${encodeURIComponent(product.model)}?from=hero`,
    imageSrc: product.image,
    imageAlt: `${brand} ${model}`
  };
}

export function ITStorefront({
  categories,
  products,
  quickActions,
  eligibilityData,
}: ITStorefrontProps) {
  const featuredProducts = getFeaturedProducts(products);
  const { displayedProducts, showCompareButton } = getRecommendedProducts(products);
  const names = ["Ed", "Marlon", "Marcus", "Lekeedra", "Eric", "Krish", "Michael", "Kamal", "Eve"];
  const randomName = names[Math.floor(Math.random() * names.length)];

  // Generate dynamic hero banner content
  const randomHeroProduct = getRandomHeroBanner(products);
  const heroBannerContent = generateHeroBannerContent(randomHeroProduct);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Header />
        <MainNavigationClient />
      </div>  
      <main className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8">
          {/* Hero Banner */}
          <HeroBanner
            title={heroBannerContent.title}
            subtitle={heroBannerContent.subtitle}
            description={heroBannerContent.description}
            buttonText={heroBannerContent.buttonText}
            buttonLink={heroBannerContent.buttonLink}
            imageSrc={heroBannerContent.imageSrc}
            imageAlt={heroBannerContent.imageAlt}
          />
          {/* Recent Orders */}
          <RecentOrders maxOrders={2} />
          {/* <SearchBarClient /> */}
          {/* <Categories /> */}
          {/* <QuickActionsClient actions={quickActions} /> */}
          {/* Featured Items */}
          <FeaturedItems displayedProducts={featuredProducts} />
          {/* Recommended Items */}
          <RecommendedItems displayedProducts={displayedProducts} showCompareButton={showCompareButton} />
          {/* Request Hardware Banner */}
          <RequestHardwareBanner />
          {/* <EligibilityInfo data={eligibilityData} /> */}
      </main>
      <Footer />
    </div>
  );
} 