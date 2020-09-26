import React, { useEffect, useState } from 'react';
import {Route, useHistory, withRouter} from 'react-router-dom'
import {getCleanStatesInfo} from '../apiCalls/dataCleaner'
import './App.scss';
import About from '../About/About'
import Landing from '../Landing/Landing'
import Home from '../Home/Home'
import StatePage from '../StatePage/StatePage'
import Location from '../Location/Location'
import Results from '../Results/Results'
import Gallery from '../Gallery/Gallery'
import SavedTrips from '../SavedTrips/SavedTrips'

const App = () => {
  const [allStatesInfo, setAllStatesInfo] =  useState([])
  const [error, setError] = useState('')
  const [results, setResults] = useState([])
  const [itineraries, setItineraries] = useState([])

  const getData = async () => {
    try {
      const allData = await getCleanStatesInfo();
      let trips = JSON.parse(localStorage.getItem('savedTrips'))
      if (trips === null) {
        trips = []
      }
      setItineraries(trips)
      setAllStatesInfo(allData)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const searchSites = (query) => {
    const q = query.toLowerCase()
    const allSites = allStatesInfo.reduce((sites, state) => {
        const allSites = state.info.natParks.concat(state.info.recAreas)
        allSites.forEach(site => {
          sites.push(site)
        })
        return sites
    }, []) 
    const foundSites = allSites.filter(site => {
      const siteName = site.fullName.toLowerCase()
      const siteState = site.state.toLowerCase()
      const siteTown = site.town.toLowerCase()
      return siteName.includes(q) || site.description.includes(q) || siteState.includes(q) || siteTown.includes(q)
    })
    setResults(foundSites)
  }

  const addNewTrip = (formInput, sitePicked, siteState) => {
    const newTrip = {
      name: formInput.tripName, 
      startDate: formInput.startDate, 
      endDate: formInput.endDate, 
      comment: formInput.comment,
      places: [{siteName: sitePicked, siteState: siteState}],
    }
    const itinerariesCopy = itineraries
    itinerariesCopy.push(newTrip)
    setItineraries(itinerariesCopy)
    localStorage.setItem('savedTrips', JSON.stringify(itineraries))
  }

  const addToExistingTrip = (siteName, siteState, tripName) => {
    const itinerariesCopy = itineraries;
    const site = {siteName: siteName, siteState: siteState}
    const foundExistingTrip = itinerariesCopy.find(trip => {
      return trip.name === tripName
    })
    if (!foundExistingTrip.places.includes(siteName)) {
      foundExistingTrip.places.push(site)
    }
    localStorage.setItem("savedTrips", JSON.stringify(itinerariesCopy));
    setItineraries(itinerariesCopy)
  }


    return (
     <div className="App">
      <main>
       <Route
        exact
        path="/"
        render={() => {
         return (
          <Landing
           searchSites={searchSites}
          />
         );
        }}
       />
       <Route
        exact
        path="/home"
        render={() => {
         return (
          <Home
           searchSites={searchSites}
          />
         );
        }}
       />
       <Route
        exact
        path="/about"
        render={() => {
         return (
          <About
           searchSites={searchSites}
          />
         );
        }}
       />
       <Route
        exact
        path="/place/:state"
        render={() => {
         return (
          <StatePage
           allStatesInfo={allStatesInfo}
           searchSites={searchSites}
          />
         );
        }}
       />
       <Route
        exact
        path="/place/:state/:location"
        render={() => {
         return (
          <Location
           allStatesInfo={allStatesInfo}
           searchSites={searchSites}
           itineraries={itineraries}
           addNewTrip={addNewTrip}
           addToExistingTrip={addToExistingTrip}
          />
         );
        }}
       />
       <Route
        exact
        path="/results"
        render={() => {
         return (
          <Results
           searchSites={searchSites}
           results={results}
          />
         );
        }}
       />
       <Route 
       exact path='/saved-trips'
       render={() => {
         return(
           <SavedTrips 
           searchSites={searchSites}
           itineraries={itineraries} />
         )
       }}
       />
       <Route
        exact
        path="/gallery"
        render={() => {
         return (
          <Gallery
           searchSites={searchSites}
          />
         );
        }}
       />
      </main>
     </div>
    );
  }


export default withRouter(App);
