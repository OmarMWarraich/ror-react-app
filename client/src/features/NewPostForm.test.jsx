import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

import NewPostForm from "./NewPostForm";
import { createPost } from "../services/postService";

jest.mock("../services/postService", () => ({
  createPost: jest.fn(() => {
    return {
      id: 1,
      title: "Test Post",
      body: "This is a test post.",
    };
  }),
}));

describe("NewPostForm", () => {
  const renderForm = () => {
    render(
      <Router>
        <NewPostForm />
      </Router>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders NewPostForm and allows typing", () => {
    renderForm();

    const titleInput = screen.getByLabelText(/Title/i);
    const bodyInput = screen.getByLabelText(/Body/i);
    const submitButton = screen.getByRole("button", { name: /Save/i });

    const expectedTitle = "Test Post";
    const expectedBody = "This is a test post.";

    fireEvent.change(titleInput, { target: { value: expectedTitle } });
    fireEvent.change(bodyInput, { target: { value: expectedBody } });

    expect(titleInput.value).toBe(expectedTitle);
    expect(bodyInput.value).toBe(expectedBody);
    expect(submitButton).toBeInTheDocument();
  });

  test("Submits form and redirects to the post page", async () => {
    renderForm();

    const titleInput = screen.getByLabelText(/Title/i);
    const bodyInput = screen.getByLabelText(/Body/i);
    const submitButton = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(titleInput, { target: { value: "Test Post" } });
    fireEvent.change(bodyInput, { target: { value: "This is a test post." } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(createPost).toHaveBeenCalledTimes(1);
  });

  test("Displays error message when createPost throws an error", async () => {
    createPost.mockRejectedValueOnce(new Error("An error occurred"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(jest.fn());

    renderForm();

    const titleInput = screen.getByLabelText(/Title/i);
    const bodyInput = screen.getByLabelText(/Body/i);
    const submitButton = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(titleInput, { target: { value: "Test Post" } });
    fireEvent.change(bodyInput, { target: { value: "This is a test post." } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to create post: ",
      new Error("An error occurred")
    );
  });
});
