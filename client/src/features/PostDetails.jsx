import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deletePost, fetchPost } from "../services/postService";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await fetchPost(id);
        setPost(post);
      } catch (error) {
        console.error("Failed to fetch the post:", error);
      }
    };
    loadPost();
  }, [id]);

  const deletePostHandler = async () => {
    try {
      await deletePost(post.id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/">Back to Posts</Link>
      {" | "}
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      {" | "}
      <button onClick={deletePostHandler}>Delete</button>
    </div>
  );
};

export default PostDetails;
