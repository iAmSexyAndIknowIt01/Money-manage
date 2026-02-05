import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* NAV */}
      <header className="flex items-center justify-between px-5 py-4 max-w-6xl mx-auto">
        <h1 className="text-lg font-semibold tracking-tight">
          Finance
        </h1>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm text-slate-400 hover:text-white"
          >
            Нэвтрэх
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium hover:bg-slate-200"
          >
            Эхлэх
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="px-5 pt-16 pb-20 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          Мөнгө хаашаа<br />
          урсаж байгааг<br />
          ойлго
        </h2>

        <p className="mt-5 text-slate-400 text-base md:text-lg">
          Сарын орлого, зарлагаа бодитоор хар.
          Илүүдэл зардлаа олж, шийдвэрээ
          дата дээр тулгуурлан гарга.
        </p>

        <Link href="/register">
          <button className="mt-8 w-full md:w-auto px-8 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-slate-200 transition">
            Ашиглаж эхлэх
          </button>
        </Link>
      </section>

      {/* DATA PREVIEW */}
      <section className="px-5 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Орлого"
            value="+3,200,000₮"
            color="text-emerald-400"
          />
          <StatCard
            title="Зарлага"
            value="-1,850,000₮"
            color="text-rose-400"
          />
          <StatCard
            title="Үлдэгдэл"
            value="1,350,000₮"
            color="text-indigo-400"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-white/10 py-20 px-5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <Feature
            title="📆 Сарын хяналт"
            desc="Сар бүрийн санхүүг тусад нь харна"
          />
          <Feature
            title="✏️ Шууд засварлах"
            desc="Гүйлгээг хүссэн үедээ edit / delete"
          />
          <Feature
            title="📊 Цэвэр дата"
            desc="Нэмэлт дуу чимээгүй, зөвхөн хэрэгтэй зүйл"
          />
          <Feature
            title="📱 Гар утсанд төгс"
            desc="Mobile-first дизайн"
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center px-5">
        <p className="text-slate-400 mb-4">
          Санхүүгээ удирдах нь амархан байх ёстой
        </p>

        <Link href="/register">
          <button className="px-10 py-4 rounded-2xl bg-white text-black font-semibold hover:bg-slate-200">
            Одоо эхлэх
          </button>
        </Link>
      </section>

      <footer className="text-center text-xs text-slate-500 pb-6">
        © 2026 Finance Tracker
      </footer>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className={`text-2xl font-semibold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  );
}

function Feature({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div>
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}
