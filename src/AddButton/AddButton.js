import React, {Component} from 'react'
import './AddButton.scss'
import add from '../assets/add.png'
import ItineraryForm from '../ItineraryForm/ItineraryForm'

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
          <ItineraryForm itineraries={this.props.itineraries} siteData={this.props.siteData} />
        }
      </span>
    )
  }

}

export default AddButton