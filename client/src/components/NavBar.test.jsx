import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router-dom";

describe("NavBar Component", () => {
  const renderNavBar = () => {
    render(<NavBar />, { wrapper: MemoryRouter });
  };
  test("renders both links", () => {
    // render the navbar
    renderNavBar();
    // expects the links to be there
    expect(screen.getByText("Posts List")).toBeInTheDocument();
    expect(screen.getByText("New Post")).toBeInTheDocument();
  });
});
