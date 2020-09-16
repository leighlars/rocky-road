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
      <h2>Activities</h2>
      <p>
       Browse pictures, check weather, <br />
       search parks, or add parks to your itinerary. 
      </p>
     </article>
     <article class="about-box">
      <h2>Information</h2>
      <p>Up to date national park and monument information is sourced from the</p>
      <a href="ridb.recreation.gov" target="_blank" rel="noopener noreferrer">
       US Recreation API
      </a>
      <p>
      <br /> 
       <a href="ridb.recreation.gov" target="_blank" rel="noopener noreferrer">
        Contact the developer</a> for any concerns regarding the site.
      </p>
     </article>
    </section>
   </section>
  );




}

export default About