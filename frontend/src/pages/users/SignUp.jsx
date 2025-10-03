
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api"; // backend API instance
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await api.post("/signup", user);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // auto-login
      }
      alert(res.data.message || "Signup successful!");
      navigate("/", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6  shadow-xl rounded-2xl w-full max-w-sm"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Sign up
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={user.username}
            maxLength={20}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block mb-2 font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition pr-10"
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <label className="block mb-2 font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition pr-10"
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition transform hover:scale-105 shadow-md"
        >
          Sign Up
        </button>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
