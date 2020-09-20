import React from 'react'
import {Link} from 'react-router-dom'
import './Card.scss'

const Card = ({name, town, state, designation}) => {
  const cardType = () => {
    if (designation.includes('National Park')) {
      return 'park'
    } else if (name.includes ) {
      return 'non-np'
    }
  }

  return(
    <Link to={`/place/${state}/${name}`} key={name} className={`${cardType()}`}>
      <h2 className='name'>{name}</h2>
      <p className='town'>{town}</p>
    </Link>
  )
}

export default Card