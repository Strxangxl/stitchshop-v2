"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function Navbar() {
  const { cartItems } = useAppSelector((state) => state.cart);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Branding Link Matching Image */}
        <div className="flex-1 md:flex-none">
          <Link
            href="/"
            className="text-lg font-bold tracking-wider text-red-600 transition-opacity hover:opacity-80"
          >
            STITCHSHOP
          </Link>
        </div>

        {/* Navigation Actions Menu */}
        <div className="flex items-center gap-x-6">
          {/* Auth Links matching image */}
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Register
          </Link>

          {/* User Profile Icon Link */}
          <Link href="/profile" className="text-gray-600 hover:text-gray-900">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>

          {/* Cart Icon Link with Counter Badge */}
          <Link
            href="/cart"
            className="group relative flex items-center p-2 text-gray-700 hover:text-gray-900"
          >
            <svg
              className="h-6 w-6 text-gray-600 group-hover:text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {totalItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
