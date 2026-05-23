import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Users,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import api from "../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: "",
  });

  const [loading, setLoading] = useState(false);

  /*
  Handle form change
  */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*
  Submit registration
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", formData);

      alert("Registration successful");

      navigate("login");
    } catch (error) {
      console.log(error);

      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <ShieldCheck
                className="text-cyan-400"
                size={32}
              />
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight">
              Create Account
            </h1>

            <p className="text-slate-400 mt-3 text-sm leading-relaxed">
              Join the investment platform and start
              growing your financial network.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
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

            {/* Referral Code */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Referral Code
              </label>

              <div className="relative">
                <Users
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <input
                  type="text"
                  name="referralCode"
                  placeholder="Enter referral code"
                  value={formData.referralCode}
                  onChange={handleChange}
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("login")}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;