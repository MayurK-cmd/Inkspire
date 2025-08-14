import { Link } from "react-router-dom";

const CheckEmail = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-[#111714]">
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
        <p className="mb-4">We’ve sent you a password reset link. Please check your inbox.</p>
        <Link to="/login" className="text-[#38e07b] underline">Back to Login</Link>
      </div>
    </div>
  );
};

export default CheckEmail;
