import React from "react";
import {render, screen} from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('Header', () => {
  
  it('should render a title, and 3 nav buttons', () => {
    const {getByRole} = render(<MemoryRouter><Header/></MemoryRouter>)
    const title = screen.getByRole('heading', {name: 'Along the Rocky Road'})
    const homeLink = screen.getByRole('link', {name: 'Take A Drive'})
    const searchLink = screen.getByRole("link", { name: "Search" });
    const aboutLink = screen.getByRole("link", { name: "About" });

    expect(title).toBeInTheDocument()
    expect(homeLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  })


})