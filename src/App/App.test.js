import React from "react" 
import { fireEvent, render, screen, waitFor } from "@testing-library/react" 
import App from "./App" 
import "@testing-library/jest-dom" 
import { MemoryRouter } from "react-router-dom" 
import {getCleanStatesInfo} from '../apiCalls/dataCleaner'
jest.mock("../apiCalls/dataCleaner.js") 

describe('App', () => {

  it('should fetch data, display a landing page with a title and nav links', () => {
    getCleanStatesInfo.mockResolvedValue([
     {state: "Colorado", info: {natParks: [{ fullName: "Colorado NP", name: "Mesa Verde", town: "Durango", designation: 'National Park' }]}},
     {state: "Wyoming", info: {natParks: [{ fullName: "Wyoming NP", name: "Tetons", town: "Moose", designation: 'National Park'}]}},
     {state: "Montana",  info: {natParks: [{ fullName: "Glacier NP", name: "Glacier", town: "Glacier", designation: 'National Park'  }]}},
     {state: "Idaho", info:{natParks: [{ fullName: "Sawtooth Mtns", name: "Sawtooth", town: "Boise", designation: 'National Park'  }]}},
    ]) 

    const {getByRole, getByPlaceholderText, getByAltText} = render(
    <MemoryRouter>
      <App/>
    </MemoryRouter>)
  
     const title = getByRole("heading", {name: "Along the Rocky Road"}) 
     const homeLink = getByRole("link", { name: "Home" }) 
     const galleryLink = getByRole("link", { name: "Gallery" }) 
     const aboutLink = getByRole("link", { name: "About" }) 
     const input = getByPlaceholderText("Search the Range") 
     const inputBtn = getByAltText("submit search") 

     expect(title).toBeInTheDocument() 
     expect(homeLink).toBeInTheDocument() 
     expect(galleryLink).toBeInTheDocument() 
     expect(aboutLink).toBeInTheDocument() 
     expect(input).toBeInTheDocument() 
     expect(inputBtn).toBeInTheDocument() 

      fireEvent.click(aboutLink)
      const aboutSec = getByRole('heading', {name: 'Places'})
      expect(aboutSec).toBeInTheDocument()
      
  })

  describe('App-- nav link flow', () => {
    beforeEach(() => {
      getCleanStatesInfo.mockResolvedValue([
       {
        state: "Colorado",
        info: {
         natParks: [
          {
           fullName: "Colorado NP",
           name: "Mesa Verde",
           town: "Durango",
           designation: "National Park",
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
       {
        state: "Montana",
        info: {
         natParks: [
          {
           fullName: "Glacier NP",
           name: "Glacier",
           town: "Glacier",
           designation: "National Park",
          },
         ],
        },
       },
       {
        state: "Idaho",
        info: {
         natParks: [
          {
           fullName: "Sawtooth Mtns",
           name: "Sawtooth",
           town: "Boise",
           designation: "National Park",
          },
         ],
        },
       },
      ])  

      render(
       <MemoryRouter>
        <App />
       </MemoryRouter>
      )  
    })

    it('should go to Gallery page when Gallery link is clicked', () => {
      const galleryLink = screen.getByRole("link", { name: "Gallery" })   

      fireEvent.click(galleryLink)
      const galleryText = screen.getByText('Photos courtesy of', {exact: false})
      expect(galleryText).toBeInTheDocument()
    })

    it('should go to About page when About link is clicked', () => {
      const aboutLink = screen.getByRole("link", { name: "About" })   

      fireEvent.click(aboutLink)
      const aboutText = screen.getByText('Places', {exact: false})
      expect(aboutText).toBeInTheDocument()
    })

    it('should go to Saved Trips page when Saved Trips link is clicked', () => {
      const savedLink = screen.getByRole("link", { name: "Saved Trips" })  

      fireEvent.click(savedLink)  
      const savedText = screen.getByText("Look around to plan your next adventure", { exact: false })  
      expect(savedText).toBeInTheDocument()  
    })

    it('should go to Home page when Home link is clicked', () => {
      const homeLink = screen.getByRole("link", { name: "Home" })  

      fireEvent.click(homeLink)  
      const coloLink = screen.getByRole('link', {name: 'Colorado'})  
      expect(coloLink).toBeInTheDocument()  
      const wyLink = screen.getByRole("link", { name: "Wyoming" });
      expect(wyLink).toBeInTheDocument(); 
      const mtLink = screen.getByRole("link", { name: "Montana" });
      expect(mtLink).toBeInTheDocument();  
      const idLink = screen.getByRole("link", { name: "Idaho" });
      expect(idLink).toBeInTheDocument();  
    })

  })

  describe('App-location flow', () => {
    
    it('should render a page about Colorado when Colorado link is clicked from Home', async () => {
    getCleanStatesInfo.mockResolvedValueOnce([
      {state: "Colorado", info: {
        natParks: [
          { fullName: "Mesa Verde National Park", name: "Mesa Verde", town: "Durango", designation: 'National Park' }
          ],
          recAreas: [{fullName: "Curecanti National Rec Area", name: 'Curecanti', designation: 'Recreation Area', town: 'Gunnison'}]
        }},
      {state: "Wyoming", info: {natParks: [{ fullName: "Wyoming NP", name: "Tetons", town: "Moose", designation: 'National Park'}]}},
      ]) 

    
      const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
      ) 

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
      ]) 
    
    const { getByRole } = render(
      <MemoryRouter>
      <App />
      </MemoryRouter>
    ) 
    
    const homeLink = getByRole("link", { name: "Home" }) 
    expect(homeLink).toBeInTheDocument() 
    fireEvent.click(homeLink) 
    
    const coloradoLink = getByRole("link", { name: "Colorado" }) 
    expect(coloradoLink).toBeInTheDocument() 
    fireEvent.click(coloradoLink) 
    
    const stateHeader = getByRole("heading", { name: "Colorado" }) 
    const notFoundPark = getByRole("heading", { name: "No National Parks found" }) 
    const notFoundRec = getByRole("heading", { name: "No National Parks found" }) 
    
    expect(stateHeader).toBeInTheDocument() 
    expect(notFoundPark).toBeInTheDocument() 
    expect(notFoundRec).toBeInTheDocument() 
    }) 
    
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
              activities: [ "Hiking", "Rock climbing"],
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
    
      const { getByRole, getByText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
      ) 
      
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
        const parkName = await waitFor(() => getByRole("heading", {name: 'Rocky Mountain National Park' }))
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
        <App  
        />
      </MemoryRouter>
      ) 
      
      const homeLink = getByRole('link', {name: 'Home'})
        expect(homeLink).toBeInTheDocument()
        fireEvent.click(homeLink)
    
        const coloradoLink = getByRole('link', {name: 'Colorado'})
        expect(coloradoLink).toBeInTheDocument()
        fireEvent.click(coloradoLink)
    
        const parkName = await waitFor(() => getByRole("heading", { name: "Rocky Mountain National Park" }))
        expect(parkName).toBeInTheDocument()
        fireEvent.click(parkName)
    
        const defaultMsg = getByText("No data provided. Check back soon!") 
        expect(defaultMsg).toBeInTheDocument()
    })

  })

  describe('App--forms flow', () => {
   xit('should return results from a query', () => {
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
      ]);

        render(
        <MemoryRouter>
          <App
          />
        </MemoryRouter>
        ) 
      
      // input query
      const input = screen.getByPlaceholderText("Search the Range") 
      expect(input.value).toBe('')
      fireEvent.change(input, { target: { value: "rocky" } }) 
      expect(input.value).toBe("rocky")  
      const inputBtn = screen.getByAltText("submit search") 
      fireEvent.click(inputBtn)

      // see results page
      const rmNP = screen.getByText('Rocky Mountain National Park')
      expect(rmNP).toBeInTheDocument()
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
      ]) 

    render(
      <MemoryRouter>
      <App />
      </MemoryRouter>
    ) 

    const input = screen.getByPlaceholderText("Search the Range") 
    expect(input.value).toBe("") 
    fireEvent.change(input, { target: { value: "Florida" } }) 
    expect(input.value).toBe("Florida") 
    const inputBtn = screen.getByAltText("submit search") 
    fireEvent.click(inputBtn) 
    const msg = screen.getByText('No results found. Please modify your search and try again.')
    expect(msg).toBeInTheDocument() 
    }) 

  })

    it('should add new itinerary and add new locations to said itinerary', async () => {
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
     ]);

     const { getByRole, getByText } = render(
      <MemoryRouter>
       <App />
      </MemoryRouter>
     );

     // get from landing to location page
     // landing page
     const homeLink = getByRole("link", { name: "Home" });
     expect(homeLink).toBeInTheDocument();
     fireEvent.click(homeLink);
     // home page
     const coloradoLink = getByRole("link", { name: "Colorado" });
     expect(coloradoLink).toBeInTheDocument();
     fireEvent.click(coloradoLink);

     // state page
     const stateHeader = await waitFor(() =>
      getByRole("heading", { name: "Dinosaur Valley" })
     );
     const parkName = await waitFor(() =>
      getByRole("heading", { name: "Rocky Mountain National Park" })
     );
     expect(stateHeader).toBeInTheDocument();
     expect(parkName).toBeInTheDocument();
     fireEvent.click(parkName);

     // location page to form modal
     const locationDesc = await waitFor(() =>
      getByText("Jagged peaks and alpine lakes")
     );
     expect(locationDesc).toBeInTheDocument();
     const addButton = getByRole("button", { name: "Add To Trips" });
     fireEvent.click(addButton);

     // show form +  submit input + close modal
     const commentBox = screen.getByPlaceholderText("Add Comment");
     const tripName = screen.getByPlaceholderText("Trip Name");
     expect(commentBox.value).toBe("");
     expect(tripName.value).toBe("");
     fireEvent.change(commentBox, { target: { value: "So excited!" } });
     expect(commentBox.value).toBe("So excited!");
     fireEvent.change(tripName, { target: { value: "Christmas" } });
     expect(tripName.value).toBe("Christmas");
     const submitButton = screen.getByRole("button", {
      name: "Add Rocky Mountain National Park",
     });
     fireEvent.click(submitButton);
     const closeModal = screen.getByAltText("exit-icon");
     fireEvent.click(closeModal);

     // go to saved itineraries page
     const savedLink = screen.getByRole("link", { name: "Saved Trips" });
     fireEvent.click(savedLink);
     const christmas = screen.getByRole("heading", { name: "Christmas" });
     const rockyMtn = screen.getByText('Rocky Mountain National Park')
     expect(christmas).toBeInTheDocument()
     expect(rockyMtn).toBeInTheDocument()

     // go back to home, through the state, and to a new location
     // home page
    const homeLink2 = getByRole("link", { name: "Home" });
    expect(homeLink2).toBeInTheDocument();
    fireEvent.click(homeLink2);

     const coloradoLink2 = getByRole("link", { name: "Colorado" });
     expect(coloradoLink2).toBeInTheDocument();
     fireEvent.click(coloradoLink2);

     // state page, going to Dino Valley this time
     const stateHeader2 = await waitFor(() =>
      getByRole("heading", { name: "Dinosaur Valley" })
     );
     const parkName2 = await waitFor(() =>
      getByRole("heading", { name: "Rocky Mountain National Park" })
     );
     expect(stateHeader2).toBeInTheDocument();
     expect(parkName2).toBeInTheDocument();
     fireEvent.click(stateHeader2);

     // location page to form modal
     const locationDesc2 = await waitFor(() =>
      getByText("Dinosaur Valley")
     );
     expect(locationDesc2).toBeInTheDocument();
     const addButton2 = getByRole("button", { name: "Add To Trips" })
     fireEvent.click(addButton2)

    //  click on existing itinerary
     const christmasLink = getByText("Christmas")
     expect(christmasLink).toBeInTheDocument()
     fireEvent.click(christmasLink)

    //  immediately taken to saved trips page to show that the location has been added to Christmas itinerary
     const dinoValley = screen.getByText('Dinosaur Valley')
     const rmnp2 = screen.getByText('Rocky Mountain National Park')
     const christmasHeader = screen.getByRole('heading', {name: 'Christmas'})
     expect(dinoValley).toBeInTheDocument()
     expect(rmnp2).toBeInTheDocument()
     expect(christmasHeader).toBeInTheDocument()
    })


  






})