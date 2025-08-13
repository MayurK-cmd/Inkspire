import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        {/* Centered, fixed max width container */}
        <div className="w-full max-w-[480px]">
          <h2 className="text-white tracking-light text-[28px] font-bold leading-tight text-center pb-3 pt-5">
            Create your account
          </h2>

          {error && (
            <div className="text-red-500 text-center mb-2 px-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="mt-2">
            {/* First & Last Name in two columns on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-0 py-3">
              <label className="flex flex-col">
                <input
                  name="firstname"
                  placeholder="First name"
                  value={form.firstname}
                  onChange={handleChange}
                  required
                  className="form-input w-full overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base"
                />
              </label>
              <label className="flex flex-col">
                <input
                  name="lastname"
                  placeholder="Last name"
                  value={form.lastname}
                  onChange={handleChange}
                  required
                  className="form-input w-full overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base"
                />
              </label>
            </div>

            {/* Username */}
            <div className="px-0 py-3">
              <label className="flex flex-col">
                <input
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="form-input w-full overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base"
                />
              </label>
            </div>

            {/* Email */}
            <div className="px-0 py-3">
              <label className="flex flex-col">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input w-full overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base"
                />
              </label>
            </div>

            {/* Password */}
            <div className="px-0 py-3">
              <label className="flex flex-col">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="form-input w-full overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base"
                />
              </label>
            </div>

            {/* Sign Up Button — full width to match fields */}
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
