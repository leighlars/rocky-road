import React from "react";
import { render, screen } from "@testing-library/react";
import StatePage from "./StatePage";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('StatePage', () => {


    it('should render a header', () => {
      const mockedAllStateSites = [
       {
        state: "Wyoming",
        info: [
         { name: "Tetons", designation: "National Park", city: "Moose" },
         {
          name: "Bighorn",
          designation: "National Monument",
          city: "Somewhere",
         },
        ],
       },
       {
        state: "Colorado",
        info: [
         { fullName: "RMNP", designation: "National Park", town: "Estes Park" },
         {
          fullName: "Dinosaur Valley",
          designation: "National Monument",
          town: "Somewhere",
         },
        ],
       },
      ];
      const mockGetCurrentPage = jest.fn(() => "/Colorado");
      const { getByRole } = render(
       <MemoryRouter>
        <StatePage
         allStatesInfo={mockedAllStateSites}
         getCurrentPage={mockGetCurrentPage}
        />
       </MemoryRouter>
      );
     const homeLink = screen.getByRole("link", { name: "Take A Drive" });
     const savedLink = screen.getByRole("link", { name: "Saved" });
     const aboutLink = screen.getByRole("link", { name: "About" });
     const title = screen.getByRole("heading", {name: "Along the Rocky Road"});
     expect(title).toBeInTheDocument();
     expect(homeLink).toBeInTheDocument();
     expect(savedLink).toBeInTheDocument();
     expect(aboutLink).toBeInTheDocument();
  })

    it("should render state sites' information", () => {
      const mockedAllStateSites = [
       {
        state: "Wyoming",
        info: [
         { name: "Tetons", designation: "National Park", city: "Moose" },
         {
          name: "Bighorn",
          designation: "National Monument",
          city: "Somewhere",
         },
        ],
       },
       {
        state: "Colorado",
        info: [
         { fullName: "RMNP", designation: "National Park", town: "Estes Park" },
         {
          fullName: "Dinosaur Valley",
          designation: "National Monument",
          town: "Somewhere",
         },
        ],
       },
      ];
      const mockGetCurrentPage = jest.fn(() => "/Colorado");
      const {getByRole} = render(
       <MemoryRouter>
        <StatePage
         allStatesInfo={mockedAllStateSites}
         getCurrentPage={mockGetCurrentPage}
        />
       </MemoryRouter>
      );
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
        const mockedAllStateSites = [
         {
          state: "Colorado",
          info: []
         },
        ];
        const mockGetCurrentPage =  jest.fn(() => '/Colorado');
        render(
         <MemoryRouter>
          <StatePage
           allStatesInfo={mockedAllStateSites}
           getCurrentPage={mockGetCurrentPage}
          />
         </MemoryRouter>
        );

        const noParks = screen.getByRole('heading', {name: 'No National Parks found'})
        expect(noParks).toBeInTheDocument()
        const noRecAreas = screen.getByRole('heading', {name: 'No Recreation Areas found'})
        expect(noRecAreas).toBeInTheDocument()
    });

  })
