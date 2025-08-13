import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get(`/api/blogs/${id}`)
      .then(res => {
        setForm({ title: res.data.title, content: res.data.content });
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/blogs/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
        <textarea name="content" value={form.content} onChange={handleChange} rows="8"
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
        <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
