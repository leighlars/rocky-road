import React from 'react'
import './Results.scss'
import Header from '../Header/Header'
import PropTypes from 'prop-types'

const SearchPage = ({getCurrentPage, searchSites}) => {
  return(
    <section className='search-section'>
      <Header getCurrentPage={getCurrentPage} searchSites={searchSites} />
    </section>
  )
}

export default SearchPage

SearchPage.propTypes = {
  getCurrentPage: PropTypes.func
} 