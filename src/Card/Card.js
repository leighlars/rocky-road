import React from 'react'
import './Card.scss'

const Card = ({name, town, designation}) => {
  const cardType = () => {
    if (designation.includes('National Park')) {
      return 'park'
    } else {
      return 'non-np'
    }
  }

  return(
    <div className={`${cardType()}`}>
      <h2 className='name'>{name}</h2>
      <p className='town'>{town}</p>
    </div>
  )
}

export default Card