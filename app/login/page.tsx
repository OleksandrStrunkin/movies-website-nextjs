"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      // ✅ Зберігаємо користувача і токен у Zustand
      setUser(data.user);
      setToken(data.token);

      // 🔁 Перенаправляємо на профіль
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
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
          className="w-full py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center mt-4 text-muted-foreground">
          Don't have an account yet?{" "}
          <Link href="/register" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
