import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";
import PostForm from "./PostForm";

const NewPostForm = () => {
  const navigate = useNavigate();

  const handleCreateSubmit = async (formData) => {
    try {
      await createPost(formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create post: ", error);
    }
  };
  return (
    <PostForm
      headerText="New Post"
      onSubmit={handleCreateSubmit}
      buttonText="Save"
    />
  );
};

export default NewPostForm;
