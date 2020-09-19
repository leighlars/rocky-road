import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom'
import './App.scss';
import About from '../About/About'
import Landing from '../Landing/Landing'
import Home from '../Home/Home'
import StatePage from '../StatePage/StatePage'
import {getCleanStatesInfo} from '../apiCalls/dataCleaner'
import Results from '../Results/Results'
import Location from '../Location/Location'

class App extends Component {
  constructor() {
    super()
    this.state = {
     parks: [],
     error: "",
     favorites: [],
     allStatesInfo: [], 
     favorites: []
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
    console.log('made it to app')
    let searchableQuery = query.toLowerCase()
    const allPlaces = this.state.allStatesInfo.reduce((allNames, state) => {
      if (!allNames.includes(state.name)) {
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
         return <Landing getCurrentPage={this.getCurrentPage} searchSites={this.searchSites} />;
        }}
       />
       <Route
        exact
        path="/home"
        render={() => {
         return (
          <Home getCurrentPage={this.getCurrentPage} searchSites={this.searchSites} />
         );
        }}
       />
       <Route
        exact
        path="/about"
        render={() => {
         return (
          <About getCurrentPage={this.getCurrentPage} searchSites={this.searchSites} />
         );
        }}
       />
       <Route 
       exact path ='/place/:state'
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
           allStatesInfo={this.state.allStatesInfo}
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
