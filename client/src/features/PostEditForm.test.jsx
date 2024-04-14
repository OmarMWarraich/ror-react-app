import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { fetchPost, updatePost } from "../services/postService";
import PostEditForm from "./PostEditForm";

jest.mock("../services/postService", () => ({
  fetchPost: jest.fn(),
  updatePost: jest.fn(),
}));

describe("PostEditForm component", () => {
  const mockPost = {
    title: "Original Post Title",
    body: "Original Post Body",
  };

  const renderForm = () => {
    render(
      <MemoryRouter initialEntries={["/posts/1/edit"]}>
        <Routes>
          <Route path="/posts/:id/edit" element={<PostEditForm />} />
          <Route path="/posts/:id" element={<h1>Post Detail</h1>} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    fetchPost.mockResolvedValue(mockPost);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the PostEditForm component", async () => {
    renderForm();

    await waitFor(() => {
      expect(fetchPost).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPost.body)).toBeInTheDocument();
  });

  it("successfully updates the post and redirects", async () => {
    renderForm();

    await waitFor(() => {
      expect(fetchPost).toHaveBeenCalledTimes(1);
    });

    const newPost = {
      title: "Updated Post Title",
      body: "Updated Post Body",
    };

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: newPost.title },
    });

    fireEvent.change(screen.getByLabelText(/body/i), {
      target: { value: newPost.body },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Save/i));
    });

    await waitFor(() => {
      expect(updatePost).toHaveBeenCalledTimes(1);
      expect(updatePost).toHaveBeenCalledWith("1", newPost);
    });

    expect(screen.getByText("Post Detail")).toBeInTheDocument();
  });

  it("shows a console error on update failure", async () => {
    updatePost.mockRejectedValueOnce(new Error("Update failed"));

    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementation(jest.fn());

    renderForm();

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Save/i));
    });

    await waitFor(() => {
      expect(updatePost).toHaveBeenCalledTimes(1);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to update the post: ",
      Error("Update failed")
    );
  });

  it("shows a loading message while fetching the post", async () => {
    fetchPost.mockResolvedValueOnce(new Promise(() => {}));

    renderForm();

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("shows an error message when fetching the post fails", async () => {
    fetchPost.mockRejectedValueOnce(new Error("Fetch failed"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(jest.fn());

    renderForm();

    await waitFor(() => {
      expect(fetchPost).toHaveBeenCalledTimes(1);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch the post: ",
      Error("Fetch failed")
    );
  });

  it("redirects to the post detail page when the cancel button is clicked", async () => {
    renderForm();

    await waitFor(() => {
      expect(fetchPost).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Cancel/i));
    });

    expect(screen.getByText("Post Detail")).toBeInTheDocument();
  });

  it("displays error message when fetch post fails", async () => {
    const errorMessage = "Failed to fetch post";
    fetchPost.mockRejectedValueOnce(new Error(errorMessage));

    renderForm();

    await waitFor(() => {
      expect(fetchPost).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });
});