import React from 'react'
import './SearchPage.scss'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import PropTypes from 'prop-types'

const SearchPage = ({getCurrentPage}) => {
  return(
    <section className='search-section'>
      <Header getCurrentPage={getCurrentPage}/>
      <SearchForm />
    </section>
  )
}

export default SearchPage

SearchPage.propTypes = {
  getCurrentPage: PropTypes.func
} 