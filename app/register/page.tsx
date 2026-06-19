"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser, clearAuthError } from "@/store/authSlice";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // Local state elements for tracking form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Connect directly to the global authentication store department
  const { userInfo, loading, error } = useAppSelector((state) => state.auth);

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }

    return () => {
      dispatch(clearAuthError());
    };
  }, [userInfo, redirect, router, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Frontend validation guard before dispatching network request payloads
    if (!name || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  return (
    <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-md bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        {/* Header Branding Panel Block */}
        <div className="sm:mx-auto w-full sm:max-w-md text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Join STITCH SHOP v2 to manage orders.
          </p>
        </div>

        {/* Combined Error Reporting Interface Segment */}
        {(error || validationError) && (
          <div className="rounded-md bg-red-50 p-4 mb-6 border border-red-100 animate-fade-in">
            <p className="text-sm font-medium text-red-800">
              {error || validationError}
            </p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
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
                "Register"
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href={`/login${redirect !== "/" ? `?redirect=${redirect}` : ""}`}
            className="font-semibold text-red-600 hover:text-red-500"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
