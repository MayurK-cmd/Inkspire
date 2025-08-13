import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${id}`)
      .then(res => setPost(res.data))
      .catch(console.error);
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500">
        By {post.author.firstname} {post.author.lastname}
      </p>
      <div className="text-lg whitespace-pre-line">{post.content}</div>
    </div>
  );
};

export default PostDetail;
