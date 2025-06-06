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
    <header className="sticky top-0 z-50 bg-heritageBlue border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-6">
        <div className="flex items-center ml-4">
          <img src="/logo/ea_logo_white.svg" alt="Omni Shopping" className="h-10 object-contain" />
        </div>
        <div className="flex-1 flex justify-end items-center gap-4 relative">
          {!isHome && (
            <Link
              href="/search"
              className="p-2 text-white hover:text-gray-100"
              aria-label="Search"
            >
              <SearchIcon className="w-6 h-6" />
            </Link>
          )}
          <button className="p-2 text-white hover:text-gray-100">
            <User className="w-6 h-6" />
          </button>
          <button className="relative p-2 text-white hover:text-gray-100">
            <ShoppingCart className="w-6 h-6" />
            {cartItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                {cartItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
} 