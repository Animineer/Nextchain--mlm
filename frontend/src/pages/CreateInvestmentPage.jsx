import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Wallet,
  Layers3,
  Percent,
  CalendarDays,
  TrendingUp,
  Loader2,
} from "lucide-react";

import api from "../services/api";

const CreateInvestmentPage = () => {
  const navigate = useNavigate();

  /*
  Investment form state
  */
  const [formData, setFormData] = useState({
    amount: "",
    plan: "BASIC",
    durationInDays: "",
  });

  /*
  Loading state
  */
  const [loading, setLoading] = useState(false);

  /*
  Handle input changes
  */
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /*
  Submit investment
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      /*
      Create investment API call     /create
      */
      await api.post(
        "/investments",
        formData
      );

      alert("Investment created successfully");

      /*
      Redirect to dashboard
      */
      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Investment creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-xl">
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <TrendingUp
                className="text-cyan-400"
                size={32}
              />
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight">
              Create Investment
            </h1>

            <p className="text-slate-400 mt-3 text-sm leading-relaxed">
              Start a new investment plan and grow your
              portfolio with automated ROI tracking.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Investment Amount
              </label>

              <div className="relative">
                <Wallet
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Enter investment amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    bg-slate-950/80
                    border
                    border-slate-800
                    rounded-2xl
                    py-3
                    pl-12
                    pr-4
                    text-white
                    placeholder:text-slate-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-500
                    focus:border-cyan-500
                    transition-all
                    duration-300
                  "
                />
              </div>
            </div>

            {/* Plan */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Investment Plan
              </label>

              <div className="relative">
                <Layers3
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10"
                  size={18}
                />

                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="
                    w-full
                    appearance-none
                    bg-slate-950/80
                    border
                    border-slate-800
                    rounded-2xl
                    py-3
                    pl-12
                    pr-4
                    text-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-500
                    focus:border-cyan-500
                    transition-all
                    duration-300
                  "
                >
                  <option value="BASIC">
                    BASIC
                  </option>

                  <option value="STANDARD">
                    STANDARD
                  </option>

                  <option value="PREMIUM">
                    PREMIUM
                  </option>
                </select>
              </div>
            </div>

            
              
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration (Days)
              </label>

              <div className="relative">
                <CalendarDays
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <input
                  type="number"
                  name="durationInDays"
                  placeholder="Example: 30"
                  value={formData.durationInDays}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    bg-slate-950/80
                    border
                    border-slate-800
                    rounded-2xl
                    py-3
                    pl-12
                    pr-4
                    text-white
                    placeholder:text-slate-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-500
                    focus:border-cyan-500
                    transition-all
                    duration-300
                  "
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-cyan-500
                hover:bg-cyan-400
                text-slate-950
                font-semibold
                py-3
                rounded-2xl
                transition-all
                duration-300
                shadow-lg
                shadow-cyan-500/20
                flex
                items-center
                justify-center
                gap-2
                disabled:opacity-70
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  Creating Investment...
                </>
              ) : (
                "Create Investment"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              Investments are securely managed with
              automated ROI calculations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvestmentPage;