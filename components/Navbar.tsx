"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/authSlice";
import { User, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const dispatch = useAppDispatch();

  // Local state flag to track if the browser has finished mounting the component
  const [mounted, setMounted] = useState(false);

  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Set mounted flag to true immediately upon client-side execution loop
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Branding Link */}
        <div className="flex-1 md:flex-none">
          <Link
            href="/"
            className="text-lg font-bold tracking-wide text-red-600 transition-opacity hover:opacity-80"
          >
            {/* Visible only on mobile screens (below 768px layout break) */}
            <span className="block md:hidden">SS</span>

            {/* Hidden on mobile, forced visible on medium viewports and up */}
            <span className="hidden md:block">STITCHSHOP</span>
          </Link>
        </div>

        {/* Navigation Actions Menu */}
        <div className="flex items-center gap-x-6">
          {/* Hydration Guard Loop: 
            Render absolute blank placeholders until client mounting is settled.
            This eliminates server-client text variations entirely.
          */}
          {!mounted ? (
            <div className="w-24 h-4 bg-transparent animate-pulse" />
          ) : userInfo ? (
            <div className="flex items-center gap-x-4">
              <span className="text-sm font-bold text-gray-700">
                {userInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-red-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-gray-700 hover:text-red-600"
              >
                Register
              </Link>
            </>
          )}

          <Link
            href="#"
            className="text-gray-600 hover:text-red-600 transition-colors"
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </Link>

          <Link
            href="/cart"
            className="group relative flex items-center p-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            <ShoppingBag
              className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors"
              strokeWidth={1.5}
            />
            {mounted && totalItemsCount > 0 && (
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
