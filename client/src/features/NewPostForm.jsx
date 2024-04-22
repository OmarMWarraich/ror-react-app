import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";
import PostForm from "./PostForm";

const NewPostForm = () => {
  const navigate = useNavigate();

  const handleCreateSubmit = async (rawData) => {
    // Create formData object
    const formData = new FormData();
    // Wrap in a post[field_name] format
    formData.append("post[title]", rawData.title);
    formData.append("post[body]", rawData.body);
    formData.append("post[image]", rawData.image);
    try {
      const response = await createPost(formData);
      navigate(`/posts/${response.id}`);
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
