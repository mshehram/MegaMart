import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Both fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exist = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!exist) {
      setError("Invalid email or password.");
      return;
    }

    login(form.email);
    navigate("/");
  };

  return (
    <section className="flex flex-col md:flex-row h-screen">
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#0f3460] text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back to Meeega Mart</h1>
        <p className="text-lg text-gray-200 text-center max-w-md">
          Log in to continue shopping the latest deals and exclusive offers  
          specially curated for you.
        </p>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#0f3460]">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:ring focus:ring-[#0f3460]/30"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:ring focus:ring-[#0f3460]/30"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              type="submit"
              className="bg-[#0f3460] text-white py-2 px-4 rounded-lg w-full hover:bg-[#162a4d] transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <span
              className="text-[#0f3460] font-semibold cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
       <div></div>
    </section>
   
  );
};

export default Login;
