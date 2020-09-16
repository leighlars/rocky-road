import React from 'react'
import Header from '../Header/Header'
import './About.scss'

const About = () => {
  return (
   <section className="about">
    <Header />
    <section className="about-boxes">
     <article class="about-box">
      <h2>Places</h2>
      <p>
       Colorado, Idaho, Wyoming, <br />
       New Mexico, Utah, & Montana. <br /> 
       Anywhere the American Rockies go, <br />
       <b>we go.</b>
      </p>
     </article>
     <article class="about-box">
      <h2>Information</h2>
      <p>Data is sourced from the</p>
      <a href="ridb.recreation.gov" target="_blank" rel="noopener noreferrer">
       US Recreation API
      </a>
      <p>View up to date national park and monument information.</p>
     </article>
    </section>
   </section>
  );




}

export default About