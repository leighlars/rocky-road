import React from 'react'
import Results from '../Results/Results'
import '@testing-library/jest-dom'
import {MemoryRouter} from 'react-router-dom'
import {fireEvent, render} from '@testing-library/react'

describe('Results', () => {

  it('should display a header', () => {
    const mockGetCurrentPage = jest.fn(() => "/results");
    const { getByRole, getByPlaceholderText, getByAltText } = render(
     <MemoryRouter>
      <Results
       allStatesInfo={jest.fn()}
       getCurrentPage={mockGetCurrentPage}
      />
     </MemoryRouter>
    );
    const homeLink = getByRole("link", { name: "Home" });
    const galleryLink = getByRole("link", { name: "Gallery" });
    const aboutLink = getByRole("link", { name: "About" });
    const backLink = getByRole("link", { name: "Back" });
    const title = getByRole("heading", { name: "Along the Rocky Road" });
    const input = getByPlaceholderText("Search the Range");
    const inputBtn = getByAltText("submit search");
    expect(title).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(galleryLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(backLink).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(inputBtn).toBeInTheDocument();
  })

  it('should display search results', () => {
    const mockGetCurrentPage = jest.fn(() => "/results");
    const mockSearchSites = jest.fn()
    
    const { getByRole, getByPlaceholderText, getByAltText } = render(
     <MemoryRouter>
      <Results getCurrentPage={mockGetCurrentPage} searchSites={mockSearchSites} />
     </MemoryRouter>
    );

    
    const input = getByPlaceholderText("Search the Range");
    fireEvent.change(input, { target: { value: "Colorado" } })
    expect(input.value).toBe("Colorado")
    const inputBtn = getByAltText("submit search");
    fireEvent.click(inputBtn);
    expect(mockSearchSites).toBeCalledTimes(1);
    const rockyNP = getByRole('heading', {name: 'Rocky Mountain National Park'})   
    const curecanti = getByRole('heading', {name: 'Curecanti National Recreation Area'})
    expect(rockyNP).toBeInTheDocument()
    expect(curecanti).toBeInTheDocument()
    
  })

    it('should display a message if no results are found', () => {
      const mockGetCurrentPage = jest.fn(() => "/results");
    const mockSearchSites = jest.fn()
    
    const { getByText, getByPlaceholderText, getByAltText } = render(
     <MemoryRouter>
      <Results getCurrentPage={mockGetCurrentPage} searchSites={mockSearchSites} />
     </MemoryRouter>
    );

    
      const input = getByPlaceholderText("Search the Range");
      fireEvent.change(input, { target: { value: "Florida" } })
      expect(input.value).toBe("Colorado")
      const inputBtn = getByAltText("submit search");
      fireEvent.click(inputBtn);
      expect(mockSearchSites).toBeCalledTimes(1);
      const msg = getByText('No results match your search. Please modify your search and try again.')
      expect(msg).toBeInTheDocument()

    })




})