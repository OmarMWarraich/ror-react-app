import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "../../constants";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(API_URL);
    async function fetchPosts() {
      try {
        const response = await fetch(API_URL);
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

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
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsList;
