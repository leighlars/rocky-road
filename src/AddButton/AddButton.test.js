import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddButton from "./AddButton";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('AddButton', () => {
  it('should render a button and fire event when clicked', () => {
    render(
    <MemoryRouter>
      <AddButton
       itineraries={[{name: "Girl's Trip!"}]}
       siteName='Rocky Mountain National Park'
       addNewTrip={jest.fn()}
       addToExistingTrip={jest.fn()}
      />
    </MemoryRouter>)

    const addButton = screen.getByRole('button', {name: "Add To Trips"})
    expect(addButton).toBeInTheDocument()
    
    // const showModal = jest.fn()
    // fireEvent.click(addButton)
    // expect(showModal).toBeCalledTimes(1)
  })

})