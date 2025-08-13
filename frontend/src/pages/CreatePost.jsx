import { useState } from 'react';
import axios from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({ title: '', content: '', published: true });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/blogs', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" required />
        <textarea name="content" placeholder="Content" rows="8" onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
