import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
}

export function HeroBanner({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt
}: HeroBannerProps) {
  return (
    <div className="rounded-lg mb-6 sm:mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
        {/* Text content - Takes up 2 columns on desktop */}
        <div className="lg:col-span-2 text-center lg:text-left w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
            {title}
          </h2>
          <h3 className="text-xl sm:text-3xl font-regular text-gray-900 mb-2 sm:mb-3 md:mb-4">
            {subtitle}
          </h3>
          <p className="text-base sm:text-lg leading-tight font-regular text-gray-800 mb-4 sm:mb-6">
            {description}
          </p>
          <Link href={buttonLink}>
            <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors text-base">
              {buttonText}
            </button>
          </Link>
        </div>
        
        {/* Product image - Takes up 1 column on desktop, full width on mobile */}
        <div className="lg:col-span-1 flex w-full">
          <div className="relative w-full h-full">
            {/* Product image */}
            <div className="relative z-10 w-full h-full transform rotate-3 sm:rotate-4 md:rotate-5 lg:rotate-6">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={256}
                height={192}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
