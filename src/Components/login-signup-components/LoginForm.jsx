import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { signIn } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export function LoginForm() {

    const navigate = useNavigate();
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
      // Simulate API call
      const response = await signIn(JSON.stringify(formData));
      // const response = await signIn(formData);
      if (response?.success) {
        setIsLoading(false);  
        navigate("/home");
      }
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* <div className="space-y-2">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white"
            required
          />
        </div> */}

        <div className="flex flex-col justify-center gap-2">
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
              onChange={handleChange}
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
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* <div className="space-y-2">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div> */}

        <div className="flex items-center justify-between">
          <p
            // href="/forgot-password"
            className="text-sm text-white hover:underline"
          >
            Forgot password?
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          //   className="w-full bg-white text-blue-600 hover:bg-white/90"
          className="mt-auto w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}
