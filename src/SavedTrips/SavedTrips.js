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
  const jsxTrips = itineraries.map(trip => {
    return (
     <div className="trip">
      <h2>{trip.name}</h2>
      <p className="trip-dates">
       {moment(trip.startDate).format("ll")} - 
      {moment(trip.endDate).format("ll")}
      </p>
      {jsxPlaces}
     </div>
    );
  })
  
  return(
    <section className='saved-section'>
      <Header searchSites={searchSites}  />
      <section className='saved-trips'>
        {jsxTrips}
      </section>
    </section>
  )
}

export default SavedTrips
SavedTrips.propTypes = {
  searchSites: PropTypes.func,
}