import React from 'react'
import './Location.scss'
import Header from '../Header/Header'
// import InfoxBox from '../InfoBox/Infobox'

const Location = ({getCurrentPage, allStatesInfo}) => {

  let locationName = getCurrentPage().split('/')[2].split('-').join(' ')
  
  const setBackgroundImage = () => {
    if (locationName === "Great Sand Dunes National Park & Preserve") {
     locationName = "Great Sand Dunes National Park And Preserve";
    } 
    const backgroundImage = locationName.split(' ').join('-').toLowerCase()
    return backgroundImage
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
          return site.fullName === getLocationName()
        })
      }
      return location
    }, {})
    return siteInfo
  }
  
  const siteData = getSiteInfo()
  
  const jsxWeather = () => {
    return (
        <div className="info-box">
          <h3>Weather</h3>
          <span><b>Weather:</b><br/>
          {siteData.weather}
          </span>
          <span><b>Additional notes:</b><br/> 
          {siteData.operationDesc}</span>
        </div>
    );
  }

  const jsxDriving = () => {
    return(
      <div className='info-box'>
        <h3>Directions</h3>
        <span>{siteData.town}, {siteData.state}</span>
        <span><b>Directions:</b><br/>
        {siteData.directions}<br/>
        For specific directions, go <a href={siteData.directionsPage}>here.</a>
        </span>
      </div>
    )
  }
  
  const jsxFees = () => {
    // console.log(siteData)
    // const jsxInfo = siteData.entranceFees.map(type => {
    //   return(
    //      <div className='fees'>
    //       <span className='fee'><b>Title:</b> ${type.title}</span>
    //       <span className='fee'><b>Description:</b> {type.description}</span>
    //       <span className='fee'><b>Cost:</b>${type.cost.toFixed(2)}</span>
    //   </div>
    // )})
   
    return(
      <div className='info-box'>
        <h3>Entrance</h3>
        {/* {jsxInfo} */}
      </div>
    )
  }

  
  
  return (
    <section className={`location-section ${setBackgroundImage()}`}>
      <Header />
     <h2 className="location-header">{locationName}</h2>
     <span class='location-description'>{siteData.description}</span>
      <section className="location-info">
        {jsxWeather()}
        {jsxDriving()}
        {jsxFees()}
      </section>
   </section>
  );

}
export default Location