import React from 'react'
import './Location.scss'
import Header from '../Header/Header'

const Location = ({getCurrentPage, allStatesInfo}) => {

  let locationName = getCurrentPage().split('/')[2].split('-').join(' ')

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
    const stateName = getCurrentPage().split('/')[1]
    const siteInfo= allStatesInfo.reduce((location, state) => {
      if (state.state === stateName) {
        location = state.info.find(site => {
          console.log(site.fullName, getLocationName())
          return site.fullName === getLocationName()
        })
      }
      return location
    }, {})

    return siteInfo
  }

  
  
  const siteData = getSiteInfo()
  console.log(siteData)


  const description = () => {
    if (siteData.description) {
      return (
       <span className="location-description">{siteData.description}</span>
      )
    } else {
      return (
       <span className="location-description missing">No data provided. Check back soon!</span>
      );
    }

  }
  
  const images = () => {
    if (locationName === "Great Sand Dunes National Park And Preserve") {
     locationName = "Great Sand Dunes National Park & Preserve";
    }
    if (siteData.fullName === locationName) {
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
    if (siteData.fullName === locationName ) {
        return (<div className="info-box">
          <h3>Weather</h3>
          <span>
          {siteData.weather}
          </span>
        </div>)
    } 
  }


  const jsxActivities = () => {
    if (siteData.fullName === locationName) {
      const sortedActivities = siteData.activities.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (b.name < a.name) {
            return 1;
        }
        return 0;
      })
      const jsxInfo = sortedActivities.map(activity => {
        return <p key={activity.name}>{activity.name}</p>
      })
      return(
        <div className='info-box'>
          <h3>Activities</h3>
          <span className='activities'>
          {jsxInfo}
          </span>
        </div>
      )
    }
  }

  const jsxFees = () => {
    if (siteData.fullName === locationName) {

      let jsxInfo = siteData.entranceFees.map(type => {
        return(
           <div className='fees'>
            <span className='fee' key={type.title}><b>Title:</b> {type.title}</span> <br/>
            <span className='fee' key={type.description}><b>Description:</b> {type.description}</span> <br/>
            <span className='fee' key={type.cost}><b>Cost:</b> ${Number(type.cost).toFixed(0)}</span>
        </div>
      )})
      if (jsxInfo.length === 0) {
        jsxInfo = <span className='fee'>No data provided</span>
      }
          
      return(
        <div className='info-box'>
          <h3>Entrance</h3>
          {jsxInfo}
        </div>
      )
    }
  }


  const operations = () => {
    if (siteData.fullName === locationName) {
      const findHours = siteData.designation.includes("National Park") ? (
       <p>24 hours / 7 days</p>
      ) : (
       <span>
        <p>For complete hours, go</p>
        <a href={siteData.url} target="_blank" rel="noopener noreferrer">
         here
        </a>
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
          here.
         </a>
        </span>
       </div>
      );
    }
  }

  return (
   <section className={`location-section ${setBackgroundImage()}`}>
    <Header getCurrentPage={getCurrentPage} />
    <h2 className="location-header">{getLocationName()}</h2>
    {description()}
    {images()}
    <section className="location-info">
     {jsxActivities()}
     {weather()}
     {operations()}
     {jsxFees()}
    </section>
   </section>
  );

}
export default Location