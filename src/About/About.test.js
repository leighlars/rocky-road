import React from "react";
import {render, screen} from "@testing-library/react";
import About from "./About";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe('About', () => {
  let mockGetByCurrentPage
  beforeEach(() => {
    mockGetByCurrentPage = jest.fn(() => "/about")
    render(
    <MemoryRouter>
      <About
      getCurrentPage={mockGetByCurrentPage}
      />
    </MemoryRouter>
    )
  })

  it('should render a header', () => {
    const title = screen.getByRole('heading', {name: 'Along the Rocky Road'})
    const homeLink = screen.getByRole('link', {name: 'Take A Drive'})
    expect(title).toBeInTheDocument()
    expect(homeLink).toBeInTheDocument()
  })

  it('should render 3 information boxes', () => {
    const places = screen.getByRole("heading", { name: "Places" })
    const activities = screen.getByRole("heading", { name: "Activities" })
    const information = screen.getByRole('heading', {name: 'Information'})
    const text1 = screen.getByText(/colorado/i) 
    const text2 = screen.getByText(/itinerary/i) 
    const text3 = screen.getByText(/national park and monument/i) 
    const link1 = screen.getByRole('link', {name: 'US Recreation API'})
    const link2 = screen.getByRole("link", { name: "Contact the developer" })

    expect(places).toBeInTheDocument()
    expect(activities).toBeInTheDocument()
    expect(information).toBeInTheDocument()
    expect(text1).toBeInTheDocument()
    expect(text2).toBeInTheDocument()
    expect(text3).toBeInTheDocument()
    expect(link1).toBeInTheDocument()
    expect(link2).toBeInTheDocument()
  })


})