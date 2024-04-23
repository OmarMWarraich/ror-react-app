import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { deletePost } from "../services/postService";
import "./PostImage.css";

import SearchBar from "./SearchBar";
import usePostsData from "../hooks/usePostsData";
import useURLSearchParam from "../hooks/useURLSearchParam";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");

  const {
    posts: fetchedPosts,
    loading,
    error,
  } = usePostsData(debouncedSearchTerm);

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete the post: ", error);
    }
  };

  const handleImmediateSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleDebouncedSearchChange = (value) => {
    setDebouncedSearchTerm(value);
  };

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
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
