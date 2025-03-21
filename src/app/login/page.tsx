"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // This would be replaced with actual authentication logic
    try {
      // Mock authentication - would be replaced with actual auth
      console.log("Login attempt:", { email, password });
      setTimeout(() => {
        setIsLoading(false);
        // Redirect would happen after authentication
      }, 1000);
    } catch (err) {
      setError("Invalid login credentials. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] bg-lime-pale">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 shadow-lg rounded-xl">
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center text-gray-medium hover:text-lime-bright transition"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-dark">
                Welcome to <span className="text-lime-bright">PoseAI</span>
              </h1>
              <p className="text-gray-medium mt-2">
                Log in to your account to continue
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-dark"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-lime-bright hover:text-lime-bright/80"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-lime-bright focus:ring-lime-bright border-gray-lighter rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-medium"
                >
                  Remember me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full primary-button py-3 text-center font-semibold disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-lighter"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-lighter rounded-md shadow-sm bg-white text-sm font-medium text-gray-dark hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.514 0-10 4.486-10 10s4.486 10 10 10c8.837 0 10.966-8.136 10.116-11.666h-10.116z"
                      fill="#4285F4"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-lighter rounded-md shadow-sm bg-white text-sm font-medium text-gray-dark hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      d="M13.397 20.997v-8.196h2.765l0.411-3.209h-3.176v-2.048c0-0.929 0.258-1.563 1.587-1.563h1.684v-2.862c-0.321-0.043-1.401-0.137-2.662-0.137-2.64 0-4.434 1.610-4.434 4.573v2.037h-2.989v3.209h2.989v8.196h4.826z"
                      fill="#3B5998"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-medium">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-lime-bright hover:text-lime-bright/80"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
