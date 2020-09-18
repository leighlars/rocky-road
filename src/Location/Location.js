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
  
  const weather = 
        <div className="info-box">
          <h3>Weather</h3>
          <span><b>Weather:</b><br/>
          {siteData.weather}
          </span>
        </div>
    

  const driving = 
      <div className='info-box'>
        <h3>Directions</h3>
        <span className='city-state'>{siteData.town}, {siteData.state}</span>
        <span><b>Directions:</b><br/>
        {siteData.directions}<br/>
        For specific directions, go <a href={siteData.directionsPage}>here.</a>
        </span>
      </div>


  const jsxActivities = () => {
    if (siteData.fullName === locationName) {
      const sortedActivities = siteData.activities.sort()
      const jsxInfo = sortedActivities.map(activity => {
        return <p>{activity.name}</p>
      })
      return(
        <div className='info-box'>
          <h3>Activities</h3>
          {jsxInfo}
        </div>
      )
    }
    }


  const jsxFees = () => {
    if (siteData.fullName === locationName) {
      console.log(siteData.entranceFees)
      const jsxInfo = siteData.entranceFees.map(type => {
        return(
           <div className='fees'>
            <span className='fee' key={type.title}><b>Title:</b> {type.title}</span> <br/>
            <span className='fee' key={type.description}><b>Description:</b> {type.description}</span> <br/>
            <span className='fee' key={type.cost}><b>Cost:</b> ${Number(type.cost).toFixed(0)}</span>
        </div>
      )})

      return(
        <div className='info-box'>
          <h3>Entrance</h3>
          {jsxInfo}
        </div>
      )
    }

  }


  const operations =
     <div className="info-box">
        <h3>Operations</h3>
        <span>{siteData.operationDesc}</span>
        <span><b>Additional notes:</b><br/> 
          {siteData.operationDesc}</span>
     </div>;
  

  
  
  return (
    <section className={"location-section"}>
      <Header />
     <h2 className="location-header">{locationName}</h2>
     <span className='location-description'>{siteData.description}</span>
      <section className="location-info">
        {weather}
        {driving}
        {jsxFees()}
        {operations}
        {jsxActivities()}
      </section>
   </section>
  );

}
export default Location