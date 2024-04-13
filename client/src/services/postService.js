import { API_URL } from "../../constants";

export const createPost = async (post) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to create post");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to delete post");
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllPosts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchPost = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = async (id, post) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to update post");
    }
  } catch (error) {
    console.error(error);
  }
};
