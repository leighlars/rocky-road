import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('Home', () => {
  let mockSearchSites
  beforeEach(() => {
    mockSearchSites = jest.fn()
    render(
      <MemoryRouter>
      <Home 
        searchSites={mockSearchSites}
      />
     </MemoryRouter>
    );
  })

  it('should list 4 state links and a header', () => {
    const title = screen.getByRole("heading", { name: "Along the Rocky Road" });
    const galleryLink = screen.getByRole("link", { name: "Gallery" });
    const aboutLink = screen.getByRole("link", { name: "About" })
    const savedLink = screen.getByRole("link", { name: "Saved Trips" });
    const input = screen.getByPlaceholderText("Search the Range");
    const inputBtn = screen.getByAltText("submit search");
    const co = screen.getByRole('link', {name: 'Colorado'})
    const id = screen.getByRole('link', { name: 'Idaho' })
    const mt = screen.getByRole('link', { name: 'Montana'})
    const wy = screen.getByRole('link', { name: 'Wyoming'})

    expect(title).toBeInTheDocument()
    expect(galleryLink).toBeInTheDocument()
    expect(savedLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(inputBtn).toBeInTheDocument()
    expect(co).toBeInTheDocument()
    expect(id).toBeInTheDocument()
    expect(mt).toBeInTheDocument()
    expect(wy).toBeInTheDocument()
  })

  it("should fire an event when search button is clicked", () => {
   const inputBtn = screen.getByAltText("submit search")
   expect(inputBtn).toBeInTheDocument()
   fireEvent.click(inputBtn)
   expect(mockSearchSites).toBeCalledTimes(1)
  });

})