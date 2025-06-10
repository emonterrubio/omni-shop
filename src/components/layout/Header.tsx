"use client";
import React, { useState } from "react";
import { ShoppingCart, User, Search as SearchIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  cartItems: number;
}

export function Header({ cartItems }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-deepBlue border-b border-gray-200 relative">
      <div className="absolute left-0 w-full h-full pointer-events-none z-0">
        <svg
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <polygon
            points="0,0 50,0 60,100 0,100"
            fill="#255AF6"
          />
        </svg>
      </div>
      <div className="absolute right-0 w-full h-full pointer-events-none z-0">
        <svg 
          viewBox="0 0 150 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <circle
            cx="270"
            cy="60"
            r="150"
            fill="#255AF6"
          />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between px-4 py4 md:py-8">
          <div className="flex items-center">
            <Link href="/">
              <img src="/logo/ea_logo_white.svg" alt="Omni Shopping" className="h-10 object-contain" />
            </Link>
          </div>
          <div className="flex-1 flex justify-end items-center relative space-x-4">
            {!isHome && (
              <Link
                href="/search"
                className="p-2 text-white hover:text-gray-100"
                aria-label="Search"
              >
                <SearchIcon className="w-6 h-6" />
              </Link>
            )}
            <button className="relative p-2 text-white hover:text-gray-100">
              <ShoppingCart className="w-6 h-6" />
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                  {cartItems}
                </span>
              )}
            </button>
            <button className="p-2 text-white hover:text-gray-100">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 