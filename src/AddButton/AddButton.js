import React, {Component} from 'react'
import './AddButton.scss'
import add from '../assets/add.png'
import ItineraryForm from '../ItineraryForm/ItineraryForm'

class AddButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: false
    }
  }

  promptItineraryForm = () => {
    console.log('hello')
  }

  render() {
    return(
      <span className='itinerary-modal'>
        <ItineraryForm itineraries={this.props.itineraries} siteData={this.props.siteData} />
        <button className='add-button' onClick={this.toggleItineraryForm}>
          <img src={add} alt='heart icon' className='add-icon'/>
        </button>
      </span>
    )
  }

}

export default AddButton