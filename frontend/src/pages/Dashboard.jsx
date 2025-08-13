import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../services/api';
import { FaTrash, FaPen } from 'react-icons/fa';

const Dashboard = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/blogs', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const ownPosts = res.data.filter(
          (p) => p.author.id === res.data[0]?.author.id
        );
        setPosts(ownPosts);
      })
      .catch(console.error);
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    await axios.delete(`/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#111714] px-10 py-6">
      <h1 className="text-white text-3xl font-bold mb-6">Your Posts</h1>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full border border-[#3d5245] border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#1c2620] border-b border-[#3d5245]">
              <th className="px-4 py-3 text-left text-white text-sm font-medium border-r border-[#3d5245]">
                Title
              </th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium border-r border-[#3d5245]">
                Status
              </th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-t border-[#3d5245] hover:bg-[#1a221e] transition"
              >
                <td className="px-4 py-2 text-white text-sm border-r border-[#3d5245]">
                  <Link
                    to={`/post/${post.id}`}
                    className="text-[#38e07b] hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-2 text-sm border-r border-[#3d5245]">
                  <span className="inline-flex items-center justify-center rounded-lg h-8 px-4 bg-[#29382f] text-white text-sm font-medium">
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-2 flex items-center gap-4">
                  <Link
                    to={`/edit/${post.id}`}
                    className="text-[#38e07b] hover:text-[#2cc169] relative group"
                  >
                    <FaPen />
                    <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
                      Edit
                    </span>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="cursor-pointer text-red-500 hover:text-red-400 relative group"
                  >
                    <FaTrash />
                    <span className="cursor-pointer absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
                      Delete
                    </span>
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-white py-4">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
