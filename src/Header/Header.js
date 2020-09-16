import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
   <header>
    <span className="logo">
     <h1>Along the Rocky Road</h1>
    </span>
    <nav>
     <Link to="/">Home</Link>
     <Link to="/">About</Link>
    </nav>
   </header>
  );


}

export default Header