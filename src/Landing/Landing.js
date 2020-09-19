import React from 'react'
import './Landing.scss'
import Header from '../Header/Header'
import PropTypes from 'prop-types'


const Landing = ({getCurrentPage, searchSites}) => {
  return (
   <section className="landing">
    <Header getCurrentPage={getCurrentPage} searchSites={searchSites} />
   </section>
  )
}

export default Landing

Landing.propTypes = {
 getCurrentPage: PropTypes.func,
 searchSites: PropTypes.func
};