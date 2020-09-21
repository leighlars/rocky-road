import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Landing from "./Landing";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("Landing", () => {
  let mockGetByCurrentPage
  let mockSearchSites
  beforeEach(() => {
    mockGetByCurrentPage = jest.fn(() => '/')
    mockSearchSites = jest.fn()
    render(
     <MemoryRouter>
      <Landing 
        getCurrentPage={mockGetByCurrentPage}
        searchSites={mockSearchSites}
      />
     </MemoryRouter>
    );

  })
 it("should render a title, and 3 nav buttons", () => {

  const title = screen.getByRole("heading", { name: "Along the Rocky Road" })
  const homeLink = screen.getByRole("link", { name: "Home" })
  const galleryLink = screen.getByRole("link", { name: "Gallery" })
  const savedLink = screen.getByRole("link", { name: "Saved Trips" });
  const aboutLink = screen.getByRole("link", { name: "About" })
  const input = screen.getByPlaceholderText("Search the Range")
  const inputBtn = screen.getByAltText("submit search")

  expect(title).toBeInTheDocument()
  expect(homeLink).toBeInTheDocument()
  expect(galleryLink).toBeInTheDocument()
  expect(savedLink).toBeInTheDocument()
  expect(aboutLink).toBeInTheDocument()
  expect(input).toBeInTheDocument()
  expect(inputBtn).toBeInTheDocument() 
 })

 it('should fire an event when search button is clicked', () => {
   const inputBtn = screen.getByAltText("submit search")
   expect(inputBtn).toBeInTheDocument()
   fireEvent.click(inputBtn)
   expect(mockSearchSites).toBeCalledTimes(1)
 })

});
