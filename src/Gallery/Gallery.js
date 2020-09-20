import React from 'react'
import Gallery from 'react-photo-gallery'
import Header from '../Header/Header'
import PropTypes from 'prop-types'
import './Gallery.scss'
import {photos} from './Photos'

const Collage = ({ searchSites}) => {

  const basicRows = () => <Gallery photos={photos}/>

  return (
   <section className="gallery-section">
    <Header  searchSites={searchSites} />
    <section className="photos">
     {basicRows()}
     <span>
      Photos courtesy of 
      <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a>
       and 
       <a href='https://www.nps.gov/index.htm' target="_blank" rel="noopener noreferrer">US National Parks</a>.
     </span>
    </section>
   </section>
  );
}

export default Collage

Collage.propTypes = {
  searchSites: PropTypes.func
}

