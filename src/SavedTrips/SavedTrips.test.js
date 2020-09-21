import React from "react";
import SavedTrips from "../SavedTrips/SavedTrips";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe('SavedTrips', () => {

   it("should display a header", () => {
    const mockSearchSites = jest.fn();
    const mockItineraries = []
    render(
     <MemoryRouter>
      <SavedTrips searchSites={mockSearchSites} itineraries={mockItineraries} />
     </MemoryRouter>
    );
    const homeLink = screen.getByRole("link", { name: "Home" })
    const galleryLink = screen.getByRole("link", { name: "Gallery" })
    const aboutLink = screen.getByRole("link", { name: "About" })
    const title = screen.getByRole("heading", { name: "Along the Rocky Road" })
    const input = screen.getByPlaceholderText("Search the Range")
    const inputBtn = screen.getByAltText("submit search")
    expect(title).toBeInTheDocument()
    expect(homeLink).toBeInTheDocument()
    expect(galleryLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(inputBtn).toBeInTheDocument()
   })

  it('should display default message if no trips are found', () => {
    let mockSearchSites = jest.fn()
    let mockItineraries = []
    render(
    <MemoryRouter>
      <SavedTrips
      searchSites={mockSearchSites}
      itineraries={mockItineraries}
    />
    </MemoryRouter>)

    const defaultMsg = screen.getByText('Look around to plan your next adventure!')
    expect(defaultMsg).toBeInTheDocument()
  })

  it('should display saved itineraries', () => {
    let mockSearchSites = jest.fn();
    let mockItineraries = [
     {
      name: "Girl's Trip!",
      startDate: "2020-10-30",
      endDate: "2020-11-15",
      places: ["Rocky Mountain National Park", "Mesa Verde National Park"],
      comment: "So excited!",
     },
     {
      name: "Arizona Wedding!",
      startDate: "2020-11-20",
      endDate: "2020-11-30",
      places: ["Mesa Verde National Park", 'Colorado National Monument'],
      comment: "Jane's wedding",
     },
    ];
    render(
     <MemoryRouter>
      <SavedTrips searchSites={mockSearchSites} itineraries={mockItineraries} />
     </MemoryRouter>
    );
    const girlsTrip = screen.getByRole('heading', {name: "Girl's Trip!"})
    const arizonaWedding = screen.getByRole('heading', {name:'Arizona Wedding!'})
    const rmnp = screen.getByText('Rocky Mountain National Park')
    const cnm = screen.getByText("Colorado National Monument")
    const startDate1 = screen.getByText('Oct 30, 2020')  
    const startDate2 = screen.getByText("Nov 20, 2020")
    const comment1 = screen.getByText('So excited!', {exact: false})
    const comment2 = screen.getByText("Jane's wedding", {exact: false})
  })



})