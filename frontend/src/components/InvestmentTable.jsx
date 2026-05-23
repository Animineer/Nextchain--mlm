import {
  TrendingUp,
  Wallet,
  Activity,
  ShieldCheck,
} from "lucide-react";

const InvestmentTable = ({ investments }) => {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
      <table className="w-full min-w-[700px] text-left">
        {/* Table Header */}
        <thead className="bg-slate-950/80 border-b border-slate-800">
          <tr>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <TrendingUp
                  size={16}
                  className="text-cyan-400"
                />
                Plan
              </div>
            </th>

            <th className="px-6 py-5 text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <Wallet
                  size={16}
                  className="text-emerald-400"
                />
                Amount
              </div>
            </th>

            <th className="px-6 py-5 text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <Activity
                  size={16}
                  className="text-indigo-400"
                />
                Daily ROI
              </div>
            </th>

            <th className="px-6 py-5 text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  className="text-purple-400"
                />
                Status
              </div>
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {investments?.length > 0 ? (
            investments.map((investment) => (
              <tr
                key={investment._id}
                className="
                  border-b
                  border-slate-800/70
                  hover:bg-slate-800/40
                  transition-all
                  duration-300
                "
              >
                {/* Plan */}
                <td className="px-6 py-5">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                    {investment.plan}
                  </div>
                </td>

                {/* Amount */}
                <td className="px-6 py-5 text-white font-semibold">
                  ₹{investment.amount}
                </td>

                {/* ROI */}
                <td className="px-6 py-5">
                  <span className="text-emerald-400 font-medium">
                    {investment.dailyROI}%
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <span
                    className={`
                      inline-flex
                      items-center
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      border
                      ${
                        investment.status ===
                        "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }
                    `}
                  >
                    {investment.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center py-12 text-slate-400"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center">
                    <TrendingUp
                      className="text-slate-500"
                      size={26}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      No Investments Found
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Start your first investment to
                      see analytics here.
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentTable;