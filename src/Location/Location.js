import React, { useState } from 'react'
import './Location.scss'
import Header from '../Header/Header'
import PropTypes from "prop-types";
import ItineraryForm from '../ItineraryForm/ItineraryForm'

const Location = ({getCurrentPage, allStatesInfo, searchSites, itineraries, addNewTrip, addToExistingTrip}) => {
  const [modal, setModalDisplay] = useState(false)

  let locationName = getCurrentPage().split('/')[3].split('-').join(' ')

  const setBackgroundImage = () => {
    if (locationName === 'Great Sand Dunes National Park & Preserve') {
      let title = 'Great Sand Dunes National Park And Preserve'
      return title.split(' ').join('-').toLowerCase()
    }
    if (locationName === "Craters Of The Moon National Monument & Preserve") {
     let title = "Craters Of The Moon National Monument and Preserve";
     return title.split(" ").join("-").toLowerCase();
    }
    return locationName.split(' ').join('-').toLowerCase()
  }

  const getLocationName = () => {
    if (locationName === "Grant Kohrs Ranch National Historic Site") {
      locationName = "Grant-Kohrs Ranch National Historic Site"
    }
    return locationName
  }
  
  const getSiteInfo = () => {
    const stateName = getCurrentPage().split('/')[2]
    const defaultSite = {description: 'No data provided. Please modify your search.'}
    const siteInfo = allStatesInfo.reduce((location, state) => {
      if (state.state === stateName) {
        const allSites = state.info.natParks.concat(state.info.recAreas)
        location = allSites.find(site => {
          return site.fullName === getLocationName()
        })
      }
      return location
    }, {})
    return siteInfo || defaultSite
  }

  const siteData = getSiteInfo()

  const toggleModal = () => {
    setModalDisplay(!modal)
  }

  const jsxAddButton = () => {
    return (
      <span className='itinerary-box'>
        <button className='add-button' onClick={toggleModal}>
          Add To Trips
      </button>
      {modal === true &&
          <ItineraryForm
            itineraries={itineraries}
            siteName={siteData.fullName}
            siteState={siteData.state}
            addNewTrip={addNewTrip}
            addToExistingTrip={addToExistingTrip} />
        }
      </span>
    )
  }

  const description = () => {
    if (siteData.description) {
      return (
       <span className="location-description">{siteData.description}</span>
      )
    }
    else {
      return (
       <span className="location-description">No data provided. Check back soon!</span>
      );
    }
  }
  
  const images = () => {
    if (siteData.images && siteData.images.length > 0) {
      const imageList = siteData.images.map(image => {
        return <img src={image.url} alt={image.altText} className='site-image' key={image.altText}/>
      })
      return(
        <span className='images'>
          {imageList}
        </span>
      )
    }
  }

  const weather = () => {
    if (siteData.weather) {
        return (<div className="info-box">
          <h3>Weather</h3>
          <span>
          {siteData.weather}
          </span>
        </div>)
    }
  }


  const jsxActivities = () => {
    if (siteData.activities && siteData.activities.length > 0) {

      const sortedActivities = siteData.activities.sort();
      const jsxInfo = sortedActivities.map((activity) => {
       return <p key={activity}>{activity}</p>;
      });
      return (
       <div className="info-box">
        <h3>Activities</h3>
        <span className="info">
         For information about camping and tours, go{" "}
         <a href={siteData.url} target="_blank" rel="noopener noreferrer">
          here
         </a>
         .
        </span>
        <span className="activities">{jsxInfo}</span>
       </div>
      );
    }
  }

  const jsxFees = () => {
    if (siteData.entranceFees) {
      let jsxInfo = siteData.entranceFees.map((type) => {
       return (
        <div className="fees" key={type.title}>
         <span className="fee" key={type.title}>
          <b>Title:</b> {type.title}
         </span>{" "}
         <br />
         <span className="fee" key={type.description}>
          <b>Description:</b> {type.description}
         </span>{" "}
         <br />
         <span className="fee" key={type.cost}>
          <b>Cost:</b> ${Number(type.cost).toFixed(0)}
         </span>
        </div>
       );
      });
      if (jsxInfo.length === 0) {
       jsxInfo = <span className="fee">No data provided</span>;
      }
      return (
       <div className="info-box">
        <h3>Entrance</h3>
        {jsxInfo}
       </div>
      );
    }
  }


  const operations = () => {
      const findHours = siteData.designation.includes("National Park") ? (
       <p>24 hours / 7 days</p>
      ) : (
       <span>
        <p>For complete hours, go</p>
        <a href={siteData.url} target="_blank" rel="noopener noreferrer">
         here
        </a>
        .
       </span>
      );

      return (
       <div className="info-box">
        <h3>Operations & Directions</h3>
        <span>
         <b>Hours:</b> {findHours}
        </span>
        <span>
         <b>Additional notes:</b>
         <br />
         {siteData.operationDesc}
        </span>
        <h3>Directions</h3>
        <span className="city-state">
         {siteData.town}, {siteData.state}
        </span>
        <span>
         <b>Directions:</b>
         <br />
         {siteData.directions}
         <br />
         For specific directions, go 
         <a
          href={siteData.directionsPage}
          target="_blank"
          rel="noopener noreferrer"
         >
          here
         </a>
         .
        </span>
       </div>
      );
  }

  return (
   <section className={`location-section ${setBackgroundImage()}`}>
    <Header searchSites={searchSites} />
        <span className='location-header'>
          <h2 className="location-name">{getLocationName()}</h2>
          {jsxAddButton()}
        </span>
          {description()}
    {siteData && siteData.fullName && (
      <> 
          {images()}
        <section className="location-info">
          {jsxActivities()}
          {weather()}
          {operations()}
          {jsxFees()}
        </section>
      </>)}
   </section>

  );

}
export default Location

Location.propTypes = {
 allStatesInfo: PropTypes.array,
 searchSites: PropTypes.func, 
 getCurrentPage: PropTypes.func,
 itineraries: PropTypes.array,
 addNewTrip: PropTypes.func,
 addToExistingTrip: PropTypes.func
};