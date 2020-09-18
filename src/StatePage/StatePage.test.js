import React from "react";
import { render, screen } from "@testing-library/react";
import StatePage from "./StatePage";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('StatePage', () => {
  let mockedAllStateSites
  let mockGetCurrentPage
  beforeEach(() => {
    mockedAllStateSites = [
     {
      state: "Wyoming",
      info: [
       { name: "Tetons", designation: "National Park", city: "Moose" },
       { name: "Bighorn", designation: "National Monument", city: "Somewhere" },
      ],
     },
     {
      state: "Colorado",
      info: [
       { fullName: "RMNP", designation: "National Park", town: "Estes Park" },
       { fullName: "Dinosaur Valley", designation: "National Monument", town: "Somewhere" },
      ],
     },
    ];
    mockGetCurrentPage = jest.fn(() => '/Colorado')
    render(
    <MemoryRouter>
      <StatePage
        allStatesInfo={mockedAllStateSites}
        getCurrentPage={mockGetCurrentPage}
      />
    </MemoryRouter>)
  })


    it('should render a header', () => {
     const homeLink = screen.getByRole("link", { name: "Take A Drive" });
     const searchLink = screen.getByRole("link", { name: "Search" });
     const aboutLink = screen.getByRole("link", { name: "About" });
     const title = screen.getByRole("heading", {name: "Along the Rocky Road"});
     expect(title).toBeInTheDocument();
     expect(homeLink).toBeInTheDocument();
     expect(searchLink).toBeInTheDocument();
     expect(aboutLink).toBeInTheDocument();
  })

    it("should render state sites' information", () => {
      const state = screen.getByRole('heading', {name:'Colorado'})
      const npSecHeader = screen.getByRole('heading', {name: 'National Parks'} )
      const recSecHeader = screen.getByRole('heading', {name: 'Areas of Interest'})
      const parkName = screen.getByRole('heading', {name: 'RMNP'})
      const parkCity = screen.getByText('Estes Park')
      const recName = screen.getByRole('heading', {name: 'Dinosaur Valley'})
      const recCity = screen.getByText('Somewhere')

      expect(state).toBeInTheDocument();
      expect(npSecHeader).toBeInTheDocument();
      expect(recSecHeader).toBeInTheDocument();
      expect(parkName).toBeInTheDocument();
      expect(recName).toBeInTheDocument();
      expect(parkCity).toBeInTheDocument()
      expect(recCity).toBeInTheDocument()
    })

    it('display default cards if no data is found for a rec area or park', ()=> {
        const mockedAllStateSites = [{fullName: "John Smith"}];
        mockGetCurrentPage = jest.fn(() => '/Colorado');
        render(
         <MemoryRouter>
          <StatePage
           allStatesInfo={mockedAllStateSites}
           getCurrentPage={mockGetCurrentPage}
          />
         </MemoryRouter>
        );

        const noParks = screen.getByRole('heading', {name: 'No National Parks Found'})
        expect(noParks).toBeInTheDocument()
    });



})

