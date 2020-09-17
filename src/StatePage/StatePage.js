import React from 'react'
import './StatePage.scss'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'


const StatePage = () => {
  const parks = [
    { name: 'Black Canyon of the Gunnison National Park', town: 'Montrose', state: 'Colorado' }, 
    { name: 'Great Sand Dunes National Park', town: 'Westcliff', state: 'Colorado' },
    { name: 'Mesa Verde National Park', town: 'Durango', state: 'Colorado' },
    { name: 'Rocky Mountain National Park', town: 'Estes Park', state: 'Colorado' }
  ]

  const jsxParks = parks.map(park => {
    return <Link to={`/${park.state}/${park.name}`} className='park'>
      <h3>{park.name}</h3>
      <p>{park.town}</p>
    </Link>
  })

  // const nonParks = 


  return(
    <section className={'state-section utah'}>
      <Header />
      <section className='state-info'>
        <h2 className='state-header'>Colorado</h2>
        <h2>National Parks</h2>
          <article className='national-parks'>
            {jsxParks}
          </article>
        <h2>Areas of Interest</h2>
          <article className='non-np'>
            <Link to={`/Colorado/BlueReservoir`} className='rec-area'>
              <h4>Blue Reservoir</h4>
              <p>Gunnison</p>
            </Link>
          <Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h4>Blue Reservoir</h4>
            <p>Gunnison</p>
          </Link>
          </article>
      </section>
    </section>
  )
} 

export default StatePage