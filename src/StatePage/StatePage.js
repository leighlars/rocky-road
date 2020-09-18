import React from 'react'
import './StatePage.scss'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'


const StatePage = ({allStatesInfo, getCurrentPage}) => {

  const getFullStateName = (stateAbbrev) => {
    if (stateAbbrev === "CO") {
     return "Colorado";
    } else if (stateAbbrev === "Idaho") {
     return "Idaho";
    } else if (stateAbbrev === "MT") {
     return "Montana";
    } else if (stateAbbrev === "WY") {
     return "Wyoming";
    }
  }

  const getLocationName = (locationName) => {
    const removeSpaces = locationName.split(' ').join('-') 
    return removeSpaces
  }

  
  const getAllStateSites = () => {
    const currentPage = getCurrentPage().split('/')[1]
    const stateSites = allStatesInfo.filter(state => {
      return state.state === currentPage 
    })
    const sites = stateSites.map(site => {
      return site.info
    })
    return sites
  }
  
  const organizeStateSiteTypes = () => {
    const stateSites = getAllStateSites()
    const sites = {natParks: [], recAreas: []}
    if (stateSites.length > 0) {
      const uniqueSites = Array.from(new Set(stateSites[0].map(site => site.fullName))).map(fullName =>{
        return stateSites[0].find(site => site.fullName === fullName)
      })
      sites.natParks = uniqueSites.filter(site => {
        return site.designation.includes('National Park')
      })
      sites.recAreas = uniqueSites.filter((site) => {
       return !site.designation.includes("National Park")
      })
    } 
    return sites
  }
  

  const jsxSites = () => {
    const sites = organizeStateSiteTypes()
      sites.natParks = sites.natParks.map(park => {
        const state = getFullStateName(park.state);
        const location = getLocationName(park.fullName)
        return (
          <Link to={`/${state}/${location}`} className="park" key={`${park.name}`}>
           <h3>{park.fullName}</h3>
           <p>{park.town}</p>
          </Link>
         )
        })
      if (sites.natParks.length === 0) {
        sites.natParks = [<div className='park-nf' key='not-found'><h3>No National Parks found</h3></div>]
      }
      sites.recAreas = sites.recAreas.map(area => {
        const stateName = getFullStateName(area.state)
         return (
          <Link to={`/${stateName}/${area.name}`} className="rec-area" key={`${area.name}`}>
           <h4>{area.fullName}</h4>
           <p>{area.town}</p>
          </Link>
         )
      })
      if (sites.recAreas.length === 0) {
        sites.recAreas = [<div className='rec-nf' key='not-found'><h3>No Recreation Areas found</h3></div>]
      }
      return sites
  }

 const stateName = getCurrentPage().split("/")[1]
 const sites = jsxSites()
 const natParks = sites.natParks
 const recAreas = sites.recAreas


  return (
    <section className={`state-section ${(stateName).toLowerCase()}`}>
      <Header />
      <section className="state-info">
        <h2 className="state-header">{stateName}</h2>
        <h2>National Parks</h2>
      <article className="national-parks">
        {natParks}
        </article>
      <h2>Areas of Interest</h2>
      <article className="non-np">
        {recAreas}
        </article>
      </section>
    </section>
  )
} 

export default StatePage