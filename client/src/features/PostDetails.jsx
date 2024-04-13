import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.json();
          setPost(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  const deletePost = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/">Back to Posts</Link>
      {" | "}
      <Link to={`/posts/${id}/edit`}>Edit</Link>
      {" | "}
      <button onClick={deletePost}>Delete</button>
    </div>
  );
};

export default PostDetails;
