import React from 'react'
import './StatePage.scss'
import Header from '../Header/Header'
import {Link, useHistory} from 'react-router-dom'
import PropTypes from "prop-types";


const StatePage = ({allStatesInfo, searchSites}) => {

  const stateName = useHistory().location.pathname.split("/")[2];
 
  const getStateSites = () => {
    const currentPage = stateName
    const allStates = allStatesInfo
    let stateSites = allStates.find(state => {
      return state.state === currentPage 
    })
    if (stateSites !== undefined) {
      stateSites = stateSites.info
    }
    else {
      stateSites = {}
    }
    return stateSites
  }

 
  const jsxSites = () => {
    const sites = getStateSites()
    const allSites = {natParks: [], recAreas: []}
    if (sites.natParks && sites.natParks.length > 0) {
      allSites.natParks = sites.natParks.map(park => {
        const location = park.fullName.split(" ").join("-"); 
        return (
          <Link to={`/place/${stateName}/${location}`} className="park" key={`${park.name}`}>
            <h3>{park.fullName}</h3>
            <p>{park.town}</p>
          </Link>
          )
        })
    } else {
      allSites.natParks = [
        <div className="park-nf" key="not-found">
         <h3>No National Parks found</h3>
        </div>
       ]
    }
    if (sites.recAreas && sites.recAreas.length > 0) {
      allSites.recAreas = sites.recAreas.map(area => {
      const location = area.fullName.split(" ").join("-"); 
        return (
        <Link to={`/place/${stateName}/${location}`} className="rec-area" key={`${area.name}`}>
          <h4>{area.fullName}</h4>
          <p>{area.town}</p>
        </Link>
        )
      }) 
    } else {
      allSites.recAreas = [
        <div className="rec-nf" key="not-found">
         <h3>No Recreation Areas found</h3>
        </div>
       ]
      };
     
    return allSites    
  }


  const sites = jsxSites()
  const natParks = sites.natParks
  const recAreas = sites.recAreas


  return (
   <section className={`state-section ${stateName.toLowerCase()}`}>
    <Header searchSites={searchSites} />
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