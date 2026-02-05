export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Шинэ хэрэглэгчээр бүртгүүлэх
        </h1>

        <input
          placeholder="Имэйл"
          className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30"
        />

        <input
          type="password"
          placeholder="Нууц үг"
          className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30"
        />

        <button className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-slate-200">
          Бүртгүүлэх
        </button>

        <p className="text-center text-sm text-slate-400">
          Бүртгэлгүй юу?{" "}
          <a href="/login" className="text-white underline">
            Нэвтрэх
          </a>
        </p>
      </div>
    </div>
  );
}
