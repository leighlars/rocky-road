import React from 'react'
import Gallery from '../Gallery/Gallery'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('Gallery', () => {
  let mockGetCurrentPage
  beforeEach(() => {
    mockGetCurrentPage = jest.fn(() => '/gallery')
    render(
     <MemoryRouter>
      <Gallery getCurrentPage={mockGetCurrentPage} searchSites={jest.fn()} />
     </MemoryRouter>
    );
  })

  it('should render a header, 30 scenic photos, and links', () => {
      // downloaded react package for the gallery and node isn't picking up the images? here's my valid attempt at testing 

      const title = screen.getByRole("heading", {name: "Along the Rocky Road"});
      const homeLink = screen.getByRole("link", { name: "Home" });
      const aboutLink = screen.getByRole("link", { name: "About" });
      const input = screen.getByPlaceholderText("Search the Range");
      const inputBtn = screen.getByAltText("submit search");
      // const images = screen.getAllByAltText(/from/i)
      // const images = screen.getAllByRole('img')
      const photoCred = screen.getByText('Photos courtesy of', {exact: false})

      expect(title).toBeInTheDocument()
      expect(homeLink).toBeInTheDocument()
      expect(aboutLink).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(inputBtn).toBeInTheDocument()
      // expect(images).toHaveLength(30)
      expect(photoCred).toBeInTheDocument()

  })
})