import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('Home', () => {
  let mockGetCurrentPage
  beforeEach(() => {
    mockGetCurrentPage = jest.fn(() => "/about")
    render(
      <MemoryRouter>
      <Home 
        getCurrentPage={mockGetCurrentPage}
      />
     </MemoryRouter>
    );
  })

  it('should list 4 state links and a header', () => {
    const title = screen.getByRole("heading", { name: "Along the Rocky Road" });
    const homeLink = screen.getByRole("link", { name: "Take A Drive" });
    const savedLink = screen.getByRole("link", { name: "Saved" });
    const aboutLink = screen.getByRole("link", { name: "About" });
    const co = screen.getByRole('link', {name: 'Colorado'})
    const id = screen.getByRole('link', { name: 'Idaho' })
    const mt = screen.getByRole('link', { name: 'Montana'})
    const wy = screen.getByRole('link', { name: 'Wyoming'})

    expect(title).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(savedLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(co).toBeInTheDocument()
    expect(id).toBeInTheDocument()
    expect(mt).toBeInTheDocument()
    expect(wy).toBeInTheDocument()
  })


})