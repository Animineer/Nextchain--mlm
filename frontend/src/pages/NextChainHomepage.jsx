import React from "react";

import {
  ShieldCheck,
  BarChart3,
  LineChart,
  Wallet,
  Users,
  ArrowRight,
  TrendingUp,
  Layers3,
  Activity,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [showProfile, setShowProfile] =
    React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 backdrop-blur-xl bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <TrendingUp
              className="text-cyan-400"
              size={24}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              NextChain
            </h1>

            <p className="text-xs text-slate-400">
              Investment Intelligence Platform
            </p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="hover:text-cyan-400 transition-colors"
          >
            Features
          </button>

          <button
            onClick={() =>
              document
                .getElementById("analytics")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="hover:text-cyan-400 transition-colors"
          >
            Analytics
          </button>

          <button
            onClick={() =>
              document
                .getElementById("security")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="hover:text-cyan-400 transition-colors"
          >
            Security
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() =>
                  setShowProfile(!showProfile)
                }
                className="h-11 w-11 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:border-cyan-400 transition-all duration-300"
              >
                {user?.user?.name?.charAt(0)?.toUpperCase()}
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg">
                      {user?.user?.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>
                      <h4 className="font-semibold text-white">
                        {user?.user?.name}
                      </h4>

                      <p className="text-sm text-slate-400">
                        {user?.user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      localStorage.removeItem(
                        "userInfo"
                      );

                      navigate("/login");
                    }}
                    className="w-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 py-3 rounded-xl transition-all duration-300 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-cyan-400 text-sm font-medium transition-all duration-300 hover:bg-slate-900 text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default function NextChainHomepage() {
  const navigate = useNavigate();

  const [showScroll, setShowScroll] =
    React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 500);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);
  const features = [
    {
      title: "Smart Investments",
      description:
        "Track investments, ROI performance, and wallet growth in real time.",
      icon: Wallet,
    },
    {
      title: "Referral Ecosystem",
      description:
        "Scale your network with structured referral analytics and hierarchy tracking.",
      icon: Users,
    },
    {
      title: "Enterprise Security",
      description:
        "Protected financial operations with secure authentication and encrypted systems.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-sm font-medium mb-8">
              <Activity size={16} />
              Next Generation Investment Platform
            </div>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
              Scale Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Financial Growth
              </span>
              With NextChain
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mt-8 max-w-2xl">
              Advanced investment analytics, referral intelligence, secure transactions, and automated ROI systems built for modern investors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={() => {
                  const user = localStorage.getItem(
                    "userInfo"
                  );

                  if (user) {
                    navigate("/dashboard");
                  } else {
                    navigate("/login");
                  }
                }}
                className="group relative overflow-hidden bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 w-fit"
              >
                Go To Dashboard
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full" />

            <div className="relative bg-slate-900/70 border border-slate-800 rounded-[32px] p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-slate-400 text-sm">
                    Portfolio Overview
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    ₹8,45,000
                  </h2>
                </div>

                <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <BarChart3
                    className="text-cyan-400"
                    size={30}
                  />
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 mb-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-slate-400 text-sm">
                      Monthly ROI
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-emerald-400">
                      +18.4%
                    </h3>
                  </div>

                  <LineChart
                    className="text-emerald-400"
                    size={40}
                  />
                </div>

                <div className="h-28 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/10 flex items-end gap-2 p-4">
                  {[40, 60, 50, 90, 70, 120, 100].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-xl bg-cyan-400/70"
                      style={{ height }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5">
                  <p className="text-slate-400 text-sm">
                    Referral Growth
                  </p>

                  <h4 className="text-2xl font-bold mt-3 text-purple-400">
                    +240
                  </h4>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5">
                  <p className="text-slate-400 text-sm">
                    Wallet Balance
                  </p>

                  <h4 className="text-2xl font-bold mt-3 text-cyan-400">
                    ₹95K
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-28"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-sm font-medium mb-6">
            <Layers3 size={16} />
            Platform Features
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Powerful Investment Infrastructure
          </h2>

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
            Built for investors who need modern analytics, scalable systems, and enterprise-grade performance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group bg-slate-900/70 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                  <Icon
                    className="text-cyan-400"
                    size={28}
                  />
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Analytics Section */}
      <section
        id="analytics"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-28"
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-sm font-medium mb-6">
              <BarChart3 size={16} />
              Real Time Analytics
            </div>

            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Advanced ROI & Investment Insights
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Monitor investments, referral performance, wallet balances, and ROI trends with enterprise-grade visualization systems.
            </p>

            <div className="space-y-5">
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
                <h4 className="font-semibold text-lg mb-2">
                  Live ROI Tracking
                </h4>

                <p className="text-slate-400 text-sm">
                  Automated investment performance monitoring with real-time updates.
                </p>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
                <h4 className="font-semibold text-lg mb-2">
                  Referral Growth Analytics
                </h4>

                <p className="text-slate-400 text-sm">
                  Understand network expansion and organizational growth visually.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-[32px] p-8 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-slate-400 text-sm">
                  Weekly Performance
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  +32.8%
                </h3>
              </div>

              <TrendingUp
                className="text-cyan-400"
                size={40}
              />
            </div>

            <div className="flex items-end gap-4 h-64">
              {[120, 180, 140, 220, 170, 260, 240].map(
                (height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-3xl bg-gradient-to-t from-cyan-500 to-blue-500"
                    style={{ height }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section
        id="security"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-28"
      >
        <div className="rounded-[40px] border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-10 lg:p-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <ShieldCheck size={16} />
              Enterprise Security
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
              Built With Secure Financial Infrastructure
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              NextChain provides protected authentication, encrypted investment operations, and secure financial workflows for scalable investment ecosystems.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
                <ShieldCheck
                  className="text-cyan-400 mb-4"
                  size={28}
                />

                <h4 className="font-semibold text-lg mb-2">
                  Secure Access
                </h4>

                <p className="text-slate-400 text-sm">
                  Protected authentication systems and route security.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
                <Wallet
                  className="text-cyan-400 mb-4"
                  size={28}
                />

                <h4 className="font-semibold text-lg mb-2">
                  Protected Wallets
                </h4>

                <p className="text-slate-400 text-sm">
                  Secure investment transactions and wallet management.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
                <Activity
                  className="text-cyan-400 mb-4"
                  size={28}
                />

                <h4 className="font-semibold text-lg mb-2">
                  Live Monitoring
                </h4>

                <p className="text-slate-400 text-sm">
                  Continuous analytics and operational monitoring systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll To Top */}
      {showScroll && (
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-8 right-8 z-50 h-14 w-14 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-2xl shadow-cyan-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <ArrowRight
            size={22}
            className="rotate-[-90deg]"
          />
        </button>
      )}
    </div>
  );
}
