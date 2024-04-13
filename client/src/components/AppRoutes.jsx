import React from "react";
import { Routes, Route } from "react-router-dom";

import PostsList from "../features/PostsList";
import PostDetails from "../features/PostDetails";
import NewPostForm from "../features/NewPostForm";
import PostEditForm from "../features/PostEditForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/posts/:id/edit" element={<PostEditForm />} />
      <Route path="/new" element={<NewPostForm />} />
    </Routes>
  );
};

export default AppRoutes;
