import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
   <header>
    <h1>Along the Rocky Road</h1>
    <nav>
     <Link to="/home" className="nav-btns home-link">
      Take A Drive
     </Link>
     <Link to="/" className="nav-btns search-link">
      Search
     </Link>
     <Link to="/about" className="nav-btns about-link">
      About
     </Link>
    </nav>
   </header>
  );


}

export default Header