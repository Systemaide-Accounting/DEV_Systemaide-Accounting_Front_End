import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/company-logo.gif";
import { LoginForm } from "../Components/login-signup-components/LoginForm";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";

export function LoginSignUp() {

  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden shadow-2xl">
        {/* Logo Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gradient-to-br from-blue-50 to-white">
          <div className="text-center space-y-6">
            <div className="relative w-48 h-48 mx-auto">
              <img src={companyLogo} alt="logo" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome to Systemaide
              </h1>
              {/* <p className="text-gray-500">
                Your trusted solution for business needs
              </p> */}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col w-full md:w-1/2 p-6 md:p-12">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-white">
                {/* {isLogin ? "Welcome Back" : "Create Account"} */}
                {"Let's Get Started"}
              </h2>
              {/* <p className="text-blue-100">
                {isLogin
                  ? "Sign in to continue to your account"
                  : "Sign up to get started with your account"}
              </p> */}
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
