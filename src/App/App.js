import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom'
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

class App extends Component {
  constructor() {
    super()
    this.state = {
     allStatesInfo: [],
     error: "",
     results: [],
     itineraries: [
      {
       name: "Girls Trip!",
       startDate: "2020/10/20",
       endDate: "2020/10/30",
       places: [
        {
         fullName: "Rocky Mountain National Park",
         name: "Rocky Mountain",
         town: "Estes Park",
        },
        {
         fullName: "Mesa Verde National Park",
         name: "Mesa Verde",
         town: "Durango",
        },
       ],
      },
     ],
    };
  }

  componentDidMount = async () => {
    try {
      const allData = await getCleanStatesInfo();
      this.setState({allStatesInfo: allData})
      const trips = JSON.parse(localStorage.getItem('savedTrips'))
      this.setState({itineraries: trips})
    } catch (error) {
      this.setState({
        error: "Oops, something went wrong! 🙁 Please try again.",
      })
    }
  }

  getCurrentPage = () => {
    return this.props.history.location.pathname
  } 

  searchSites = (query) => {
    const q = query.toLowerCase()
    const allSites = this.state.allStatesInfo.reduce((sites, state) => {
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
    this.setState({results: foundSites})
  }

  addNewTrip = (formInput, sitePicked) => {
    const newTrip = {
      name: formInput.tripName, 
      startDate: formInput.startDate, 
      endDate: formInput.endDate, 
      places: [sitePicked]}
    const itinerariesCopy = this.state.itineraries
    itinerariesCopy.push(newTrip)
    this.setState({itineraries: itinerariesCopy})
    localStorage.setItem('savedTrips', JSON.stringify(this.state.itineraries))
  }

  addToExistingTrip = (siteData, tripName) => {
    const itinerariesCopy = this.state.itineraries;
    const foundExistingTrip = itinerariesCopy.find(trip => {
      return trip.name === tripName
    })
    if (!foundExistingTrip.places.includes(siteData)) {
      foundExistingTrip.places.push(siteData)
    }
    this.setState({itineraries: itinerariesCopy})
    localStorage.setItem("savedTrips", JSON.stringify(this.state.itineraries));
  }


  render() { 
    return (
     <div className="App">
      <main>
       <Route
        exact
        path="/"
        render={() => {
         return (
          <Landing
           getCurrentPage={this.getCurrentPage}
           searchSites={this.searchSites}
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
           getCurrentPage={this.getCurrentPage}
           searchSites={this.searchSites}
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
           getCurrentPage={this.getCurrentPage}
           searchSites={this.searchSites}
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
           allStatesInfo={this.state.allStatesInfo}
           getCurrentPage={this.getCurrentPage}
           searchSites={this.searchSites}
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
           allStatesInfo={this.state.allStatesInfo}
           getCurrentPage={this.getCurrentPage}
           searchSites={this.searchSites}
           itineraries={this.state.itineraries}
           addNewTrip={this.addNewTrip}
           addToExistingTrip={this.addToExistingTrip}
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
           getCurrentPage={this.getCurrentPage}
           searchSites={this.searchSites}
           results={this.state.results}
          />
         );
        }}
       />
       <Route 
       exact path='/saved-trips'
       render={() => {
         return(
           <SavedTrips itineraries={this.state.itineraries} />
         )
       }}
       />
       <Route
        exact
        path="/gallery"
        render={() => {
         return (
          <Gallery
           getCurrentPage={this.getCurrentPage}
           searchSites={this.searchSites}
          />
         );
        }}
       />
      </main>
     </div>
    );
  }

}

export default withRouter(App);
