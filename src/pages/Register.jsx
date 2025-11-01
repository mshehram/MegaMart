import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(form.password)) {
      setError(
        "Password must be at least 8 characters, contain one uppercase letter and one special character."
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exist = users.find((u) => u.email === form.email);
    if (exist) {
      setError("Email already exists. Try logging in.");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <section className="flex flex-col md:flex-row h-screen">
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#0f3460] text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to Meeega Mart</h1>
        <p className="text-lg text-gray-200 text-center max-w-md">
          Discover premium products at the best prices — all in one place.  
          Sign up now and start shopping smarter!
        </p>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#0f3460]">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded focus:ring focus:ring-[#0f3460]/30"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded focus:ring focus:ring-[#0f3460]/30"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded focus:ring focus:ring-[#0f3460]/30"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#0f3460] text-white p-3 rounded-lg hover:bg-[#162a4d] transition"
            >
              Create Account
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#0f3460] font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
