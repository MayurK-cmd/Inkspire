import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from "lucide-react"; // 👈 for eye toggle

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111714] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      {/* Login Form */}
      <div className="flex flex-1 justify-center items-center py-5">
        <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5">
          <h2 className="text-white text-[28px] font-bold text-center pb-3">
            Welcome back
          </h2>

          {error && (
            <div className="text-red-500 text-center mb-2 px-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            {/* Email */}
            <div className="w-full flex flex-col items-center px-4 py-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="flex w-full max-w-[480px] rounded-lg text-white border-none bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base focus:outline-none"
              />
            </div>

            {/* Password with Eye Toggle */}
            <div className="w-full flex flex-col items-center px-4 py-3 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="flex w-full max-w-[480px] rounded-lg text-white border-none bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base focus:outline-none pr-10"
              />
              <button
                type="button"
                className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>

            <p className="text-[#9eb7a8] text-sm px-4 underline cursor-pointer text-center">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>

            {/* Login Button */}
            <div className="w-full flex flex-col items-center px-4 py-3">
              <button
                type="submit"
                className="flex w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#38e07b] text-[#111714] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Log in</span>
              </button>
            </div>
          </form>

          {/* Signup Link */}
          <p className="text-[#9eb7a8] text-sm text-center underline cursor-pointer">
            <Link to="/signup">Don't have an account? Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
