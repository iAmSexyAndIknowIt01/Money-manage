"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Шинэ хэрэглэгчээр бүртгүүлэх
        </h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Имэйл"
          className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Нууц үг"
          className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30"
        />

        {error && (
          <p className="text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-slate-200 disabled:opacity-60"
        >
          {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
        </button>

        <p className="text-center text-sm text-slate-400">
          Бүртгэлтэй юу?{" "}
          <a href="/login" className="text-white underline">
            Нэвтрэх
          </a>
        </p>
      </div>
    </div>
  );
}
