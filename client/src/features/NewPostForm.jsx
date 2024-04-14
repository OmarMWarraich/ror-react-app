import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, body };

    try {
      await createPost(post);
      navigate("/");
    } catch (error) {
      console.error("Failed to create post: ", error);
    }
  };
  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NewPostForm;
