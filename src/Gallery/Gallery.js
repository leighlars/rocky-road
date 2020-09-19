import React from 'react'
import Gallery from 'react-photo-gallery'
import Header from '../Header/Header'
import PropTypes from 'prop-types'
import './Gallery.scss'
import {photos} from './Photos'

const Collage = ({getCurrentPage, searchSites}) => {

  const basicRows = () => <Gallery photos={photos}/>

  return(
    <section className='gallery-section'>
      <Header getCurrentPage={getCurrentPage} searchSites={searchSites} />
      <section className='photos'>
      {basicRows()}
      </section>
    </section>
  )
}

export default Collage

Collage.propTypes = {
  getCurrentPage: PropTypes.func,
  searchSites: PropTypes.func
}

