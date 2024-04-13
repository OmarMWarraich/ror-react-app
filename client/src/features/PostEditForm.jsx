import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchPost, updatePost } from "../services/postService";

const PostEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetchPost(id);
        setPost(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const newPost = {
      title: data.get("title"),
      body: data.get("body"),
    };
    try {
      await updatePost(id, newPost);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              name="body"
              value={post.body}
              onChange={(e) => setPost({ ...post, body: e.target.value })}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate(`/posts/${id}`)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default PostEditForm;
