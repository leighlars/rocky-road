import React from 'react'
import Results from '../Results/Results'
import '@testing-library/jest-dom'
import {MemoryRouter} from 'react-router-dom'
import {render} from '@testing-library/react'

describe('Results', () => {

  it('should display a header', () => {
    const mockGetCurrentPage = jest.fn(() => "/Colorado/Rocky-Mountain-National-Park");
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



})