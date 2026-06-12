"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function Navbar() {
  const { cartItems } = useAppSelector((state) => state.cart);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Branding Link */}
        <div className="flex-1 md:flex-none">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
          >
            STITCH SHOP{" "}
            <span className="text-xs font-semibold text-gray-400">v2</span>
          </Link>
        </div>

        {/* Navigation Actions Menu */}
        <div className="flex items-center gap-x-6">
          <Link
            href="/cart"
            className="group relative flex items-center p-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            {/* SVG Modern Shopping Bag Icon */}
            <svg
              className="h-6 w-6 flex-shrink-0 text-gray-600 group-hover:text-gray-900 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            {/* Dynamic Counter Badge Notification */}
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white animate-fade-in">
                {totalItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
