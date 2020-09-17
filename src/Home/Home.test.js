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

  it('should list 6 state links', () => {
    const co = screen.getByRole('link', {name: 'Colorado'})
    const id = screen.getByRole('link', { name: 'Idaho' })
    const mt = screen.getByRole('link', { name: 'Montana'})
    const nm = screen.getByRole('link', { name: 'New Mexico'})
    const ut = screen.getByRole('link', { name: 'Utah'})
    const wy = screen.getByRole('link', { name: 'Wyoming'})

    expect(co).toBeInTheDocument()
    expect(id).toBeInTheDocument()
    expect(mt).toBeInTheDocument()
    expect(nm).toBeInTheDocument()
    expect(ut).toBeInTheDocument()
    expect(wy).toBeInTheDocument()
  })


})