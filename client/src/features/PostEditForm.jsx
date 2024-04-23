import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchPost, updatePost } from "../services/postService";
import PostForm from "./PostForm";
import { objectToFormData } from "../utils/formDataHelper";

const PostEditForm = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetchPost(id);
        setPost(response);
      } catch (error) {
        console.error("Failed to fetch the post: ", error);
      }
    };
    loadPost();
  }, [id]);

  const handleUpdateSubmit = async (rawData) => {
    const sanitizedData = {
      title: rawData.title,
      body: rawData.body,
      image: rawData.image,
    };
    const formData = objectToFormData({ post: sanitizedData });
    try {
      await updatePost(id, formData);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Failed to update the post: ", error);
    }
  };

  return post ? (
    <PostForm
      post={post}
      headerText="Edit Post"
      onSubmit={handleUpdateSubmit}
      buttonText="Save"
    />
  ) : null;
};

export default PostEditForm;
