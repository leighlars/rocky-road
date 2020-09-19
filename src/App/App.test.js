import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import {getCleanStatesInfo} from '../apiCalls/dataCleaner'
jest.mock("../apiCalls/dataCleaner.js");

describe('App', () => {

  it('should fetch data, display a landing page with a title and nav links', () => {
    getCleanStatesInfo.mockResolvedValue([
     {state: "Colorado", info: [{ fullName: "Colorado NP", name: "Mesa Verde", town: "Durango", designation: 'National Park' }]},
     {state: "Wyoming", info: [{ fullName: "Wyoming NP", name: "Tetons", town: "Moose", designation: 'National Park'  }]},
     {state: "Montana",  info: [{ fullName: "Glacier NP", name: "Glacier", town: "Glacier", designation: 'National Park'  }]},
     {state: "Idaho", info: [{ fullName: "Sawtooth Mtns", name: "Sawtooth", town: "Boise", designation: 'National Park'  }]},
    ]);

    const {getByRole} = render(
    <MemoryRouter>
      <App/>
    </MemoryRouter>)
  
     const title = screen.getByRole("heading", {name: "Along the Rocky Road"});
     const homeLink = screen.getByRole("link", { name: "Take A Drive" });
     const savedwLink = screen.getByRole("link", { name: "Saved" });
     const aboutLink = screen.getByRole("link", { name: "About" });

     expect(title).toBeInTheDocument();
     expect(homeLink).toBeInTheDocument();
     expect(savedwLink).toBeInTheDocument();
     expect(aboutLink).toBeInTheDocument();

      fireEvent.click(aboutLink)
      const aboutSec = screen.getByRole('heading', {name: 'Places'})
      expect(aboutSec).toBeInTheDocument()
      
  })

  it('should render a page about Colorado when Colorado link is clicked', async () => {
   getCleanStatesInfo.mockResolvedValue([
    {
     state: "Colorado",
     info: [
      {
       fullName: "Colorado NP",
       name: "Mesa Verde",
       town: "Durango",
       designation: "National Park",
      },
      {
       fullName: "Dinosaur Valley",
       name: "DV",
       town: "Somewhere",
       designation: "National Monument",
      },
     ],
    },
    {
     state: "Wyoming",
     info: [
      {
       fullName: "Wyoming NP",
       name: "Tetons",
       town: "Moose",
       designation: "National Park",
      },
     ],
    },
    {
     state: "Montana",
     info: [
      {
       fullName: "Glacier NP",
       name: "Glacier",
       town: "Glacier",
       designation: "National Park",
      },
     ],
    },
    {
     state: "Idaho",
     info: [
      {
       fullName: "Sawtooth Mtns",
       name: "Sawtooth",
       town: "Boise",
       designation: "National Park",
      },
     ],
    },
   ]);

    const { getByRole } = render(
     <MemoryRouter>
      <App />
     </MemoryRouter>
    );

      const homeLink = screen.getByRole('link', {name: 'Take A Drive'})
      expect(homeLink).toBeInTheDocument()
      fireEvent.click(homeLink)

      const coloradoLink = screen.getByRole('link', {name: 'Colorado'})
      expect(coloradoLink).toBeInTheDocument()
      fireEvent.click(coloradoLink)

      const stateHeader = screen.getByRole('heading', {name: "Colorado"})
      const parkName = await waitFor(() => screen.getByRole("heading", { name: "Colorado NP" }))
      expect(stateHeader).toBeInTheDocument()
      expect(parkName).toBeInTheDocument()
  })

  it("should render default messages about missing Colorado info when Colorado link is clicked", async () => {
   getCleanStatesInfo.mockResolvedValueOnce([
    {
     state: "Colorado",
     info: [],
    },
    {
     state: "Wyoming",
     info: [
      {
       fullName: "Wyoming NP",
       name: "Tetons",
       town: "Moose",
       designation: "National Park",
      },
     ],
    },
    {
     state: "Montana",
     info: [
      {
       fullName: "Glacier NP",
       name: "Glacier",
       town: "Glacier",
       designation: "National Park",
      },
     ],
    },
    {
     state: "Idaho",
     info: [
      {
       fullName: "Sawtooth Mtns",
       name: "Sawtooth",
       town: "Boise",
       designation: "National Park",
      },
     ],
    },
   ]);

   const { getByRole } = render(
    <MemoryRouter>
     <App />
    </MemoryRouter>
   );

   const homeLink = screen.getByRole("link", { name: "Take A Drive" });
   expect(homeLink).toBeInTheDocument();
   fireEvent.click(homeLink);

   const coloradoLink = screen.getByRole("link", { name: "Colorado" });
   expect(coloradoLink).toBeInTheDocument();
   fireEvent.click(coloradoLink);

   const stateHeader = screen.getByRole("heading", { name: "Colorado" });
   const notFoundPark = screen.getByRole("heading", { name: "No National Parks found" });
   const notFoundRec = screen.getByRole("heading", { name: "No National Parks found" });

   expect(stateHeader).toBeInTheDocument();
   expect(notFoundPark).toBeInTheDocument();
   expect(notFoundRec).toBeInTheDocument();
  });

  it('should go to Location page when Location link is clicked', async () => {
    getCleanStatesInfo.mockResolvedValue([
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
        description: "Jagged peaks and alpine lake",
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
    ])


    const { getByRole } = render(
     <MemoryRouter>
      <App />
     </MemoryRouter>
    );
    
    const homeLink = screen.getByRole('link', {name: 'Take A Drive'})
      expect(homeLink).toBeInTheDocument()
      fireEvent.click(homeLink)

      const coloradoLink = screen.getByRole('link', {name: 'Colorado'})
      expect(coloradoLink).toBeInTheDocument()
      fireEvent.click(coloradoLink)

      const stateHeader = await waitFor(() => screen.getByRole('heading', {name: "Dinosaur Valley"}))
      const parkName = await waitFor(() => screen.getByRole("heading", { name: "Rocky Mountain National Park" }))
      expect(stateHeader).toBeInTheDocument()
      expect(parkName).toBeInTheDocument()
      fireEvent.click(parkName)

      const locationDesc = screen.getByText("Jagged peaks and alpine lake")
      expect(locationDesc).toBeInTheDocument()
  })

  it('should provide default display on Location page if no data provided', async () => {
    getCleanStatesInfo.mockResolvedValue([{state: 'Colorado', info: [{fullName: "Rocky Mountain National Park", designation: 'National Park'}]}])
    const { getByRole } = render(
     <MemoryRouter>
      <App />
     </MemoryRouter>
    );
    

    const homeLink = screen.getByRole('link', {name: 'Take A Drive'})
      expect(homeLink).toBeInTheDocument()
      fireEvent.click(homeLink)

      const coloradoLink = screen.getByRole('link', {name: 'Colorado'})
      expect(coloradoLink).toBeInTheDocument()
      fireEvent.click(coloradoLink)

      const parkName = await waitFor(() => screen.getByRole("heading", { name: "Rocky Mountain National Park" }))
      expect(parkName).toBeInTheDocument()
      fireEvent.click(parkName)

      const defaultMsg = screen.getByText("No data provided. Check back soon!");
      expect(defaultMsg).toBeInTheDocument()
  })
  






})