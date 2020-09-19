import React from 'react'
import Header from '../Header/Header'
import './About.scss'
import PropTypes from 'prop-types'

const About = (props) => {
  return (
   <section className="about-section">
    <Header
     getCurrentPage={props.getCurrentPage}
     searchSites={props.searchSites}
    />
    <section className="about-boxes">
     <article className="about-box">
      <h2>Places</h2>
      <p>
       Colorado, Idaho, Wyoming, & Montana. <br /> <br />
       We track National Parks, Monuments, <br />
       Sites and Preserves in the <br />
       Rocky Mountain Range.
      </p>
     </article>
     <article className="about-box">
      <h2>Activities</h2>
      <p>
       Browse pictures, search parks, <br />
       and find information about <br />
       your favorite spot within <br />
       the beautiful Rockies. <br />
      </p>
     </article>
     <article className="about-box">
      <h2>Information</h2>
      <p>
       Up to date national park and monument information is sourced from the
      </p>
      <a href="ridb.recreation.gov" target="_blank" rel="noopener noreferrer">
       US Recreation API
      </a>
      <p>
       <br />
       <a
        href="https://github.com/leighlars"
        target="_blank"
        rel="noopener noreferrer"
       >
        Contact the developer
       </a>
       for any concerns regarding the site.
      </p>
     </article>
    </section>
   </section>
  );

}

export default About
About.propTypes = {
 getCurrentPage: PropTypes.func,
 searchSites: PropTypes.func
};