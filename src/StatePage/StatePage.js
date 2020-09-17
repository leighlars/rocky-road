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
      <h2>{park.name}</h2>
      <p>{park.town}</p>
    </Link>
  })

  // const nonParks = 


  return(
    <section className={'state-section colorado'}>
      <Header />
      <section className='state-info'>
          <article className='national-parks'>
            {jsxParks}
          </article>
          <article className='non-np'>
            <Link to={`/Colorado/BlueReservoir`} className='rec-area'>
              <h3>Blue Reservoir</h3>
              <p>Gunnison</p>
            </Link>
          <Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link><Link to={`/Colorado/BlueReservoir`} className='rec-area'>
            <h3>Blue Reservoir</h3>
            <p>Gunnison</p>
          </Link>
          </article>
      </section>
    </section>
  )
} 

export default StatePage