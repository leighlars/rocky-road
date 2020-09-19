import React, {Component} from 'react'
import './FavoriteButton.scss'
import add from '../assets/add.png'
import remove from '../assets/remove.png'

class FavoriteButton extends Component {
  constructor() {
    super()
    this.state = {
      currentValue: undefined
    }
  }

  changeHeart = (e) => {
    e.target.src === add
    ? (e.target.src = remove)
    : (e.target.src = remove);
  }

  render() {
    return(
      <button className='add-button' onClick={this.toggleFavorite}>
        <img src={add} alt='heart icon' id={`${}`}/>
      </button>
    )
  }

}

export default FavoriteButton