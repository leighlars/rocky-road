import React, {Component} from 'react'
import './AddButton.scss'
import ItineraryForm from '../ItineraryForm/ItineraryForm'
import PropTypes from 'prop-types'

class AddButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  showModal = () => {
    this.setState({showModal: !this.state.showModal})
  }

  render() {
    return(
      <span className='itinerary-box'>
        <button className='add-button' onClick={this.showModal}>
          Add To Trips
        </button>
        {this.state.showModal === true &&
          <ItineraryForm 
          itineraries={this.props.itineraries} 
          siteData={this.props.siteData} 
          addNewTrip={this.props.addNewTrip} 
          addToExistingTrip={this.props.addToExistingTrip} />
        }
      </span>
    )
  }

}

export default AddButton

AddButton.propTypes = {
  itineraries: PropTypes.array,
  siteData: PropTypes.object,
  addToExistingTrip: PropTypes.func,
  addNewTrip: PropTypes.func
}