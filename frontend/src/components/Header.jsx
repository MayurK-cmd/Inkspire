import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#29382f] px-10 py-3 bg-[#111714]">
      {/* Logo */}
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          Blogify
        </h2>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link to="/home" className="text-white text-sm font-medium leading-normal">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/create" className="text-white text-sm font-medium leading-normal">
                New Post
              </Link>
              <Link to="/dashboard" className="text-white text-sm font-medium leading-normal">
                Dashboard
              </Link>
              <Link to="/profile" className="text-white text-sm font-medium leading-normal">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white text-sm font-medium leading-normal">
                Login
              </Link>
              <Link to="/signup" className="text-white text-sm font-medium leading-normal">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 items-center">
          {user && (
            <button
              onClick={logout}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#29382f] text-white text-sm font-bold tracking-[0.015em]"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
