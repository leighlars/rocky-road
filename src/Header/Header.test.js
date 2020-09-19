import React from "react";
import {render, screen} from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('Header', () => {
  
  it('should render a title, and 3 nav buttons', () => {
    let mockGetByCurrentPage = jest.fn(() => "/:page")
    const {getByRole} = render(<MemoryRouter>
      <Header getCurrentPage={mockGetByCurrentPage}/>
      </MemoryRouter>)
    const title = screen.getByRole('heading', {name: 'Along the Rocky Road'})
    const homeLink = screen.getByRole('link', {name: 'Take A Drive'})
    const savedLink = screen.getByRole("link", { name: "Saved" });
    const aboutLink = screen.getByRole("link", { name: "About" });

    expect(title).toBeInTheDocument()
    expect(homeLink).toBeInTheDocument();
    expect(savedLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  })


})