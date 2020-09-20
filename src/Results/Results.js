import React from 'react'
import './Results.scss'
import Header from '../Header/Header'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Results = ({results, searchSites}) => {
  
  const queryResults = () => {
    if (results.length > 0) {
      return results.map(result => {
        return(
          <Link to={`/place/${result.state}/${result.fullName}`} className='result'>
           <h2 className='result-name'>{result.fullName}</h2>
            <p className='result-town'>{result.town}, {result.state}</p>
        </Link>)
       })
    } else {
      return(<h2 className='no-results'>No results found. Please modify your search and try again.</h2>) 
    }
  }  


  return(
    <section className='search-section'>
      <Header searchSites={searchSites} />
      <section className='results-section'>
        {queryResults()}
      </section>
    </section>
  )
}

export default Results

Results.propTypes = {
  getCurrentPage: PropTypes.func,
  results: PropTypes.array,
  searchSites: PropTypes.func
} 