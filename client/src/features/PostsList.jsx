import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { deletePost, fetchAllPosts } from "../services/postService";
import "./PostImage.css";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchAllPosts();
        setPosts(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Failed to fetch posts: ", error);
      }
    };
    loadPosts();
  }, []);

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete the post: ", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {posts.map((post) => (
            <div key={post.id} className="post-container">
              <h2>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              <div className="post-image-container">
                {/* Standard image if the url exists */}
                {/* If the url does not exist, render an empty div */}
                {/* of equal size to the standard post-image container */}
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="post-image"
                  />
                ) : (
                  <div
                    className="post-image-stub"
                    data-testid="post-image-stub"
                  />
                )}
              </div>
              <div className="post-links">
                <button onClick={() => deletePostHandler(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostsList;
