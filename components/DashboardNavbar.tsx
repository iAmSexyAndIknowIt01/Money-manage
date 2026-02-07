"use client";

import { useRouter } from "next/navigation";

type Tab = "finance" | "investment";

export default function DashboardNavbar({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  const router = useRouter();

  function logout() {
    fetch("/api/logout", { method: "POST" }).finally(() => {
      router.push("/login");
    });
  }

  return (
    <div className="sticky top-4 z-50 px-6">
      <div
        className="
          max-w-4xl mx-auto
          bg-slate-900/90 backdrop-blur
          border border-white/10
          rounded-2xl
          shadow-lg
        "
      >
        <div className="h-16 px-6 flex items-center justify-between">
          {/* Left tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => onChange("finance")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition
                ${
                  active === "finance"
                    ? "bg-white text-slate-900 shadow"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
            >
              💸 Орлого / Зарлага
            </button>

            <button
              onClick={() => onChange("investment")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition
                ${
                  active === "investment"
                    ? "bg-white text-slate-900 shadow"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
            >
              📈 Хөрөнгө оруулалт
            </button>
          </div>

          {/* Right */}
          <button
            onClick={logout}
            className="
              px-3 py-2 rounded-xl
              text-sm text-red-400
              hover:bg-red-500/10 hover:text-red-300
              transition
            "
          >
            Гарах
          </button>
        </div>
      </div>
    </div>
  );
}
