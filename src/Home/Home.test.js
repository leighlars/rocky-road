import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('Home', () => {
  beforeEach(() => {
    render(
    <MemoryRouter>
      <Home/>
    </MemoryRouter>)
  })

  it('should list 4 state links and a header', () => {
    const title = screen.getByRole("heading", { name: "Along the Rocky Road" });
    const homeLink = screen.getByRole("link", { name: "Take A Drive" });
    const searchLink = screen.getByRole("link", { name: "Search" });
    const aboutLink = screen.getByRole("link", { name: "About" });
    const co = screen.getByRole('link', {name: 'Colorado'})
    const id = screen.getByRole('link', { name: 'Idaho' })
    const mt = screen.getByRole('link', { name: 'Montana'})
    const wy = screen.getByRole('link', { name: 'Wyoming'})

    expect(title).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(co).toBeInTheDocument()
    expect(id).toBeInTheDocument()
    expect(mt).toBeInTheDocument()
    expect(wy).toBeInTheDocument()
  })


})