import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Wallet,
  TrendingUp,
  Loader2,
  X,
  Check,
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
  Handle plan selection
  */
  const handlePlanSelect = (plan) => {
    setFormData({
      ...formData,
      plan,
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
      Only sending amount and plan
      */
      await api.post("/investments", {
        amount: formData.amount,
        plan: formData.plan,
      });

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
        <div className="relative bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8">
          {/* Close Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="
              absolute
              top-5
              right-5
              h-10
              w-10
              rounded-xl
              border
              border-slate-700
              bg-slate-900/80
              flex
              items-center
              justify-center
              text-slate-400
              hover:text-white
              hover:border-cyan-400
              hover:bg-slate-800
              transition-all
              duration-300
            "
          >
            <X size={18} />
          </button>

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
              Start a new investment plan and grow
              your portfolio with automated ROI
              tracking.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Amount */}
<div>
  <label className="block text-sm font-medium text-slate-300 mb-3">
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
      min="0"
      onWheel={(e) => e.target.blur()}
      onChange={(e) => {
        const value = e.target.value;

        /*
        Prevent negative values
        */
        if (Number(value) >= 0 || value === "") {
          handleChange(e);
        }
      }}
      required
      className="
        w-full
        bg-slate-950/80
        border
        border-slate-800
        rounded-2xl
        py-4
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

        [appearance:textfield]
        [&::-webkit-outer-spin-button]:appearance-none
        [&::-webkit-inner-spin-button]:appearance-none
      "
    />
  </div>
</div>

            {/* Plan Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                Investment Plan
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    label: "BASIC",
                    description:
                      "Starter plan for beginners",
                  },

                  {
                    label: "MEDIUM",
                    description:
                      "Balanced growth investment",
                  },

                  {
                    label: "PREMIUM",
                    description:
                      "Advanced premium ROI plan",
                  },
                ].map((plan) => (
                  <button
                    key={plan.label}
                    type="button"
                    onClick={() =>
                      handlePlanSelect(
                        plan.label
                      )
                    }
                    className={`
                      relative
                      rounded-2xl
                      border
                      px-5
                      py-5
                      text-left
                      transition-all
                      duration-300
                      backdrop-blur-sm
                      shadow-lg

                      ${
                        formData.plan ===
                        plan.label
                          ? "bg-cyan-500/10 border-cyan-400 shadow-cyan-500/20 scale-[1.02]"
                          : "bg-slate-950/70 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {plan.label}
                      </h3>

                      {formData.plan ===
                        plan.label && (
                        <div className="h-6 w-6 rounded-full bg-cyan-500 flex items-center justify-center">
                          <Check
                            size={14}
                            className="text-slate-950"
                          />
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed">
                      {plan.description}
                    </p>
                  </button>
                ))}
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
                py-4
                rounded-2xl
                transition-all
                duration-300
                shadow-lg
                shadow-cyan-500/20
                flex
                items-center
                justify-center
                gap-2
                hover:shadow-cyan-500/40
                hover:scale-[1.01]
                active:scale-[0.99]
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