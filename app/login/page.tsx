"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useAuthStore } from "@/store/useAuthStore";
import { useGoogleSync } from "@/lib/hook/useGoogleSync";
import { signIn, signOut, useSession } from "next-auth/react";
import { loginUser } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const { data: session } = useSession();

  useGoogleSync();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);

      setUser(data.user);
      setToken(data.token);

      router.push("/profile");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl shadow-md p-6 w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-xl font-semibold text-center text-color-text">
          Login
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-400 text-sm text-center rounded-md py-1">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-color-text/80">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="bg-transparent border border-border rounded-md px-3 py-2 focus:outline-none focus:border-accent text-color-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-color-text/80">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="bg-transparent border border-border rounded-md px-3 py-2 focus:outline-none focus:border-accent text-color-text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-accent flex justify-center text-white rounded-md hover:opacity-90 transition cursor-pointer"
        >
          {loading ? (
            <span className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full" />
          ) : (
            "Login"
          )}
        </button>
        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
        {!session ? (
          <button
            type="button"
            onClick={() => signIn("google")}
            className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition cursor-pointer"
          >
            Sign in with Google
          </button>
        ) : (
          <button
            type="button"
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
          >
            Sign out
          </button>
        )}
      </motion.form>
    </div>
  );
}
