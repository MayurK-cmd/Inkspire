import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111714] overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Title */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
              Profile
            </p>
          </div>

          {/* Profile Info */}
          <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3d5245] py-5">
              <p className="text-[#9eb7a8] text-sm">First name</p>
              <p className="text-white text-sm">{user.firstname}</p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3d5245] py-5">
              <p className="text-[#9eb7a8] text-sm">Last name</p>
              <p className="text-white text-sm">{user.lastname}</p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3d5245] py-5">
              <p className="text-[#9eb7a8] text-sm">Username</p>
              <p className="text-white text-sm">{user.username}</p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3d5245] py-5">
              <p className="text-[#9eb7a8] text-sm">Email</p>
              <p className="text-white text-sm">{user.email}</p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3d5245] py-5">
              <p className="text-[#9eb7a8] text-sm">Joined</p>
              <p className="text-white text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
