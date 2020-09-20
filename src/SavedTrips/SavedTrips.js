import React from 'react'
import './SavedTrips.scss'
import Header from '../Header/Header'
import PropTypes from 'prop-types'
import moment from 'moment'

const SavedTrips = ({searchSites, itineraries}) => {
  const placeNames = itineraries.reduce((siteNames, trip) => {
    trip.places.forEach(place => {
      siteNames.push(place.fullName)
    })
    return siteNames
  }, [])

  const jsxPlaces = placeNames.map(place => {
  return(<p>{place}</p>)
  })

  const sortedItineraries = itineraries.sort((a,b) => a.startDate - b.startDate)

  const jsxTrips = () => {
    if (itineraries.length !== 0) {
      return sortedItineraries.map(trip => {
        return (
        <div className="trip">
          <h2>{trip.name}</h2>
          <span className='trip-dates'>
          <p>{moment(trip.startDate).format("ll")} </p> - 
          <p> {moment(trip.endDate).format("ll")}</p>
          </span>
          {jsxPlaces}
        </div>
        );
      })
    } else {
      return(<h2>Look around to plan your next adventure!</h2>)
    }
  }

  return(
    <section className='saved-section'>
      <Header searchSites={searchSites}  />
      <section className='saved-trips'>
        {jsxTrips()}
      </section>
    </section>
  )
}

export default SavedTrips
SavedTrips.propTypes = {
  itineraries: PropTypes.array,
  searchSites: PropTypes.func,
}