"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "@/lib/api/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useGoogleSync } from "@/lib/hook/useGoogleSync";
import { signIn, signOut, useSession } from "next-auth/react";


export default function RegisterPage() {
  const router = useRouter();

  const { setUser, setToken } = useAuthStore();

  const { data: session } = useSession();
  useGoogleSync();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const validatePassword = (pwd: string): string | null => {
      if (pwd.length < 8) {
        return "Password must be at least 8 characters long.";
      }
      if (!/[A-Z]/.test(pwd)) {
        return "Password must contain at least one uppercase letter.";
      }
      if (!/[a-z]/.test(pwd)) {
        return "Password must contain at least one lowercase letter.";
      }
      if (!/\d/.test(pwd)) {
        return "Password must contain at least one digit (0-9).";
      }
      return null;
    };


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(username, email, password);

      setUser(data.user);
      setToken(data.token);

      router.push("/profile");
    } catch (err: unknown) {
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
        onSubmit={handleRegister}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl shadow-md p-6 w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center text-color-text">
          Create Account
        </h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mb-3 text-center"
          >
            {error}
          </motion.p>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-color-text/80">
            Name
          </label>
          <input
            id="text"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent border border-border rounded-md px-3 py-2 focus:outline-none focus:border-accent text-color-text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-color-text/80">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border border-border rounded-md px-3 py-2 focus:outline-none focus:border-accent text-color-text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-color-text/80">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border border-border rounded-md px-3 py-2 focus:outline-none focus:border-accent text-color-text"
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
            "Sign Up"
          )}
        </button>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Log in
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
