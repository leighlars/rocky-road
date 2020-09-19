import React from "react";
import {render, screen} from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('Header', () => {
  
  it('should render a title, and 3 nav buttons', () => {
    let mockGetByCurrentPage = jest.fn(() => "/:page")
    const {getByRole, getByPlaceholderText, getByAltText} = render(<MemoryRouter>
      <Header getCurrentPage={mockGetByCurrentPage}/>
      </MemoryRouter>)
    const title = getByRole('heading', {name: 'Along the Rocky Road'})
    const homeLink = getByRole('link', {name: 'Home'})
    const galleryLink = getByRole("link", { name: "Gallery" });
    const aboutLink = getByRole("link", { name: "About" });
    const input = getByPlaceholderText('Search the Range')
    const inputBtn = getByAltText('submit search')

    expect(title).toBeInTheDocument()
    expect(homeLink).toBeInTheDocument();
    expect(galleryLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(input).toBeInTheDocument()
    expect(inputBtn).toBeInTheDocument()
  })


})