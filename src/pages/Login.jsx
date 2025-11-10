import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const ADMIN = {
    email: "admin@meegamart.com",
    password: "Admin@123",
  };

  const onSubmit = (data) => {
    if (data.email === ADMIN.email && data.password === ADMIN.password) {
      login(data.email, true);
      navigate("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exist = users.find((u) => u.email === data.email && u.password === data.password);
    if (!exist) {
      alert("Invalid email or password.");
      return;
    }

    login(data.email, false);
    navigate("/");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotModalOpen(true);
    setForgotStep(1);
    setForgotEmail("");
    setEnteredOtp("");
    setNewPassword("");
    setMessage("");
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === forgotEmail);
    if (user) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(generatedOtp);
      setForgotStep(2);
      setMessage(`OTP sent to your email (demo: ${generatedOtp})`);
    } else {
      setMessage("No account found with this email.");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp === otp) {
      setForgotStep(3);
      setMessage("OTP verified. Please enter a new password.");
    } else {
      setMessage("Invalid OTP. Try again.");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      setMessage("Please enter a new password.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => (u.email === forgotEmail ? { ...u, password: newPassword } : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setMessage("Password updated successfully.");
    setTimeout(() => setForgotModalOpen(false), 1500);
  };

  return (
    <section className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-[#0f3460] text-white p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome Back to Mega Mart</h1>
        <p className="text-lg text-gray-200 max-w-md">
          Log in to continue shopping your favorite products and unlock personalized deals made just for you.
        </p>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#0f3460]">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder=" "
                {...register("email", { required: "Please enter your email" })}
                className={`peer border rounded-lg w-full p-3 pt-5 pb-2 focus:outline-none focus:ring ${
                  errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#0f3460]/30"
                }`}
                id="email"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#0f3460]"
              >
                Email
              </label>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                {...register("password", { required: "Please enter your password" })}
                className={`peer border rounded-lg w-full p-3 pt-5 pb-2 pr-10 focus:outline-none focus:ring ${
                  errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#0f3460]/30"
                }`}
                id="password"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#0f3460]"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-3 flex items-center justify-center w-8 h-8 rounded"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.153-2.005.44-2.93M6.6 6.6A10.05 10.05 0 0112 5c5.523 0 10 4.477 10 10 0 1.02-.153 2.005-.44 2.93M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex justify-end">
              <span
                className="text-sm text-[#0f3460] cursor-pointer hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </span>
            </div>

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

      {forgotModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <h3 className="text-lg font-semibold mb-4 text-center text-[#0f3460]">Forgot Password</h3>

            {forgotStep === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="border rounded-lg w-full p-2 mb-4 focus:outline-none focus:ring focus:ring-[#0f3460]/30"
                />
                <button
                  onClick={handleSendOtp}
                  className="bg-[#0f3460] text-white py-2 px-4 rounded-lg w-full hover:bg-[#162a4d] transition mb-2"
                >
                  Send OTP
                </button>
              </>
            )}

            {forgotStep === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="border rounded-lg w-full p-2 mb-4 focus:outline-none focus:ring focus:ring-[#0f3460]/30"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="bg-[#0f3460] text-white py-2 px-4 rounded-lg w-full hover:bg-[#162a4d] transition mb-2"
                >
                  Verify OTP
                </button>
              </>
            )}

            {forgotStep === 3 && (
              <>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border rounded-lg w-full p-2 mb-4 focus:outline-none focus:ring focus:ring-[#0f3460]/30"
                />
                <button
                  onClick={handleResetPassword}
                  className="bg-[#0f3460] text-white py-2 px-4 rounded-lg w-full hover:bg-[#162a4d] transition mb-2"
                >
                  Reset Password
                </button>
              </>
            )}

            {message && <p className="text-sm text-center mt-2">{message}</p>}
            <button
              onClick={(e) => { e.preventDefault(); setForgotModalOpen(false); }}
              className="text-[#0f3460] font-semibold mt-4 w-full hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
