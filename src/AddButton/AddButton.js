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
    this.setState({showModal: true})
  }

  render() {
    return(
      <span className='itinerary-box'>
        <button className='add-button' onClick={this.showModal}>
          <img src={add} alt='heart icon' className='add-icon'/>
        </button>
        {this.state.showModal === true &&
        <ItineraryForm itineraries={this.props.itineraries} siteData={this.props.siteData} />
        }
      </span>
    )
  }

}

export default AddButton