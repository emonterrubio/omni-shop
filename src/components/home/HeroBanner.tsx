"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroBannerProps {
  products: any[];
}

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
}

export function HeroBanner({ products }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Filter for products that would make good hero banners
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

  // Use first 5 products for rotation, or all eligible products if less than 5
  const rotatingProducts = heroEligibleProducts.slice(0, 5);

  // Generate hero content for a product
  const generateHeroContent = (product: any): HeroContent => {
    const brand = product.brand || 'Premium';
    const model = product.model || 'Device';
    const category = product.category || 'Hardware';
    
    const productDescription = product.card_description || product.description || '';
    
    const getSingularCategory = (cat: string) => {
      const categoryMap: { [key: string]: string } = {
        'laptops': 'Laptop',
        'desktops': 'Desktop',
        'monitors': 'Monitor',
        'keyboards': 'Keyboard',
        'mice': 'Mouse',
        'headphones': 'Headphone',
        'headsets': 'Headset',
        'webcams': 'Webcam',
        'docking stations': 'Docking Station',
        'backpacks': 'Backpack'
      };
      return categoryMap[cat.toLowerCase()] || cat;
    };
    
    let title, subtitle, description;
    
    if (category.toLowerCase() === 'laptops' || product.model?.toLowerCase().includes('laptop')) {
      title = `Featured ${getSingularCategory(category)}`;
      subtitle = `${brand} ${model}`;
      description = productDescription || `Experience next-generation performance with cutting-edge technology. Perfect for productivity, creativity, and everything in between.`;
    } else if (category.toLowerCase() === 'desktops' || product.model?.toLowerCase().includes('desktop')) {
      title = `Featured ${getSingularCategory(category)}`;
      subtitle = `${brand} ${model}`;
      description = productDescription || `Unleash your potential with desktop-grade performance. Built for demanding workloads and seamless multitasking.`;
    } else if (category.toLowerCase() === 'monitors' || product.model?.toLowerCase().includes('monitor')) {
      title = `Featured ${getSingularCategory(category)}`;
      subtitle = `${brand} ${model}`;
      description = productDescription || `Immerse yourself in stunning visuals with our premium display technology. Enhanced productivity meets exceptional clarity.`;
    } else if (category.toLowerCase() === 'keyboards' || product.model?.toLowerCase().includes('keyboard')) {
      title = `Featured ${getSingularCategory(category)}`;
      subtitle = `${brand} ${model}`;
      description = productDescription || `Elevate your typing experience with premium keyboard technology. Precision, comfort, and style for every keystroke.`;
    } else if (category.toLowerCase() === 'mice' || product.model?.toLowerCase().includes('mouse')) {
      title = `Featured ${getSingularCategory(category)}`;
      subtitle = `${brand} ${model}`;
      description = productDescription || `Navigate with precision and comfort. Advanced tracking technology meets ergonomic design for seamless control.`;
    } else if (category.toLowerCase() === 'headphones' || product.model?.toLowerCase().includes('headphone')) {
      title = `Featured ${getSingularCategory(category)}`;
      subtitle = `${brand} ${model}`;
      description = productDescription || `Immerse yourself in crystal-clear audio. Premium sound quality meets comfort for hours of listening pleasure.`;
    } else if (category.toLowerCase() === 'webcams' || product.model?.toLowerCase().includes('webcam')) {
      title = `Featured ${getSingularCategory(category)}`;
      subtitle = `${brand} ${model}`;
      description = productDescription || `Connect with confidence through high-quality video. Crystal-clear imaging for professional meetings and personal calls.`;
    } else if (category.toLowerCase() === 'docking stations' || product.model?.toLowerCase().includes('dock')) {
      title = `Featured ${getSingularCategory(category)}`;
      subtitle = `${brand} ${model}`;
      description = productDescription || `Transform your workspace with powerful connectivity. Seamless integration for maximum productivity and organization.`;
    } else if (category.toLowerCase() === 'backpacks' || product.model?.toLowerCase().includes('backpack')) {
      title = `Featured ${getSingularCategory(category)}`;
      subtitle = `${brand} ${model}`;
      description = productDescription || `Carry your essentials with style and protection. Premium materials and smart organization for the modern professional.`;
    } else {
      title = `Featured ${getSingularCategory(category)}`;
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
  };

  // Get current hero content
  const currentContent = rotatingProducts.length > 0 
    ? generateHeroContent(rotatingProducts[currentIndex])
    : {
        title: "Featured Products",
        subtitle: "Discover Our Collection",
        description: "Explore our wide range of IT equipment and accessories.",
        buttonText: "Browse Catalog",
        buttonLink: "/catalog",
        imageSrc: "/images/placeholder.png",
        imageAlt: "Featured Products"
      };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (rotatingProducts.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % rotatingProducts.length
        );
        setIsVisible(true);
      }, 500); // Half second for fade out
    }, 5000);

    return () => clearInterval(interval);
  }, [rotatingProducts.length]);

  return (
    <div className="py-2 sm:mt-4 sm:mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 lg:gap-8">
        {/* Product image - Takes up full width on mobile, 1 column on desktop */}
        <div className="lg:col-span-1 flex justify-center w-full order-1 lg:order-2">
          <div className="relative w-80 h-64 md:w-96 md:h-72 lg:w-120 lg:h-80">
            {/* Product image with fade animation */}
            <div className={`relative z-10 w-full h-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src={currentContent.imageSrc}
                alt={currentContent.imageAlt}
                width={320}
                height={240}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Text content - Takes up full width on mobile, 2 columns on desktop */}
        <div className="lg:col-span-2 text-center lg:text-left w-full order-2 lg:order-1">
          <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-regular text-blue-600 mb-3">
              {currentContent.title}
            </h2>
            <h3 className="text-4xl leading-1 sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              {currentContent.subtitle}
            </h3>
            <p className="text-base leading-2 font-regular text-gray-800 mb-4 sm:mb-6">
              {currentContent.description}
            </p>
            <Link href={currentContent.buttonLink}>
              <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors text-base">
                {currentContent.buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Product indicators */}
      {rotatingProducts.length > 1 && (
        <div className="flex justify-center space-x-2">
          {rotatingProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsVisible(true);
                }, 5000);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
