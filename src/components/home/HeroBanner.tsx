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
    <div className="rounded-lg py-6 sm:py-8 md:py-8 mb-6 sm:mb-8">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
        {/* Left side - Text content */}
        <div className="flex-1 text-center lg:text-left w-full lg:w-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
            {title}
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
            {subtitle}
          </h3>
          <p className="text-base sm:text-base leading-tight font-regular text-gray-800 mb-4 sm:mb-6">
            {description}
          </p>
          <Link href={buttonLink}>
            <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors text-base">
              {buttonText}
            </button>
          </Link>
        </div>
        
        {/* Product image - Top on mobile, right on desktop */}
        <div className="flex-1 flex justify-center w-full lg:w-auto lg:mr-12 lg:justify-end">
          <div className="relative w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-96 lg:h-72">
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
