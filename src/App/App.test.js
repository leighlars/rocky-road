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
     {state: "Colorado", info: {natParks: [{ fullName: "Colorado NP", name: "Mesa Verde", town: "Durango", designation: 'National Park' }]}},
     {state: "Wyoming", info: {natParks: [{ fullName: "Wyoming NP", name: "Tetons", town: "Moose", designation: 'National Park'}]}},
     {state: "Montana",  info: {natParks: [{ fullName: "Glacier NP", name: "Glacier", town: "Glacier", designation: 'National Park'  }]}},
     {state: "Idaho", info:{natParks: [{ fullName: "Sawtooth Mtns", name: "Sawtooth", town: "Boise", designation: 'National Park'  }]}},
    ]);

    const {getByRole, getByPlaceholderText, getByAltText} = render(
    <MemoryRouter>
      <App/>
    </MemoryRouter>)
  
     const title = getByRole("heading", {name: "Along the Rocky Road"});
     const homeLink = getByRole("link", { name: "Home" });
     const galleryLink = getByRole("link", { name: "Gallery" });
     const aboutLink = getByRole("link", { name: "About" });
     const input = getByPlaceholderText("Search the Range");
     const inputBtn = getByAltText("submit search");

     expect(title).toBeInTheDocument();
     expect(homeLink).toBeInTheDocument();
     expect(galleryLink).toBeInTheDocument();
     expect(aboutLink).toBeInTheDocument();
     expect(input).toBeInTheDocument();
     expect(inputBtn).toBeInTheDocument();

      fireEvent.click(aboutLink)
      const aboutSec = getByRole('heading', {name: 'Places'})
      expect(aboutSec).toBeInTheDocument()
      
  })

  it('should render a page about Colorado when Colorado link is clicked from Home', async () => {
   getCleanStatesInfo.mockResolvedValueOnce([
     {state: "Colorado", info: {
       natParks: [
         { fullName: "Mesa Verde National Park", name: "Mesa Verde", town: "Durango", designation: 'National Park' }
        ],
        recAreas: [{fullName: "Curecanti National Rec Area", name: 'Curecanti', designation: 'Recreation Area', town: 'Gunnison'}]
      }},
     {state: "Wyoming", info: {natParks: [{ fullName: "Wyoming NP", name: "Tetons", town: "Moose", designation: 'National Park'}]}},
    ]);

  
    const { getByRole } = render(
     <MemoryRouter>
      <App />
     </MemoryRouter>
    );

    // landing
      const homeLink = getByRole('link', {name: 'Home'})
      expect(homeLink).toBeInTheDocument()
      fireEvent.click(homeLink)
    // home 
      const coloradoLink = getByRole('link', {name: 'Colorado'})
      expect(coloradoLink).toBeInTheDocument()
      fireEvent.click(coloradoLink)
    // state page
      const stateHeader = getByRole('heading', {name: "Colorado"})
      const parkName = await waitFor(() => getByRole("heading", { name: "Mesa Verde National Park" }))
      const recName = await waitFor(() => getByRole('heading', {name: 'Curecanti National Rec Area'}))
      expect(stateHeader).toBeInTheDocument()
      expect(parkName).toBeInTheDocument()
      expect(recName).toBeInTheDocument()
  })

  it("should render default messages about missing Colorado info when Colorado link is clicked", async () => {
   getCleanStatesInfo.mockResolvedValueOnce([
     {state: "Colorado", info: {natParks: [], recAreas: []}},
     {state: "Wyoming", info: {natParks: [{ fullName: "Wyoming NP", name: "Tetons", town: "Moose", designation: 'National Park'}]}},
     {state: "Montana",  info: {natParks: [{ fullName: "Glacier NP", name: "Glacier", town: "Glacier", designation: 'National Park'  }]}},
     {state: "Idaho", info:{natParks: [{ fullName: "Sawtooth Mtns", name: "Sawtooth", town: "Boise", designation: 'National Park'  }]}},
    ]);

   const { getByRole } = render(
    <MemoryRouter>
     <App />
    </MemoryRouter>
   );

   const homeLink = getByRole("link", { name: "Home" });
   expect(homeLink).toBeInTheDocument();
   fireEvent.click(homeLink);

   const coloradoLink = getByRole("link", { name: "Colorado" });
   expect(coloradoLink).toBeInTheDocument();
   fireEvent.click(coloradoLink);

   const stateHeader = getByRole("heading", { name: "Colorado" });
   const notFoundPark = getByRole("heading", { name: "No National Parks found" });
   const notFoundRec = getByRole("heading", { name: "No National Parks found" });

   expect(stateHeader).toBeInTheDocument();
   expect(notFoundPark).toBeInTheDocument();
   expect(notFoundRec).toBeInTheDocument();
  });

  it('should go to Location page when Location link is clicked', async () => {
    getCleanStatesInfo.mockResolvedValueOnce([
     {
      state: "Colorado",
      info: {
        natParks: [
            {
            fullName: "Rocky Mountain National Park",
            name: "Rocky Mountain",
            description: "Jagged peaks and alpine lakes",
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
        ],
        recAreas: [ 
          {
            fullName: "Dinosaur Valley",
            designation: "National Monument",
            town: "Somewhere",
          },
        ]
      }
     },
    ])

    const { getByRole, getByText } = render(
     <MemoryRouter>
      <App />
     </MemoryRouter>
    );
    
    // landing page
      const homeLink = getByRole('link', {name: 'Home'})
      expect(homeLink).toBeInTheDocument()
      fireEvent.click(homeLink)
    // home page
      const coloradoLink = getByRole('link', {name: 'Colorado'})
      expect(coloradoLink).toBeInTheDocument()
      fireEvent.click(coloradoLink)
    // state page
      const stateHeader = await waitFor(() => getByRole('heading', {name: "Dinosaur Valley"}))
      const parkName = await waitFor(() => getByRole("link", { class: 'park', href: "/place/Colorado/Rocky-Mountain-National-Park" }))
      expect(stateHeader).toBeInTheDocument()
      expect(parkName).toBeInTheDocument()
      fireEvent.click(parkName)
    // location page
      const locationDesc = await waitFor(() => getByText("Jagged peaks and alpine lakes"))
      expect(locationDesc).toBeInTheDocument()
  })

  it('should provide default display on Location page if no data provided', async () => {
    getCleanStatesInfo.mockResolvedValueOnce([{state: 'Colorado', info: {natParks: [{fullName: "Rocky Mountain National Park", designation: 'National Park'}]}}])
    const { getByRole, getByText } = render(
     <MemoryRouter>
      <App />
     </MemoryRouter>
    );
    
    const homeLink = getByRole('link', {name: 'Home'})
      expect(homeLink).toBeInTheDocument()
      fireEvent.click(homeLink)

      const coloradoLink = getByRole('link', {name: 'Colorado'})
      expect(coloradoLink).toBeInTheDocument()
      fireEvent.click(coloradoLink)

      const parkName = await waitFor(() => getByRole("heading", { name: "Rocky Mountain National Park" }))
      expect(parkName).toBeInTheDocument()
      fireEvent.click(parkName)

      const defaultMsg = getByText("No data provided. Check back soon!");
      expect(defaultMsg).toBeInTheDocument()
  })

  it.only('should return results from a query', async () => {
    getCleanStatesInfo.mockResolvedValueOnce([
     {
      state: "Colorado",
      info: {
       natParks: [
        {
         fullName: "Mesa Verde National Park",
         name: "Mesa Verde",
         town: "Durango",
         state: 'Colorado',
         designation: "National Park",
         description: 'cliff dwellings'
        },
       ],
       recAreas: [
        {
         fullName: "Curecanti National Rec Area",
         name: "Curecanti",
         designation: "Recreation Area",
         town: "Gunnison",
         description: '27-mile long reservoir',
         state: 'Colorado'
        },
       ],
      },
     },
     {
      state: "Wyoming",
      info: {
       natParks: [
        {
         fullName: "Wyoming NP",
         name: "Tetons",
         town: "Moose",
         designation: "National Park",
        },
       ],
      },
     },
    ]);

      render(
       <MemoryRouter>
        <App
        />
       </MemoryRouter>
      );
    
    // input query
    const input = screen.getByPlaceholderText("Search the Range");
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: "mesa" } });
    expect(input.value).toBe("mesa"); 
    const inputBtn = screen.getByAltText("submit search");
    fireEvent.click(inputBtn)

    // see results page
    const mesaVerdeNP = await waitFor(() => screen.getByText('Mesa Verde National Park'))
    const curecantiNRA = screen.getByText('Curecanti National Rec Area')
    expect(mesaVerdeNP).toBeInTheDocument()
    expect(curecantiNRA).toBeInTheDocument()
  })
  
  it("should return default message if no results found from a query", () => {
    getCleanStatesInfo.mockResolvedValueOnce([
     {
      state: "Colorado",
      info: {
       natParks: [
        {
         fullName: "Mesa Verde National Park",
         name: "Mesa Verde",
         town: "Durango",
         designation: "National Park",
        },
       ],
       recAreas: [
        {
         fullName: "Curecanti National Rec Area",
         name: "Curecanti",
         designation: "Recreation Area",
         town: "Gunnison",
        },
       ],
      },
     },
     {
      state: "Wyoming",
      info: {
       natParks: [
        {
         fullName: "Wyoming NP",
         name: "Tetons",
         town: "Moose",
         designation: "National Park",
        },
       ],
      },
     },
    ]);

   render(
    <MemoryRouter>
     <App />
    </MemoryRouter>
   );

   const input = screen.getByPlaceholderText("Search the Range");
   expect(input.value).toBe("");
   fireEvent.change(input, { target: { value: "Florida" } });
   expect(input.value).toBe("Florida");
   const inputBtn = screen.getByAltText("submit search");
   fireEvent.click(inputBtn);
   const msg = screen.getByText('No results found. Please modify your search and try again.')
   expect(msg).toBeInTheDocument();
  });
  






})