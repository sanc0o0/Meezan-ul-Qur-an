"use client";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (loading) return;
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        window.location.href = "/admin";
      } else {
        setError("Invalid credentials. Access denied.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .login-form-wrap   { animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      {/*
        Use min-h-[calc(100vh-var(--navbar-h,72px))] so the section fills
        the remaining viewport below whatever height your navbar is.
        Adjust --navbar-h if your nav is taller/shorter.
      */}
      <div
        className="flex items-stretch overflow-hidden"
        style={{
          minHeight: "calc(100vh - 72px)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {/* ── Left panel — desktop only ── */}
        <div
          className="hidden lg:flex flex-col justify-between relative bg-primary-950 overflow-hidden p-12"
          style={{ width: "44%" }}
        >
          {/* cross-hatch texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          {/* radial glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(66,189,119,0.22) 0%, transparent 70%)",
            }}
          />

          {/* logo row */}
          <div className="relative z-10 flex items-center gap-3">
          
            <div>
              <p className="text-white font-bold text-lg leading-tight">
                Maktab
              <span className="text-primary-400 text-lg"> Meezan-ul-Qur&apos;an</span>
              </p>
            </div>
          </div>

          {/* headline */}
          <div className="relative z-10">
            <p
              className="font-italiana text-primary-500 leading-none mb-5 select-none"
              style={{ fontSize: 52 }}
            >
              ﷽
            </p>
            <h2
              className="text-white font-black leading-tight mb-4"
              style={{ fontSize: 32, letterSpacing: "-0.03em" }}
            >
              Manage.
              <br />
              Track.
              <br />
              <span className="text-primary-400">Give.</span>
            </h2>
            <p
              className="text-primary-300 text-sm leading-relaxed"
              style={{ maxWidth: 280 }}
            >
              Every rupee tracked here is a seed of sadaqah jariyah — earning
              reward long after it&apos;s given.
            </p>
          </div>

          {/* stats */}
          <div className="relative z-10 flex gap-8">
            {[
              ["150+", "Students"],
              ["10+", "Donors"],
              ["3+", "Years"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-white font-black text-xl leading-none">
                  {v}
                </p>
                <p className="text-primary-400 text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="flex-1 flex flex-col items-center justify-center bg-background-50 px-6 py-10 relative">
          {/* subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.025,
              backgroundImage:
                "linear-gradient(var(--color-primary-900) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary-900) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div
            className="login-form-wrap relative w-full"
            style={{ maxWidth: 360 }}
          >
            {/* mobile logo */}
            <div className="lg:hidden text-center mb-7">
              <Image
                src="/logo.png"
                width={64}
                height={64}
                alt="logo"
                className="mx-auto mb-3"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}
              />
              <h1 className="text-primary-900 font-black text-lg">
                Maktab Meezan-ul-Qur&apos;an
              </h1>
              <p className="text-text-600 text-xs mt-1">Admin Dashboard</p>
            </div>

            {/* card */}
            <div
              className="bg-white rounded-2xl overflow-hidden border border-background-200"
              style={{
                boxShadow:
                  "0 8px 32px rgba(13,38,24,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {/* card header */}
              <div className="bg-primary-900 px-6 py-5 items-center justify-between">
                <div className="flex flex-col justify-center align-middle items-center">
                  <p className="text-white font-bold text-base">
                    Admin Sign In
                  </p>
                  <p className="text-primary-300 text-xs mt-0.5">
                    Restricted access
                  </p>
                </div>
              </div>

              <div className="px-6 py-6 space-y-4">
                {/* username */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-text-700 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    autoComplete="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full px-4 py-3 rounded-xl border border-background-200 bg-background-50 text-text-900 text-sm placeholder-text-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
                  />
                </div>

                {/* password */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-text-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      autoComplete="current-password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="w-full px-4 py-3  rounded-xl border border-background-200 bg-background-50 text-text-900 text-sm placeholder-text-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* error */}
                {error && (
                  <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <span className="text-red-500 text-sm mt-0.5 shrink-0">
                      ⚠
                    </span>
                    <p className="text-red-600 text-xs font-semibold leading-snug">
                      {error}
                    </p>
                  </div>
                )}

                {/* submit */}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-primary-800 hover:bg-primary-700 active:scale-[0.98] text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    border: "none",
                    boxShadow: "0 4px 16px rgba(13,38,24,0.25)",
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff",
                          display: "inline-block",
                          animation: "spin 0.65s linear infinite",
                        }}
                      />
                      Signing in…
                    </>
                  ) : (
                    "Sign In →"
                  )}
                </button>
              </div>

              {/* card footer */}
              <div className="bg-background-50 border-t border-background-200 px-6 py-3">
                <p className="text-[11px] text-text-500 text-center">
                  Authorized personnel only · Session expires in 8h
                </p>
              </div>
            </div>

            <p className="text-center text-[11px] text-text-500 mt-4">
              Maktab Meezan-ul-Qur&apos;an · Admin Panel
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
