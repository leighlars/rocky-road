import React, { useState } from 'react'
import './ItineraryForm.scss'
import exitIcon from '../assets/cancel.png'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'


const ItineraryForm = (props) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [tripName, setTripName] = useState('')
  const [comment, setComment] = useState('')
  const [existingTrip, setExistingTrip] = useState('')
  const [display, setDisplay] = useState('itinerary-modal')


  const addToExistingTrip = (e, tripName) => {
    props.addToExistingTrip(props.siteName, props.siteState, e.target.name)
    setExistingTrip(e.target.name)
  }


  const showItineraries = () => {
    let itinerariesInfo = [<p className='default-msg-existing' key={'default-msg'}>Start planning your next adventure by adding trips below!</p>]
      if (props.itineraries.length > 0) {
      itinerariesInfo = props.itineraries.map(trip => {
        return (
          <Link
          to="/saved-trips"
          key={trip.name}
          className="existing-trip"
          onClick={addToExistingTrip}
          name={trip.name}
          >
          {trip.name}
          </Link>
        );
      })
      } 
    return (
        <div className="itineraries" >
          {itinerariesInfo}
        </div>
    )
  }

  const hideModal = () => {
    if (display === 'itinerary-modal') {
      setDisplay('itinerary-modal-hidden')
    } else {
      setDisplay('itinerary-modal')
    }
  }

  const addToTrips = (e) => {
    e.preventDefault();
    let formInputs = {
      tripName: tripName,
      startDate: startDate,
      endDate: endDate,
      comment: comment
    }
    props.addNewTrip(formInputs, props.siteName, props.siteState)
    hideModal()
  }

  

  return (
   <section className={display}>
    <button className="exit-button" onClick={hideModal}>
     <img src={exitIcon} alt="exit-icon" />
    </button>
    <span className="existing-itineraries">Add to Existing Trip:</span>
    {showItineraries()}
    <form className="itinerary-form">
     <span className="form-prompt">Or Start A New Trip:</span>
     <input
      aria-label="name-input"
      type="text"
      name="tripName"
      placeholder="Trip Name"
      onChange={(e) => setTripName(e.target.value)}
      value={tripName}
     />
     <label className="date-label">Type or select calendar date:</label>
     <div className="date-inputs">
      <input
       aria-label='start-date-input'
       type="date"
       className="date-input"
       min={moment().format('l')}
       max="2021-08-30"
       name="startDate"
       value={startDate}
       onChange={(e) => setStartDate(e.target.value)}
       required
      />
      <input
       type="date"
       className="date-input"
       min={moment().format('l')}
       max="2021-08-30"
       value={endDate}
       onChange={(e) => setEndDate(e.target.value)}
       required
      />
     </div>
      <textarea
       type="text"
       className="comment-input"
       placeholder="Add Comment"
       max="120"
       onChange={(e) => setComment(e.target.value)}
       value={comment}
      />
     <button className="add-trip-button" onClick={addToTrips}>
      Add {props.siteName}
     </button>
    </form>
   </section>
  );
 }


export default ItineraryForm

ItineraryForm.propTypes = {
 siteName: PropTypes.string, 
 siteState: PropTypes.string,
 itineraries: PropTypes.array,
 addNewTrip: PropTypes.func,
 addToExistingTrip: PropTypes.func,
};