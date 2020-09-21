import React from 'react'
import './Landing.scss'
import Header from '../Header/Header'
import PropTypes from 'prop-types'


const Landing = ({searchSites}) => {
  return (
   <section className="landing">
    <Header searchSites={searchSites} />
   </section>
  )
}

export default Landing

Landing.propTypes = {
 searchSites: PropTypes.func
};