import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { ForgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await ForgotPassword(email);
      navigate("/check-email"); // redirect to confirmation page
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative flex min-h-screen bg-[#111714]">
      <div className="flex flex-1 justify-center items-center py-5">
        <div className="w-[512px] py-5">
          <h2 className="text-white text-[28px] font-bold text-center pb-3">
            Forgot Password
          </h2>
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <div className="w-full px-4 py-3">
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg text-white bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4"
              />
            </div>
            <div className=" w-full px-4 py-3">
              <button type="submit" className="cursor-pointer w-full bg-[#38e07b] text-[#111714] rounded-lg h-10 font-bold">
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
