import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import {getCleanStatesInfo} from '../apiCalls/dataCleaner'
jest.mock("../apiCalls/dataCleaner.js");

describe('App', () => {

  it('should fetch data, display a landing page with a title and nav links', () => {
    getCleanStatesInfo.mockResolvedValueOnce({
     colorado: [{ name: "Mesa Verde", town: 'Durango' }],
     wyoming: [{ name: "Tetons", name: 'Moose' }],
     montana: [{ name: "Glacier", name: 'Glacier' }],
     idaho: [{ name: "Sawtooth", name: 'Boise' }],
    });

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

      fireEvent.click(homeLink)
      const coloradoLink = screen.getByRole('heading', {name: 'Colorado'})
      expect(coloradoLink).toBeInTheDocument()
  })

  it('should render a page about Colorado when Colorado link is clicked', () => {
      const coloradoLink = screen.getByRole('heading', {name: 'Colorado'})
      expect(coloradoLink).toBeInTheDocument()

      fireEvent.click(coloradoLink);
      
      const rmnp = screen.getByRole("heading", { name: "RMNP" });
      expect(rmnp).toBeInTheDocument();
  })
  






})