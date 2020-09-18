import React from 'react'
import './StatePage.scss'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'


const StatePage = ({allStatesInfo, getCurrentPage}) => {
  
  let stateName = ''

  const getAllStateSites = () => {
    const currentPage = getCurrentPage().split('/')[1]
    stateName = currentPage
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
      // let uniqueSites = [];
      // stateSites.forEach((site) => {
      //  site.forEach(place => {
      //    if (!uniqueSites.includes(place.fullName)) {
      //      uniqueSites.push(place)
      //    }
      //  });
      // });
      // console.log(uniqueSites) not working
      sites.natParks = stateSites[0].filter(site => {
        return site.designation === 'National Park'
      })
      sites.recAreas = stateSites[0].filter((site) => {
       return site.designation !== "National Park"
      })
    } 
    return sites
  }
  

  const jsxSites = () => {
    const sites = organizeStateSiteTypes()
    if (sites) {
      sites.natParks = sites.natParks.map(park => {
        return (
          <Link to={`/${getCurrentPage()}/${park.name}`} className="park" key={`${park.name}`}>
           <h3>{park.fullName}</h3>
           <p>{park.town}</p>
          </Link>
         )
        })
      if (sites.natParks.length === 0) {
        sites.natParks = [<div className='park-nf' key='not-found'><h3>No National Parks found</h3></div>]
      }
      sites.recAreas = sites.recAreas.map(area => {
         return (
          <Link to={`/${getCurrentPage()}/${area.name}`} className="rec-area" key={`${area.name}`}>
           <h4>{area.fullName}</h4>
           <p>{area.town}</p>
          </Link>
         )
      })
      if (sites.recAreas.length === 0) {
        sites.recAreas = [<div className='park-nf' key='not-found'><h3>No Recreation Areas found</h3></div>]
      }
      return sites
    }

  }

//  const stateName = getCurrentPage().split("/")[1]
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