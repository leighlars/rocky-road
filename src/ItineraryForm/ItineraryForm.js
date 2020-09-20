import React, { Component } from 'react'
import './ItineraryForm.scss'
import exitIcon from '../assets/cancel.png'
import {Link} from 'react-router-dom'

class ItineraryForm extends Component {
 constructor(props) {
  super(props);
  this.state = {
   startDate: "",
   endDate: "",
   tripName: "",
   display: 'itinerary-modal',
   comment: '',
   existingTrip: {}
  };
 }

handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
}

addToExistingTrip = (e, tripName) => {
  this.setState({existingTrip: e.target.value})
  console.log(this.state.existingTrip)
  this.props.addToExistingTrip(this.props.siteData, this.state.existingTrip)
}


showItineraries = () => {
  const tripDetails = this.props.itineraries.map(trip => {
    return (
     <Link
      to="/saved-trips"
      key={trip.name}
      className="existing-trip"
      onClick={this.addToExistingTrip}
     >
      {trip.name}
     </Link>
    );
  })
  return (
      <div className="itineraries" >
        {tripDetails}
      </div>
  );
}

addToTrips = (e) => {
  e.preventDefault();
  this.props.addNewTrip(this.state, this.props.siteData)
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
    <span className="existing-itineraries">Add to existing trip:</span>
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
       type="date"
       className="date-input"
       min="2020-09-20"
       max="2021-08-30"
       name="startDate"
       onChange={this.handleChange}
       value={this.state.startDate}
       required
      />
      <input
       type="date"
       className="date-input"
       min="2020-09-20"
       max="2021-08-30"
       name="endDate"
       onChange={this.handleChange}
       value={this.state.endDate}
       required
      />
     </div>
      <textarea
       type="date"
       className="comment-input"
       placeholder="Comment"
       max="120"
       name="comment"
       onChange={this.handleChange}
       value={this.state.comment}
      />
     <button className="add-trip-button" onClick={this.addToTrips}>
      Add {this.props.siteData.fullName}
     </button>
    </form>
   </section>
  );
 }
}

export default ItineraryForm
