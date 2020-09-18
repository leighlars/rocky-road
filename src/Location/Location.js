import React from 'react'
import './Location.scss'
import Header from '../Header/Header'

const Location = ({getCurrentPage, allStatesInfo}) => {

  const stateName = getCurrentPage().split('/')[2].split('-').join(' ')
  const backgroundImage = stateName.split(' ').join('-').toLowerCase()

  

  return (
   <section className={`location-section ${(backgroundImage)}`}>
    <Header />
    <section className="location-info">
     <h2 className="state-header">{stateName}</h2>
    </section>
   </section>
  );

}
export default Location