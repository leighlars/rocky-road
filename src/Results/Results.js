import React from 'react'
import './Results.scss'
import Header from '../Header/Header'
import PropTypes from 'prop-types'

const Results = ({getCurrentPage, searchSites}) => {
  
  // const queryResults = () => {
  //   if (results.length > 0) {
  //     return results.map(result => {
  //       return(
  //         <div className='result'>
  //          <h2>{result.fullName}</h2>
  //           <p>{result.town}, {result.state}</p>
  //       </div>)
  //      })
  //   } else {
  //     return(<h2>No result found. Please modify your search and try again.</h2>) 
  //   }
  // }  


  return(
    <section className='search-section'>
      <Header getCurrentPage={getCurrentPage} searchSites={searchSites} />
      <section className='results-section'>
        {/* {results()} */}
      </section>
    </section>
  )
}

export default Results

Results.propTypes = {
  getCurrentPage: PropTypes.func,
  searchSites: PropTypes.func
} 