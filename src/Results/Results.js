import React from 'react'
import './Results.scss'
import Header from '../Header/Header'
import PropTypes from 'prop-types'

const Results = ({getCurrentPage, searchSites}) => {

  
  return(
    <section className='search-section'>
      <Header getCurrentPage={getCurrentPage} searchSites={searchSites} />
      <section className='results-section'>

      </section>
    </section>
  )
}

export default Results

Results.propTypes = {
  getCurrentPage: PropTypes.func,
  searchSites: PropTypes.func
} 