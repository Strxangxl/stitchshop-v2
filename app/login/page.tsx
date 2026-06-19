"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, clearAuthError } from "@/store/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // Local state for tracking uncontrolled form element string keys
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Connect to the auth department inside the store
  const { userInfo, loading, error } = useAppSelector((state) => state.auth);

  // If a redirect parameter exists in the URL (e.g., /login?redirect=shipping), capture it
  const redirect = searchParams.get("redirect") || "/";

  // Watcher: If the user is already authenticated, boot them straight to the destination
  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }

    // Cleanup error history when user mounts away from the screen
    return () => {
      dispatch(clearAuthError());
    };
  }, [userInfo, redirect, router, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
  };

  return (
    <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-md bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        {/* Component Header Block */}
        <div className="sm:mx-auto w-full sm:max-w-md text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Sign In to Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back to STITCH SHOP v2.
          </p>
        </div>

        {/* Dynamic State Alert Framework Block */}
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6 border border-red-100 animate-fade-in">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md border border-transparent py-2.5 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        {/* Multi-route Navigation Toggle Anchor */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href={`/register${redirect !== "/" ? `?redirect=${redirect}` : ""}`}
            className="font-semibold text-red-600 hover:text-red-500"
          >
            Register Now
          </Link>
        </p>
      </div>
    </main>
  );
}
