import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, Home } from 'lucide-react';

const Auth = () => {
  // This state controls whether we show the Login or Sign Up form
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#070B19] flex items-center justify-center p-6 relative overflow-hidden text-slate-200 font-sans selection:bg-teal-500/30">
      
      {/* Background Glowing Orbs to match the hero section */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Back to Home Button */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-6 md:left-12 flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors z-20 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-sm md:text-base">Back to Home</span>
      </button>

      {/* Main Glass Card */}
      <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10 transform transition-all duration-500 hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(45,212,191,0.1)] bg-[#0A1128]/60 backdrop-blur-xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400 to-teal-500 flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(45,212,191,0.4)]">
            <Home className="w-6 h-6 text-[#0A1128]" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join KosMate'}
          </h2>
          <p className="text-slate-400 text-sm text-center">
            {isLogin
              ? 'Enter your credentials to access your account.'
              : 'Create an account to unlock premium living spaces.'}
          </p>
        </div>

        {/* Input Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* Full Name field (Only visible when Signing Up) */}
          {!isLogin && (
            <div className="relative group">
              <User className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-teal-400 transition-colors" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-[#070B19]/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
              />
            </div>
          )}

          {/* Email field */}
          <div className="relative group">
            <Mail className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-teal-400 transition-colors" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-[#070B19]/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
            />
          </div>

          {/* Password field */}
          <div className="relative group">
            <Lock className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-teal-400 transition-colors" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-[#070B19]/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
            />
          </div>

          {/* Forgot Password Link (Only visible when Logging In) */}
          {isLogin && (
            <div className="flex justify-end pt-1">
              <a href="#" className="text-sm font-medium text-teal-400 hover:text-cyan-300 transition-colors">
                Forgot Password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-[#070B19] font-bold text-lg rounded-xl py-3.5 mt-4 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:scale-[1.02] transition-all duration-300">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Form Toggle Bottom Text */}
        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-slate-400 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-teal-400 font-bold hover:text-cyan-300 transition-colors ml-1 focus:outline-none"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Auth;