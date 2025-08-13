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
    axios
      .get(`/api/blogs/${id}`)
      .then((res) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111714] px-4">
      <div className="w-full max-w-[960px] flex flex-col items-center py-5">
        <h2 className="text-white tracking-light text-[28px] font-bold leading-tight pb-3 pt-5 text-center">
          Edit Post
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center space-y-4"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full h-14 max-w-[800px] rounded-lg bg-[#29382f] text-white placeholder:text-[#9eb7a8] p-4 text-base font-normal focus:outline-none border-none"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
            className="w-full min-h-[400px] max-w-[800px] resize-none rounded-lg bg-[#29382f] text-white placeholder:text-[#9eb7a8] p-4 text-base font-normal focus:outline-none border-none"
          />
          <button
            type="submit"
            className="cursor-pointer w-full h-14 max-w-[800px] rounded-lg bg-yellow-500 text-[#111714] text-sm font-bold tracking-[0.015em] hover:bg-yellow-400 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
