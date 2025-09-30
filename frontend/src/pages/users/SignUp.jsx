// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api"; // 🔥 backend API instance

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await api.post("/signup", user); // ✅ backend ko bheja
      localStorage.setItem("token", res.data.token);    //(auto login) storing Tocken jo backend route seh aya hai. 
      alert(res.data.message || "Signup successful!");
      navigate("/", { replace: true }); // redirect
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg rounded-xl max-w-md mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Signup on Govexam4u.com
      </h2>

      {/* Username */}
      <label className="block mb-2">Username</label>
      <input
        type="text"
        value={user.username}
        maxLength={20}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="border p-2 w-full rounded mb-4"
        required
      />

      {/* Email */}
      <label className="block mb-2">Email</label>
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
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

      {/* Confirm Password */}
      <label className="block mb-2">Confirm Password</label>
      <input
        type="password"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        className="border p-2 w-full rounded mb-4"
        required
      />

      {/* Submit button */}
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>

      {/* Already have account */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
