import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchForm from '../SearchForm/SearchForm'


const Header = ({getCurrentPage, searchSites}) => {
  const stateName = getCurrentPage().split("/")[2];
  return (
   <header>
    <h1>Along the Rocky Road</h1>
    <nav>
     <Link to="/gallery" className="nav-btns gallery-link">
      Gallery
     </Link>
     <Link to="/about" className="nav-btns about-link">
      About
     </Link>
     <Link to="/home" className="nav-btns home-link">
      Home
     </Link>
     <Link to={`/place/${stateName}`} className="nav-btns state-link">
      Back
     </Link>
    </nav>
    <SearchForm searchSites={searchSites} />
   </header>
  )
}

export default Header

Header.propTypes = {
 getCurrentPage: PropTypes.func,
 searchSites: PropTypes.func
};