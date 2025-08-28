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
    <div className="py-2 sm:mt-4 sm:mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 lg:gap-8">
        {/* Product image - Takes up full width on mobile, 1 column on desktop */}
        <div className="lg:col-span-1 flex justify-center w-full order-1 lg:order-2">
          <div className="relative w-80 h-64 md:w-96 md:h-72 lg:w-120 lg:h-80">
            {/* Product image */}
            <div className="relative z-10 w-full h-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={320}
                height={240}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Text content - Takes up full width on mobile, 2 columns on desktop */}
        <div className="lg:col-span-2 text-center lg:text-left w-full order-2 lg:order-1">
          <h2 className="text-3xl sm:text-4xl font-regular text-blue-600 mb-3">
            {title}
          </h2>
          <h3 className="text-4xl leading-1 sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            {subtitle}
          </h3>
          <p className="text-base leading-2 font-regular text-gray-800 mb-4 sm:mb-6">
            {description}
          </p>
          <Link href={buttonLink}>
            <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors text-base">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
