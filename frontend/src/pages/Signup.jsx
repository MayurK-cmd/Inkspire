import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // 👈 for eye toggle

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111714] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[480px]">
          <h2 className="text-white tracking-light text-[28px] font-bold leading-tight text-center pb-3 pt-5">
            Create your account
          </h2>

          {error && (
            <div className="text-red-500 text-center mb-2 px-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="mt-2">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-0 py-3">
              <input
                name="firstname"
                placeholder="First name"
                value={form.firstname}
                onChange={handleChange}
                required
                className="w-full rounded-lg text-white bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base focus:outline-none"
              />
              <input
                name="lastname"
                placeholder="Last name"
                value={form.lastname}
                onChange={handleChange}
                required
                className="w-full rounded-lg text-white bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base focus:outline-none"
              />
            </div>

            {/* Username */}
            <div className="px-0 py-3">
              <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full rounded-lg text-white bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="px-0 py-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg text-white bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base focus:outline-none"
              />
            </div>

            {/* Password with Eye Toggle */}
            <div className="px-0 py-3 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg text-white bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base pr-10 focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>

            {/* Sign Up Button */}
            <div className="px-0 py-3">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg h-12 px-4 bg-[#38e07b] text-[#111714] text-sm font-bold tracking-[0.015em]"
              >
                <span className="truncate">Sign up</span>
              </button>
            </div>
          </form>

          {/* Terms */}
          <p className="text-[#9eb7a8] text-sm font-normal leading-normal pb-3 pt-1 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
