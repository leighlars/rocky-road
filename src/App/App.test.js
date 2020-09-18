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
     const searchLink = screen.getByRole("link", { name: "Search" });
     const aboutLink = screen.getByRole("link", { name: "About" });

     expect(title).toBeInTheDocument();
     expect(homeLink).toBeInTheDocument();
     expect(searchLink).toBeInTheDocument();
     expect(aboutLink).toBeInTheDocument();

      fireEvent.click(aboutLink)
      const aboutSec = screen.getByRole('heading', {name: 'Places'})
      expect(aboutSec).toBeInTheDocument()
      
  })

  it('should render a page about Colorado when Colorado link is clicked', async () => {
   getCleanStatesInfo.mockResolvedValueOnce([
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
  






})