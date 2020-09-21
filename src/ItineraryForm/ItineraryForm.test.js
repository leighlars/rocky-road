import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ItineraryForm from "./ItineraryForm";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("Itinerary Form", () => {

  it('should display a form', () => {
    let mockSiteName = "Rocky Mountain National Park"
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
      places: ["Mesa Verde National Park", "Colorado National Monument"],
      comment: "Jane's wedding",
     },
    ];
    let mockAddNewTrip = jest.fn()
    let mockAddToExistingTrip = jest.fn()
    render(<MemoryRouter>
      <ItineraryForm
      itineraries={mockItineraries}
      siteName={mockSiteName}
      addNewTrip={mockAddNewTrip}
      mockAddToExistingTrip={mockAddToExistingTrip}
      />
    </MemoryRouter>)

      const addToExistingHeader = screen.getByText( "Add to Existing Trip:", {exact: false})
      const startTripHeader = screen.getByText("Or Start A New Trip:");
      const girlsTrip = screen.getByRole('link', {name: "Girl's Trip!"})
      const azWedding = screen.getByRole('link', {name: 'Arizona Wedding!'})
      const calendarPrompt = screen.getByText('Type or select calendar date:')
      const addButton = screen.getByRole('button', {name: 'Add Rocky Mountain National Park'})
      const exitButton = screen.getByAltText('exit-icon')
      const tripNameInput = screen.getByPlaceholderText('Trip Name')
      // const dateInputs = screen.getAllByText('mm/dd/yyyy', {exact: false})
      const commentBox = screen.getByPlaceholderText('Add Comment')
      expect(addToExistingHeader).toBeInTheDocument()
      expect(startTripHeader).toBeInTheDocument()
      expect(girlsTrip).toBeInTheDocument()
      expect(azWedding).toBeInTheDocument()
      expect(calendarPrompt).toBeInTheDocument()
      expect(addButton).toBeInTheDocument()
      expect(exitButton).toBeInTheDocument()
      expect(tripNameInput).toBeInTheDocument()
      expect(commentBox).toBeInTheDocument()
      // expect(dateInputs).toHaveLength(4)
  })

  it('should prompt user to add new itinerary if no itineraries are found', () => {
    let mockSiteName = "Rocky Mountain National Park";
    let mockItineraries = [];
    let mockAddNewTrip = jest.fn();
    let mockAddToExistingTrip = jest.fn();
    render(
     <MemoryRouter>
      <ItineraryForm
       itineraries={mockItineraries}
       siteName={mockSiteName}
       addNewTrip={mockAddNewTrip}
       mockAddToExistingTrip={mockAddToExistingTrip}
      />
     </MemoryRouter>
    );

    const defaultMsg = screen.getByText(
     "Start planning your next adventure by adding trips below!"
    )
    expect(defaultMsg).toBeInTheDocument()
  })

  it('should reflect change in inputs', () => {
     let mockSiteName = "Rocky Mountain National Park";
     let mockItineraries = [];
     let mockAddNewTrip = jest.fn();
     let mockAddToExistingTrip = jest.fn();
     render(
      <MemoryRouter>
       <ItineraryForm
        itineraries={mockItineraries}
        siteName={mockSiteName}
        addNewTrip={mockAddNewTrip}
        mockAddToExistingTrip={mockAddToExistingTrip}
       />
      </MemoryRouter>
     )

     const commentBox = screen.getByPlaceholderText('Add Comment')
     const tripName = screen.getByPlaceholderText('Trip Name')
     expect(commentBox.value).toBe('') 
     expect(tripName.value).toBe("")
     fireEvent.change(commentBox, { target: { value: "So excited!" } });
     expect(commentBox.value).toBe("So excited!")
     fireEvent.change(tripName, { target: { value: "Thanksgiving" } });
     expect(tripName.value).toBe("Thanksgiving");
  })

    it('should fire an event when existing itinerary is clicked', () => {
      let mockSiteName = "Rocky Mountain National Park";
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
        places: ["Mesa Verde National Park", "Colorado National Monument"],
        comment: "Jane's wedding",
       },
      ];
      let mockAddNewTrip = jest.fn();
      let mockAddToExistingTrip = jest.fn();
      render(
       <MemoryRouter>
        <ItineraryForm
         itineraries={mockItineraries}
         siteName={mockSiteName}
         addNewTrip={mockAddNewTrip}
         addToExistingTrip={mockAddToExistingTrip}
        />
       </MemoryRouter>
      )

      const azWedding = screen.getByRole('link', {name: 'Arizona Wedding!'})
      fireEvent.click(azWedding)
      expect(mockAddToExistingTrip).toBeCalledTimes(1)
      expect(mockAddToExistingTrip).toBeCalledWith("Rocky Mountain National Park", 'Arizona Wedding!')
    })


    it('should fire an event when add button is clicked', () => {
        let mockSiteName = "Rocky Mountain National Park";
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
          places: ["Mesa Verde National Park", "Colorado National Monument"],
          comment: "Jane's wedding",
         },
        ];
        let mockAddNewTrip = jest.fn();
        let mockAddToExistingTrip = jest.fn();
        render(
         <MemoryRouter>
          <ItineraryForm
           itineraries={mockItineraries}
           siteName={mockSiteName}
           addNewTrip={mockAddNewTrip}
           addToExistingTrip={mockAddToExistingTrip}
          />
         </MemoryRouter>
        );


        const commentBox = screen.getByPlaceholderText("Add Comment");
        const tripName = screen.getByPlaceholderText("Trip Name");
        expect(commentBox.value).toBe("");
        expect(tripName.value).toBe("");
        fireEvent.change(commentBox, { target: { value: "So excited!" } });
        expect(commentBox.value).toBe("So excited!");
        fireEvent.change(tripName, { target: { value: "Thanksgiving" } });
        expect(tripName.value).toBe("Thanksgiving");
        const addButton =  screen.getByRole('button', {name: "Add Rocky Mountain National Park"})
        fireEvent.click(addButton)
        expect(mockAddNewTrip).toBeCalledTimes(1)
        expect(mockAddNewTrip).toBeCalledWith(
          {
            comment: 'So excited!', 
            tripName:'Thanksgiving', 
            display: 'itinerary-modal', 
            endDate:'', 
            startDate:'', 
            existingTrip: ''
        }, 'Rocky Mountain National Park')
    })


})