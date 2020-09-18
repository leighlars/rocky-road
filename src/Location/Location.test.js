import React from 'react'
import Location from './Location'
import "@testing-library/jest-dom"
import {MemoryRouter} from "react-router-dom"
import {render, screen} from "@testing-library/react"


describe('Location', () => {

  it('should render a Header', () => {
    const mockedAllStateSites = [
     {
      state: "Wyoming",
      info: [
       { name: "Tetons", designation: "National Park", city: "Moose" },
      ],
     },
     {
      state: "Colorado",
      info: [
       { 
       fullName: "Rocky Mountain National Park",
       name: 'Rocky Mountain', 
       designation: "National Park", 
       town: "Estes Park", state: 'CO', 
       images: [{alt:'Mountains', url:"someUrl"}], 
       entranceFees: [{title: 'day pass', description: 'one day', cost: '25.0000' }],
       activities: [{name: 'Hiking'}, {name: 'Rock climbing'}],
       weather: 'Cold in winter',
       directions: 'Drive on 36 to Estes Park',
       directionsPage: 'someDriving.url',
       url: 'someMainUrl',
       operationDesc: 'Open year round, Trail Ridge Road closed in winter',
     
          },
       {
        fullName: "Dinosaur Valley",
        designation: "National Monument",
        town: "Somewhere",
       },
      ],
     },
    ];
    const mockGetCurrentPage = jest.fn(() => "/Colorado/Rocky-Mountain-National-Park");
    const { getByRole } = render(
     <MemoryRouter>
      <Location
       allStatesInfo={mockedAllStateSites}
       getCurrentPage={mockGetCurrentPage}
      />
     </MemoryRouter>
    );
    const homeLink = screen.getByRole("link", { name: "Take A Drive" });
    const savedLink = screen.getByRole("link", { name: "Saved" });
    const aboutLink = screen.getByRole("link", { name: "About" });
    const backLink = screen.getByRole("link", { name: "Back" });
    const title = screen.getByRole("heading", { name: "Along the Rocky Road" });
    expect(title).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(savedLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(backLink).toBeInTheDocument()
  })


  it('should display information about the Location', () => {
    const mockedAllStateSites = [
     {
      state: "Wyoming",
      info: [{ name: "Tetons", designation: "National Park", city: "Moose" }],
     },
     {
      state: "Colorado",
      info: [
       {
        fullName: "Rocky Mountain National Park",
        name: "Rocky Mountain",
        designation: "National Park",
        town: "Estes Park",
        state: "CO",
        images: [{ alt: "Mountains", url: "someUrl" }],
        entranceFees: [
         { title: "day pass", description: "one day", cost: "25.0000" },
        ],
        activities: [{ name: "Hiking" }, { name: "Rock climbing" }],
        weather: "Cold in winter",
        directions: "Drive on 36 to Estes Park",
        directionsPage: "someDriving.url",
        url: "someMainUrl",
        operationDesc: "Open year round, Trail Ridge Road closed in winter",
       },
       {
        fullName: "Dinosaur Valley",
        designation: "National Monument",
        town: "Somewhere",
       },
      ],
     },
    ];
    const mockGetCurrentPage = jest.fn(
     () => "/Colorado/Rocky-Mountain-National-Park"
    );
    const { getByRole } = render(
     <MemoryRouter>
      <Location
       allStatesInfo={mockedAllStateSites}
       getCurrentPage={mockGetCurrentPage}
      />
     </MemoryRouter>

      


    );






  })


})