import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { deletePost, fetchAllPosts } from "../services/postService";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchAllPosts();
        setPosts(response);
      } catch (error) {
        setError("Failed to fetch the posts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              <div>
                <button onClick={() => deletePostHandler(post.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsList;
