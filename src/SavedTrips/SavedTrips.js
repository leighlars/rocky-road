import React from 'react'
import './SavedTrips.scss'
import Header from '../Header/Header'
import PropTypes from 'prop-types'
import moment from 'moment'

const SavedTrips = ({searchSites, itineraries}) => {

  const placeNames = (trip) => {
    return trip.places.map(place => {
      console.log(place)
     return(<p>{place.fullName}</p>)
    })
  } 

  const jsxTrips = () => {
    if (itineraries.length !== 0) {
      return itineraries.map(trip => {
        return (
        <div className="trip" key={trip.name}>
          <h2>{trip.name}</h2>
          <span className='trip-dates'>
          <p>{moment(trip.startDate).format("ll")} </p> - 
          <p> {moment(trip.endDate).format("ll")}</p>
          </span>
         <span className='comment'>{trip.comment}</span>
          {placeNames(trip)}
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