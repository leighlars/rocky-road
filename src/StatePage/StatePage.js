import React from 'react'
import './StatePage.scss'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";


const StatePage = ({allStatesInfo, getCurrentPage, searchSites}) => {

  const getLocationName = (locationName) => {
    const removeSpaces = locationName.split(' ').join('-') 
    return removeSpaces
  }
  
  const getStateSites = () => {
    const currentPage = getCurrentPage().split('/')[2]
    const stateSites = allStatesInfo.find(state => {
      return state.state === currentPage 
    })
    if (stateSites) {
      return stateSites.info
    } else {
      return {natParks: [], recAreas: []}
    }
  }
 

  const jsxSites = () => {
      const sites = getStateSites()
      console.log(sites)
        sites.natParks = sites.natParks.map(park => {
          const state = park.state
          const location = getLocationName(park.fullName)
          return (
            <Link to={`/place/${state}/${location}`} className="park" key={`${park.name}`}>
             <h3>{park.fullName}</h3>
             <p>{park.town}</p>
            </Link>
           )
          })
        if (sites.natParks.length === 0) {
          sites.natParks = [<div className='park-nf' key='not-found'><h3>No National Parks found</h3></div>]
        }
        sites.recAreas = sites.recAreas.map(area => {
          const stateName = area.state
          const location = getLocationName(area.fullName)
           return (
            <Link to={`/place/${stateName}/${location}`} className="rec-area" key={`${area.name}`}>
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

  const stateName = getCurrentPage().split("/")[2]
  const sites = jsxSites()
  const natParks = sites.natParks
  const recAreas = sites.recAreas


  return (
   <section className={`state-section ${stateName.toLowerCase()}`}>
    <Header getCurrentPage={getCurrentPage} searchSites={searchSites} />
    <section className="state-info">
     <h2 className="state-header">{stateName}</h2>
     <h2>National Parks</h2>
     <article className="national-parks">{natParks}</article>
     <h2>Areas of Interest</h2>
     <article className="non-np">{recAreas}</article>
    </section>
   </section>
  );
} 

export default StatePage

StatePage.propTypes = {
 allStatesInfo: PropTypes.array,
 getCurrentPage: PropTypes.func,
};