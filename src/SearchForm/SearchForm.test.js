import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('SearchForm', () => {
  let mockGetCurrentPage
  beforeEach(() => {  
    mockGetCurrentPage = jest.fn(() => ":/")
    render(
      <MemoryRouter>
        <SearchForm 
        getCurrentPage={mockGetCurrentPage}
        searchSites={jest.fn()}
        />
      </MemoryRouter>
    )
  })

  it('should render an input field and button', () => {
    const input = screen.getByPlaceholderText("Search the Range");
    const inputBtn = screen.getByAltText("submit search");

    expect(input).toBeInTheDocument();
    expect(inputBtn).toBeInTheDocument();
  })

  it('input should reflect change in value', () => {
    const input = screen.getByPlaceholderText("Search the Range");
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: "Colorado" } });
    expect(input.value).toBe("Colorado");

  })





})
