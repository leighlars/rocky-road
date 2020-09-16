import React from "react";
import { render, screen } from "@testing-library/react";
import Landing from "./Landing";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("Landing", () => {
 it("should render a title, and 3 nav buttons", () => {
  const { getByRole } = render(
   <MemoryRouter>
    <Landing />
   </MemoryRouter>
  );
  const title = screen.getByRole("heading", { name: "Along the Rocky Road" });
  const homeLink = screen.getByRole("link", { name: "Take A Drive" });
  const searchLink = screen.getByRole("link", { name: "Search" });
  const aboutLink = screen.getByRole("link", { name: "About" });

  expect(title).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
  expect(searchLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
 });
});
