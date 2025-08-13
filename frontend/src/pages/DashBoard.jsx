import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../services/api';

const Dashboard = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/blogs', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      const ownPosts = res.data.filter(p => p.author.id === res.data[0]?.author.id);
      setPosts(ownPosts);
    }).catch(console.error);
  }, [token]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await axios.delete(`/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Your Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded dark:border-gray-700">
          <Link to={`/post/${post.id}`} className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            {post.title}
          </Link>
          <div className="mt-2 space-x-2">
            <Link to={`/edit/${post.id}`} className="text-yellow-600 hover:underline">Edit</Link>
            <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
