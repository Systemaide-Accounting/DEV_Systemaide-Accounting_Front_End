import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import companyLogo from "../assets/company-logo.gif";
import { useNavigate } from "react-router-dom";

export function LoginSignUp() {

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const toggleForm = () => setIsLogin(!isLogin);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

     const navigate = useNavigate();

    function submitForm(e) {
      // this will be changed or removed when backend is implemented
      navigate("/home");
    }

  return (
    <>
      {/* <h1>Login</h1> */}
      <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
        <div className="rounded-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
          {/* Logo Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8 order-first md:order-last">
            <div className="text-center">
              <img src={companyLogo} alt="logo" />
              {/* <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl font-extrabold text-[#1974D0]">
                Your Company
              </h2> */}
              {/* <p className="mt-2 text-base md:text-lg text-blue-400">
                Sign in to your account or create a new one
              </p> */}
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-[#1974D0] rounded-lg drop-shadow-xl w-full md:w-1/2 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <form className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-white"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={submitForm}
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={toggleForm}
                className="text-sm text-white hover:text-blue-100"
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
