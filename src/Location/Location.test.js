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
      info: {
        natParks: [
          { 
            fullName: "Rocky Mountain National Park",
            name: 'Rocky Mountain', 
            description: 'Jagged peaks and alpine lake',
            designation: "National Park", 
            town: "Estes Park", state: 'CO', 
            images: [{alt:'Mountains', url:"someUrl"}], 
            entranceFees: [{title: 'day pass', description: 'one day', cost: '25.0000' }],
            activities: ['Hiking','Rock climbing'],
            weather: 'Cold in winter',
            directions: 'Drive on 36 to Estes Park',
            directionsPage: 'someDriving.url',
            url: 'someMainUrl',
            operationDesc: 'Open year round, Trail Ridge Road closed in winter',
          },
        ],
        recAreas: [
          {
            fullName: "Dinosaur Valley",
            designation: "National Monument",
            town: "Somewhere",
          },
        ],
      }
     },
    ] 
    const mockGetCurrentPage = jest.fn(() => "/place/Colorado/Rocky-Mountain-National-Park") 
    const { getByRole } = render(
     <MemoryRouter>
      <Location
       allStatesInfo={mockedAllStateSites}
       getCurrentPage={mockGetCurrentPage}
      />
     </MemoryRouter>
    ) 
    const homeLink = screen.getByRole("link", { name: "Home" }) 
    const galleryLink = screen.getByRole("link", { name: "Gallery" }) 
    const aboutLink = screen.getByRole("link", { name: "About" }) 
    const savedLink = screen.getByRole('link', {name: "Saved Trips"})
    const title = screen.getByRole("heading", { name: "Along the Rocky Road" }) 
    const input = screen.getByPlaceholderText("Search the Range");
    const inputBtn = screen.getByAltText("submit search");
    expect(title).toBeInTheDocument() 
    expect(homeLink).toBeInTheDocument() 
    expect(galleryLink).toBeInTheDocument() 
    expect(aboutLink).toBeInTheDocument() 
    expect(input).toBeInTheDocument()
    expect(inputBtn).toBeInTheDocument()
    expect(savedLink).toBeInTheDocument()
  })


  it('should display information about the Location', () => {
    const mockedAllStateSites = [
     {
      state: "Wyoming",
      info: [{ name: "Tetons", designation: "National Park", city: "Moose" }],
     },
     {
      state: "Colorado",
      info: {
       natParks: [
        {
         fullName: "Rocky Mountain National Park",
         name: "Rocky Mountain",
         description: "Jagged peaks and alpine lake",
         designation: "National Park",
         town: "Estes Park",
         state: "CO",
         images: [{ alt: "Mountains", url: "someUrl" }],
         entranceFees: [
          { title: "day pass", description: "one day", cost: "25.0000" },
         ],
         activities: ["Hiking", "Rock climbing"],
         weather: "Cold in winter",
         directions: "Drive on 36 to Estes Park",
         directionsPage: "someDriving.url",
         url: "someMainUrl",
         operationDesc: "Open year round, Trail Ridge Road closed in winter",
        },
       ],
       recAreas: [
        {
         fullName: "Dinosaur Valley",
         designation: "National Monument",
         town: "Somewhere",
        },
       ],
      },
     },
    ]; 
    const mockGetCurrentPage = jest.fn(
     () => "/place/Colorado/Rocky-Mountain-National-Park"
    ) 
    const { getByRole } = render(
     <MemoryRouter>
      <Location
       allStatesInfo={mockedAllStateSites}
       getCurrentPage={mockGetCurrentPage}
      />
     </MemoryRouter>

    ) 
      const title = screen.getByRole('heading', {name: 'Rocky Mountain National Park'})
      const description = screen.getByText('Jagged peaks and alpine lake')
      const weather = screen.getByText('Cold in winter')
      const townState = screen.getByText("Estes Park, CO", {exact: false}) 
      const directions = screen.getByText("Drive on 36 to Estes Park", {exact: false}) 
      const entranceFee = screen.getByText('$25')
      const feeDesc = screen.getByText('day pass')
      const hours = screen.getByText('24 hours / 7 days')
      const hiking = screen.getByText('Hiking')
      const rockClimbing = screen.getByText('Rock climbing')
      const opDesc = screen.getByText('Open year round, Trail Ridge Road closed in winter')

      expect(title).toBeInTheDocument()
      expect(description).toBeInTheDocument() 
      expect(weather).toBeInTheDocument() 
      expect(townState).toBeInTheDocument() 
      expect(directions).toBeInTheDocument() 
      expect(entranceFee).toBeInTheDocument() 
      expect(feeDesc).toBeInTheDocument()
      expect(hours).toBeInTheDocument() 
      expect(rockClimbing).toBeInTheDocument() 
      expect(hiking).toBeInTheDocument() 
      expect(opDesc).toBeInTheDocument() 
  })

  it('should render a default message if no data is provided', () => {
    const mockedAllStateSites = [] 
    const mockGetCurrentPage = jest.fn(
     () => "/place/Colorado/Rocky-Mountain-National-Park"
    ) 
    const { getByRole } = render(
     <MemoryRouter>
      <Location
       allStatesInfo={mockedAllStateSites}
       getCurrentPage={mockGetCurrentPage}
      />
     </MemoryRouter>
    )
    
     const defaultMsg = screen.getByText('No data provided. Check back soon!') 
      expect(defaultMsg).toBeInTheDocument()

  })

})