import { Link } from "react-router-dom";

const ResetSuccess = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-[#111714]">
      <div className="bg-[#29382f] p-6 rounded-lg w-96 text-center">
        <h2 className="text-white text-2xl font-bold mb-4">
          Password Reset Successfully ✅
        </h2>
        <p className="text-gray-300 mb-6">
          You can now log in with your new password.
        </p>
        <Link
          to="/login"
          className="block bg-[#38e07b] text-[#111714] py-2 rounded-lg font-bold"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetSuccess;
