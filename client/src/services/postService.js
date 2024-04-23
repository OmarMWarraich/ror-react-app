import { API_URL } from "../../constants";

export const createPost = async (postData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: postData,
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.status === 204) {
    return null;
  }

  throw new Error(response.statusText);
};

export const fetchAllPosts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const fetchPost = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const updatePost = async (id, postData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: postData,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
