
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api"; // Axios instance

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", user);
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
        alert(res.data.message || "Login successful!");
        navigate("/", { replace: true });
      } else {
        alert("Login failed: No token received");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 md:p-10 shadow-xl rounded-2xl w-full max-w-sm"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block mb-2 font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            autoComplete="off"
            className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition pr-10"
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition transform hover:scale-105 shadow-md"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 hover:underline font-medium"
          >
            Signup
          </Link>
        </p>
      </form>
    </section>
  );
}
