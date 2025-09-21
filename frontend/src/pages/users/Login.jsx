import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api"; // 🔥 backend API instance

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "", // 👈 email ke jagah username
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", user); // ✅ backend ko bheja
      alert(res.data.message || "Login successful!");
      navigate("/", { replace: true }); // ✅ homepage/dashboard pe redirect
    } catch (err) {
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg rounded-xl max-w-md mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Login to Govexam4u.com
      </h2>

      {/* Username */}
      <label className="block mb-2">Username</label>
      <input
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="border p-2 w-full rounded mb-4"
        required
      />

      {/* Password */}
      <label className="block mb-2">Password</label>
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="border p-2 w-full rounded mb-4"
        required
      />

      {/* Submit button */}
      <button
        type="submit"
        className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Login
      </button>

      {/* Don’t have account */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Signup
        </Link>
      </p>
    </form>
  );
}
