import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/blogs") // ✅ directly fetch blogs (no auth required)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col bg-[#111714] overflow-x-hidden"
      style={{ fontFamily: "Inter, Noto Sans, sans-serif" }}
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
                  By {post.author?.firstname} {post.author?.lastname}
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

export default Home;
