import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../services/api";

const Landing = () => {
  const { currentUser } = useAuth(); // assuming AuthContext provides currentUser
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/api/blogs?published=true")
        .then((res) => setPosts(res.data))
        .catch(console.error);
    }
  }, [currentUser]);

  if (!currentUser) {
    // Simple about page if not logged in
    return (
      <div
        className="flex min-h-screen items-center justify-center flex-col bg-[#111714] text-center px-6"
        style={{ fontFamily: 'Inter, Noto Sans, sans-serif' }}
      >
        <h1 className="text-white text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-[#9eb7a8] max-w-lg mb-6">
          Discover amazing articles, insights, and stories from our community.
          Sign up or log in to start reading and sharing your own posts.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer rounded-lg px-6 py-3 bg-[#38e07b] text-[#111714] font-bold"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="cursor-pointer rounded-lg px-6 py-3 border border-[#38e07b] text-[#38e07b] font-bold"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-[#111714] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, Noto Sans, sans-serif' }}
    >
      <div className="flex-1 flex flex-col px-40 py-10">
        <h1 className="text-white text-[28px] font-bold mb-6">Recent Posts</h1>

        <div className="space-y-6 max-w-[800px]">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border border-[#29382f] bg-[#1a221e] p-5 hover:border-[#38e07b] transition"
              >
                <Link
                  to={`/post/${post.id}`}
                  className="block text-xl font-semibold text-[#38e07b] hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-[#9eb7a8] mt-1">
                  By {post.author.firstname} {post.author.lastname}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[#9eb7a8]">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
