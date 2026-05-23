import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Activity,
  Users,
  TrendingUp,
  User,
  LogOut,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

import api from "../services/api";

import DashboardCards from "../components/DashboardCards";
import InvestmentTable from "../components/InvestmentTable";
import ROIChart from "../components/ROIChart";
import ReferralTree from "../components/ReferralTree";

const DashboardPage = () => {
  /*
  Dashboard state
  */
  const [dashboard, setDashboard] = useState(null);

  /*
  Referral tree state
  */
  const [tree, setTree] = useState([]);

  /*
  Loading state
  */
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  /*
  Fetch dashboard data
  */
  const fetchDashboard = async () => {
    try {
      const dashboardRes = await api.get(
        "/investments/dashboard"
      );

      const treeRes = await api.get(
        "/investments/referral-tree"
      );

      setDashboard(dashboardRes.data);

      setTree(treeRes.data.tree);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  /*
  Loading UI
  */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="h-14 w-14 rounded-full border-4 border-slate-700 border-t-cyan-400 animate-spin"></div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">
              Loading Dashboard
            </h2>

            <p className="text-slate-400 text-sm mt-2">
              Fetching investment analytics...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-sm font-medium mb-5">
              <LayoutDashboard size={16} />
              Investor Analytics Portal
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              User Dashboard
            </h1>

            <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">
              Monitor investments, track ROI
              performance, and analyze referral
              growth with enterprise analytics.
            </p>
          </div>

          {/* Top Stats */}
          <div className="flex flex-col items-end gap-4">
            {/* Profile button aligned to top-right */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:opacity-90"
                title="Profile"
              >
                {user?.user?.name ? (
                  <span className="font-semibold">
                    {user.user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User size={16} />
                )}
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-lg p-3 shadow-lg z-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <User className="text-cyan-400" size={18} />
                    </div>

                    <div>
                      <div className="font-medium">
                        {user?.user?.name || "User"}
                      </div>
                      <div className="text-sm text-slate-400">
                        {user?.user?.email}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        localStorage.removeItem("userInfo");
                        setUser(null);
                        navigate("/");
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-800/60"
                    >
                      <LogOut size={16} />

                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-4 shadow-xl backdrop-blur-sm min-w-[180px]">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Activity size={18} />

                <span className="text-sm font-medium">
                  Total ROI
                </span>
              </div>

              <h3 className="text-2xl font-bold">
                ₹{dashboard.totalROI}
              </h3>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-4 shadow-xl backdrop-blur-sm min-w-[180px]">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <TrendingUp size={18} />

                <span className="text-sm font-medium">
                  Investment
                </span>
              </div>

              <h3 className="text-2xl font-bold">
                ₹{dashboard.totalInvestment}
              </h3>
            </div>
            </div>

            
          </div>
        </div>

        {/* Create Investment Button */}
        <div className="flex justify-end mb-8">
          <Link to="/create-investment">
            <button
              className="
                group
                relative
                overflow-hidden
                bg-cyan-500
                hover:bg-cyan-400
                text-slate-950
                font-semibold
                px-6
                py-3
                rounded-2xl
                transition-all
                duration-300
                shadow-lg
                shadow-cyan-500/20
                hover:shadow-cyan-500/40
                hover:scale-[1.02]
                active:scale-[0.98]
                flex
                items-center
                gap-2
              "
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

              <TrendingUp size={18} />

              <span className="relative z-10">
                Create Investment
              </span>
            </button>
          </Link>
        </div>

        {/* Dashboard Cards */}
        <section className="mb-10">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <LayoutDashboard
                  className="text-cyan-400"
                  size={20}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Financial Overview
                </h2>

                <p className="text-slate-400 text-sm">
                  High-level investment and earnings
                  summary.
                </p>
              </div>
            </div>

            <DashboardCards
              walletBalance={dashboard.walletBalance}
              totalInvestment={dashboard.totalInvestment}
              totalROI={dashboard.totalROI}
              totalLevelIncome={
                dashboard.totalLevelIncome
              }
            />
          </div>
        </section>

        {/* Investment Table */}
        <section className="mb-10">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <TrendingUp
                  className="text-indigo-400"
                  size={20}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Investment Portfolio
                </h2>

                <p className="text-slate-400 text-sm">
                  Detailed investment records and
                  portfolio allocations.
                </p>
              </div>
            </div>

            <InvestmentTable
              investments={dashboard.investments}
            />
          </div>
        </section>

        {/* ROI Chart */}
        <section className="mb-10">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Activity
                  className="text-emerald-400"
                  size={20}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  ROI Performance Analytics
                </h2>

                <p className="text-slate-400 text-sm">
                  Visual performance tracking for
                  recent ROI activity.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
              <ROIChart
                data={
                  dashboard.recentROI?.map(
                    (item) => ({
                      date: new Date(
                        item.roiDate
                      ).toLocaleDateString(),

                      amount: item.amount,
                    })
                  ) || []
                }
              />
            </div>
          </div>
        </section>

        {/* Referral Tree */}
        <section>
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Users
                  className="text-purple-400"
                  size={20}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Referral Network
                </h2>

                <p className="text-slate-400 text-sm">
                  Organizational referral hierarchy
                  and network expansion.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4 overflow-x-auto">
              <ReferralTree tree={tree} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;