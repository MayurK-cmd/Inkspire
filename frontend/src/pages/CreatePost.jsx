import { useState } from "react";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    published: true,
  });

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/blogs", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#111714] overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-4xl p-6"
      >
        <h2 className="text-white text-[28px] font-bold leading-tight text-center mb-6">
          Create a new post
        </h2>

        {/* Title Input */}
        <input
          name="title"
          placeholder="Title"
          className="form-input w-full resize-none rounded-lg text-white focus:outline-none border-none bg-[#29382f] h-14 placeholder:text-[#9eb7a8] p-4 text-base font-normal mb-4"
          value={form.title}
          onChange={handleChange}
          required
        />

        {/* Content Input */}
        <textarea
          name="content"
          placeholder="Content"
          className="form-input w-full resize-none rounded-lg text-white focus:outline-none border-none bg-[#29382f] min-h-[50vh] placeholder:text-[#9eb7a8] p-4 text-base font-normal mb-6"
          value={form.content}
          onChange={handleChange}
          required
        ></textarea>

        {/* Publish Button */}
        <button
          type="submit"
          className="w-full h-12 bg-[#38e07b] text-[#111714] text-sm font-bold rounded-lg"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
