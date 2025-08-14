import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../services/api";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // you can also use heroicons

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password });

      navigate("/reset-success");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-[#111714]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#29382f] p-6 rounded-lg w-96"
      >
        <h2 className="text-white text-xl font-bold mb-4">Reset Password</h2>

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg p-3 bg-[#111714] text-white pr-10"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-400"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-[#38e07b] text-[#111714] py-2 rounded-lg font-bold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

