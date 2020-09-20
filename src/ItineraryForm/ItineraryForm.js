import React, { Component } from 'react'
import './ItineraryForm.scss'
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import exitIcon from '../assets/cancel.png'

class ItineraryForm extends Component {
 constructor(props) {
  super(props);
  this.state = {
   startDate: "",
   endDate: "",
   tripName: "",
   places: [],
   display: 'itinerary-modal'
  };
 }

 handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
 };

addToTrips = (e) => {
  e.preventDefault();
  this.props.addsNewTrip(this.state, this.props.siteData)
}

hideModal = () => {
  this.setState({display: 'itinerary-modal-hidden'})
}

 render() {
  return (
   <section className={this.state.display}>
     <button 
     className='exit-button' 
     onClick={this.hideModal} 
     >
       <img src={exitIcon} alt='exit-icon'/></button>
    <span className="existing-itineraries">
     Add to existing trip:
    
    </span>
    <form className="itinerary-form">
      <span className='form-prompt'>
        Or Start A New Trip:
      </span>
     <input
      aria-label="name-input"
      type="text"
      name="tripName"
      placeholder="Trip Name"
      onChange={this.handleChange}
     />
     <label for="dates" class="date-label">
      Type or select calendar date:
     </label>
     <div className='date-inputs'>
      <input
        type="date"
        class="date-input"
        min="2020-09-20"
        max="2021-08-30"
        name="startDate"
        required
      />
      <input
        type="date"
        class="date-input"
        min="2020-09-20"
        max="2021-08-30"
        name="endDate"
        required
      />
     </div>
    <button className='add-trip-button' onClick={this.addToTrips}> Add {this.props.siteData.fullName}</button>
    </form>
   </section>
  );
 }
}

export default ItineraryForm