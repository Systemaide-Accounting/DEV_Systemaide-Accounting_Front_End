import companyLogo from "../assets/company-logo.gif";
import { LoginForm } from "../Components/login-signup-components/LoginForm";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";

export function LoginSignUp() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      window.location.href = import.meta.env.VITE_SYSTEMAIDE_MAIN_URL + "#/home";
    }
  }, [user]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl flex flex-col md:flex-row w-full max-w-6xl overflow-hidden shadow-2xl">
        {/* Left Section - Branding */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-gradient-to-br from-blue-700 to-blue-900">
          <div className="text-center space-y-10">
            <div className="relative w-92 h-60 mx-auto bg-white rounded-xl p-2 flex items-center justify-center shadow-lg">
  <img src={companyLogo} alt="Systemaide Logo" className="max-w-[90%] max-h-[90%] object-contain" />
</div>
            <div className="space-y-6">
              <h1 className="text-4xl font-light text-white tracking-tight">
                Welcome to Systemaide
              </h1>
              <p className="text-blue-100 text-xl font-light max-w-md mx-auto">
                Your trusted solution for business needs
              </p>
            </div>
            <div className="hidden md:block space-y-8">
              <div className="flex items-center justify-center space-x-6">
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center backdrop-blur-sm hover:bg-blue-500/30 transition-all duration-300 hover:scale-105">
                  <svg className="w-7 h-7 text-white transition-transform duration-300 hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-white text-lg font-light">Secure & Reliable</h3>
                  <p className="text-blue-100 text-base font-light">Enterprise-grade security</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-6">
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center backdrop-blur-sm hover:bg-blue-500/30 transition-all duration-300 hover:scale-105">
                  <svg className="w-7 h-7 text-white transition-transform duration-300 hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-white text-lg font-light">Fast & Efficient</h3>
                  <p className="text-blue-100 text-base font-light">Optimized performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto space-y-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-light text-gray-900 tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-gray-600 text-lg font-light">
                Welcome back! Please enter your details
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
