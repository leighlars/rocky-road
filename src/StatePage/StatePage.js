import React from 'react'
import './StatePage.scss'
import Header from '../Header/Header'


const StatePage = () => {

  return(
    <section className={'state-section wyoming'}>
      <Header />
      <section className='state-info'>
          <article className='national-parks'>
            <div className='park'>
              <h2>Black Canyon of the Gunnison National Park</h2>
              <p>Montrose, CO</p>
            </div>
            <div className='park'>
              <h2>Great Sand Dunes National Park</h2>
              <p>Westcliffe, CO</p>
            </div>
            <div className='park'>
              <h2>Mesa Verde National Park</h2>
              <p>Durango, CO</p>
            </div>
            <div className='park'>
              <h2>Rocky Mountain National Park</h2>
              <p>Estes Park, CO</p>
            </div>
          </article>
      </section>
    </section>
  )
} 

export default StatePage