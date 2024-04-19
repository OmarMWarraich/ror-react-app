import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import PostForm from "./PostForm";

describe("PostForm component", () => {
  // Post is null by default, for the instance when a new post is being created
  it("renders default inputs when no post prop is passed", () => {
    const mockSubmit = jest.fn();
    const mockButtonText = "Edit Post";
    const { getByLabelText } = render(
      <PostForm
        headerText="New Post"
        onSubmit={mockSubmit}
        buttonText={mockButtonText}
      />
    );
    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/body/i)).toBeInTheDocument();
  });

  it("renders post data when post prop is passed", () => {
    const mockPost = {
      title: "Original Post Title",
      body: "Original Post Body",
    };
    const mockSubmit = jest.fn();
    const mockButtonText = "Edit Post";
    const { getByDisplayValue } = render(
      <PostForm
        post={mockPost}
        headerText="Edit Post"
        onSubmit={mockSubmit}
        buttonText={mockButtonText}
      />
    );
    expect(getByDisplayValue(mockPost.title)).toBeInTheDocument();
    expect(getByDisplayValue(mockPost.body)).toBeInTheDocument();
  });

  it("updates input values when user types", () => {
    const mockPost = {
      title: "Original Post Title",
      body: "Original Post Body",
    };
    const mockSubmit = jest.fn();
    const mockButtonText = "Edit Post";
    const { getByLabelText } = render(
      <PostForm
        post={mockPost}
        headerText="Edit Post"
        onSubmit={mockSubmit}
        buttonText={mockButtonText}
      />
    );

    const titleInput = getByLabelText(/title/i);
    const bodyInput = getByLabelText(/body/i);

    fireEvent.change(titleInput, { target: { value: "Updated Post Title" } });
    fireEvent.change(bodyInput, { target: { value: "Updated Post Body" } });

    expect(titleInput.value).toBe("Updated Post Title");
    expect(bodyInput.value).toBe("Updated Post Body");
  });

  it("calls onSubmit with the form data when the form is submitted", async () => {
    const mockSubmit = jest.fn();
    const mockButtonText = "Submit";
    const headerText = "Edit Post";
    const { getByRole, getByLabelText } = render(
      <PostForm
        buttonText={mockButtonText}
        headerText={headerText}
        onSubmit={mockSubmit}
      />
    );

    const titleInput = getByLabelText(/title/i);
    const bodyInput = getByLabelText(/body/i);
    const newTitle = "Updated Post Title";
    const newBody = "Updated Post Body";

    fireEvent.change(titleInput, { target: { value: newTitle } });
    fireEvent.change(bodyInput, { target: { value: newBody } });
    await act(async () => {
      fireEvent.click(getByRole("button", { name: /submit/i }));
    });

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      title: newTitle,
      body: newBody,
    });
  });
});
