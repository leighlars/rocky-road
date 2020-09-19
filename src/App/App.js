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

class App extends Component {
  constructor() {
    super()
    this.state = {
      allStatesInfo: [],
      error: "",
    }
  }

  componentDidMount = async () => {
    try {
      const allData = await getCleanStatesInfo();
      this.setState({allStatesInfo: allData})
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
    // let searchableQuery = query.toLowerCase()
    const allPlaces = this.state.allStatesInfo.reduce((allNames, state) => {
      console.log(state)
      if (!allNames.includes(state.state)) {
        allNames.push(allNames)
      }
      state.forEach(site => {
        if (!allNames.includes(site.fullName)) {
          allNames.push(site.fullName)
        }
      })
      return allNames
    }, [])
    console.log(allPlaces)
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
          />
         );
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
