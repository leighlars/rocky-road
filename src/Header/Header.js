import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const Header = ({getCurrentPage}) => {
  const stateName = getCurrentPage().split("/")[1];
  return (
   <header>
    <h1>Along the Rocky Road</h1>
    <nav>
     <Link to="/search" className="nav-btns search-link">
      Search
     </Link>
     <Link to="/about" className="nav-btns about-link">
      About
     </Link>
     <Link to="/home" className="nav-btns home-link">
      Take A Drive
     </Link>
     <Link to={`/${stateName}`} className="nav-btns state-link">
      Back
     </Link>
    </nav>
   </header>
  )
}

export default Header

Header.propTypes = {
 getCurrentPage: PropTypes.func,
};