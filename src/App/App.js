import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom'
import './App.scss';
import About from '../About/About'
import Landing from '../Landing/Landing'
import Home from '../Home/Home'
import StatePage from '../StatePage/StatePage'
import {getCleanStatesInfo} from '../apiCalls/dataCleaner'
// import Results from '../Results/Results'
import Location from '../Location/Location'

class App extends Component {
  constructor() {
    super()
    this.state = {
     parks: [],
     error: "",
     favorites: [],
     allStatesInfo: []
    };
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

  render() { 
  return (
   <div className="App">
    <main>
     <Route 
        exact path="/"
        render={() => {
          return <Landing />
        }}
        />
        <Route 
        exact path="/home"
        render={() => {
          return <Home />
        }}
      />
      <Route 
          exact path="/about"
          render={() => {
            return <About />
          }}
      />
      <Route 
          exact path="/:state"
          render={() => {
            return (
            <StatePage 
              allStatesInfo={this.state.allStatesInfo} 
              getCurrentPage={this.getCurrentPage} 
            />)
          }}
        />
     <Route 
        exact path="/:state/:location"
        render={() => {
          return (
            <Location
              allStatesInfo={this.state.allStatesInfo}
              getCurrentPage={this.getCurrentPage}
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
