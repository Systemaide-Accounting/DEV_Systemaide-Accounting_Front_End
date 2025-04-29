import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { signIn } from "../../services/authService";
import swal2 from "sweetalert2";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    const response = await signIn(JSON.stringify(formData));
    if (response?.success) {
      setIsLoading(false);  
      window.location.href = import.meta.env.VITE_SYSTEMAIDE_MAIN_URL;
    } else {
      setIsLoading(false);
      swal2.fire({
        icon: "error",
        title: "Sign In Failed",
        text: "Your email or password is incorrect.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#3b82f6",
        background: "#ffffff",
        color: "#1f2937",
        titleColor: "#1f2937",
        textColor: "#4b5563",
        iconColor: "#ef4444",
        showClass: {
          popup: 'animate__animated animate__fadeInDown animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp animate__faster'
        },
        customClass: {
          popup: 'rounded-xl shadow-lg',
          title: 'text-xl font-light',
          text: 'text-sm font-light',
          confirmButton: 'rounded-lg px-6 py-2.5 text-sm font-light shadow-sm',
          icon: 'border-2'
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-inter">
      <div className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-light text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="block w-full px-4 py-3 rounded-lg bg-blue-50/80 border-0 font-light text-gray-700 font-inter placeholder:text-gray-500"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-light text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="block w-full px-4 py-3 rounded-lg bg-blue-50/80 border-0 font-light text-gray-700 font-inter placeholder:text-gray-500"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-500 transition-colors"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-light">
              Remember me
            </label>
          </div>
          <a
            href="#"
            className="text-sm font-light text-blue-600 hover:text-blue-500 transition-colors"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-light text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </div>
          ) : (
            "Sign in"
          )}
        </button>
      </div>
    </form>
  );
}
