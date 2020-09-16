import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
   <header>
    <h1>Along the Rocky Road</h1>
    <nav>
     <Link to="/" className="nav-btns">
      Take A Drive
     </Link>
     <Link to="/" className="nav-btns">
      Search
     </Link>
     <Link to="/about" className="nav-btns">
      About
     </Link>
    </nav>
   </header>
  );


}

export default Header