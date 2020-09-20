import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import About from "./About";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('About', () => {
  let mockSearchSites
  beforeEach(() => {
    mockSearchSites = jest.fn()
    render(
    <MemoryRouter>
      <About
      searchSites={mockSearchSites}
      />
    </MemoryRouter>
    )
  })

  it('should render a header', () => {
   const title = screen.getByRole("heading", { name: "Along the Rocky Road" });
   const homeLink = screen.getByRole("link", { name: "Home" });
   const galleryLink = screen.getByRole("link", { name: "Gallery" });
   const savedLink = screen.getByRole("link", { name: "Saved Trips" });
   const input = screen.getByPlaceholderText("Search the Range");
   const inputBtn = screen.getByAltText("submit search");

   expect(title).toBeInTheDocument();
   expect(homeLink).toBeInTheDocument();
   expect(galleryLink).toBeInTheDocument();
   expect(savedLink).toBeInTheDocument();
   expect(input).toBeInTheDocument();
   expect(inputBtn).toBeInTheDocument(); 
  })

  it('should render 3 information boxes', () => {
    const places = screen.getByRole("heading", { name: "Places" })
    const activities = screen.getByRole("heading", { name: "Activities" })
    const information = screen.getByRole('heading', {name: 'Information'})
    const text1 = screen.getByText(/colorado/i) 
    const text2 = screen.getByText(/pictures/i) 
    const text3 = screen.getByText(/national park and monument/i) 
    const link1 = screen.getByRole('link', {name: 'US Recreation API'})
    const link2 = screen.getByRole("link", { name: "Contact the developer" })

    expect(places).toBeInTheDocument()
    expect(activities).toBeInTheDocument()
    expect(information).toBeInTheDocument()
    expect(text1).toBeInTheDocument()
    expect(text2).toBeInTheDocument()
    expect(text3).toBeInTheDocument()
    expect(link1).toBeInTheDocument()
    expect(link2).toBeInTheDocument()
  })

  it("should fire an event when search button is clicked", () => {
   const inputBtn = screen.getByAltText("submit search");
   expect(inputBtn).toBeInTheDocument();
   fireEvent.click(inputBtn);
   expect(mockSearchSites).toBeCalledTimes(1);
  });

})