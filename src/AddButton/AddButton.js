import React, {Component} from 'react'
import './AddButton.scss'
import add from '../assets/add.png'

class AddButton extends Component {
  constructor() {
    super()
    this.state = {
      currentValue: undefined
    }
  }


  render() {
    return(
      <button className='add-button'>
        <img src={add} alt='heart icon' className='add-icon'/>
      </button>
    )
  }

}

export default AddButton