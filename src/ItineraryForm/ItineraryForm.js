import React, { Component } from 'react'
import './ItineraryForm.scss'
import exitIcon from '../assets/cancel.png'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'

class ItineraryForm extends Component {
 constructor(props) {
  super(props);
  this.state = {
   startDate: "",
   endDate: "",
   tripName: "",
   display: 'itinerary-modal',
   comment: '',
   existingTrip: '',
   todayDate: moment().format('l')
  };
 }

handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
}

addToExistingTrip = (e, tripName) => {
  this.props.addToExistingTrip(this.props.siteName, e.target.name)
  this.setState({existingTrip: e.target.name})
}


showItineraries = () => {
  const tripDetails = () => {
    if (this.props.itineraries.length > 0) {
     return this.props.itineraries.map(trip => {
       return (
        <Link
         to="/saved-trips"
         key={trip.name}
         className="existing-trip"
         onClick={this.addToExistingTrip}
         name={trip.name}
        >
         {trip.name}
        </Link>
       );
     })
    } else {
    return([<p className='default-msg-existing' key={'default-msg'}>Start planning your next adventure by adding trips below!</p>]) 
    }
  }
  return (
      <div className="itineraries" >
        {tripDetails()}
      </div>
  );
  
}

addToTrips = (e) => {
  e.preventDefault();
  this.props.addNewTrip(this.state, this.props.siteName)
  this.hideModal()
}

  hideModal = () => {
    this.setState({display: 'itinerary-modal-hidden'})
  }

 render() {
  return (
   <section className={this.state.display}>
    <button className="exit-button" onClick={this.hideModal}>
     <img src={exitIcon} alt="exit-icon" />
    </button>
    <span className="existing-itineraries">Add to Existing Trip:</span>
    {this.showItineraries()}
    <form className="itinerary-form">
     <span className="form-prompt">Or Start A New Trip:</span>
     <input
      aria-label="name-input"
      type="text"
      name="tripName"
      placeholder="Trip Name"
      onChange={this.handleChange}
      value={this.state.tripName}
     />
     <label className="date-label">Type or select calendar date:</label>
     <div className="date-inputs">
      <input
       aria-label='start-date-input'
       type="date"
       className="date-input"
       min={this.state.todayDate}
       max="2021-08-30"
       name="startDate"
       onChange={this.handleChange}
       value={this.state.startDate}
       required
      />
      <input
       type="date"
       className="date-input"
       min={this.state.startDate}
       max="2021-08-30"
       name="endDate"
       onChange={this.handleChange}
       value={this.state.endDate}
       required
      />
     </div>
      <textarea
       type="text"
       className="comment-input"
       placeholder="Add Comment"
       max="120"
       name="comment"
       onChange={this.handleChange}
       value={this.state.comment}
      />
     <button className="add-trip-button" onClick={this.addToTrips}>
      Add {this.props.siteName}
     </button>
    </form>
   </section>
  );
 }
}

export default ItineraryForm

ItineraryForm.propTypes = {
 siteName: PropTypes.string, 
 itineraries: PropTypes.array,
 addNewTrip: PropTypes.func,
 addToExistingTrip: PropTypes.func,
};