import React from "react";
import { Routes, Route } from "react-router-dom";

import PostsList from "../features/PostsList";
import PostDetails from "../features/PostDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/new" element={<h1>New Post</h1>} />
    </Routes>
  );
};

export default AppRoutes;
