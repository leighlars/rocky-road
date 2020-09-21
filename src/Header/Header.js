import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchForm from '../SearchForm/SearchForm'


const Header = ({searchSites}) => {
  return (
   <header>
    <h1>Along the Rocky Road</h1>
    <nav>
     <Link to="/gallery" className="nav-btns gallery-link">
      Gallery
     </Link>
     <Link to="/saved-trips" className="nav-btns saved-link">
      Saved Trips
     </Link>
     <Link to="/about" className="nav-btns about-link">
      About
     </Link>
     <Link to="/home" className="nav-btns home-link">
      Home
     </Link>
    </nav>
    <SearchForm searchSites={searchSites} />
   </header>
  );
}

export default Header

Header.propTypes = {
 searchSites: PropTypes.func
};