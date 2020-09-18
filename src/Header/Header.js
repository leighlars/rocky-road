import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'


const Header = ({getCurrentPage}) => {
  const stateName = getCurrentPage().split("/")[1];
  return (
   <header>
    <h1>Along the Rocky Road</h1>
    <nav>
     <Link to="/home" className="nav-btns home-link">
      Take A Drive
     </Link>
     <Link to="/saved" className="nav-btns saved-link">
      Saved
     </Link>
     <Link to="/about" className="nav-btns about-link">
      About
     </Link>
     <Link to={`/${stateName}`} className="nav-btns state-link">
      Back
     </Link>
    </nav>
   </header>
  );


}

export default Header