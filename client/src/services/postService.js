import { POSTS_API_URL, SEARCH_API_URL } from "../../constants";

export const createPost = async (postData) => {
  const response = await fetch(POSTS_API_URL, {
    method: "POST",
    body: postData,
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export const deletePost = async (id) => {
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.status === 204) {
    return null;
  }

  throw new Error(response.statusText);
};

export const fetchAllPosts = async () => {
  const response = await fetch(POSTS_API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchPost = async (id) => {
  const response = await fetch(`${POSTS_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const updatePost = async (id, postData) => {
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: "PUT",
    body: postData,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const searchPosts = async (searchTerm) => {
  // => api/v1/search + /posts/?q=...
  const response = await fetch(`${SEARCH_API_URL}/posts/?q=${searchTerm}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};
