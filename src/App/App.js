import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import './App.scss';
import About from '../About/About'
import Landing from '../Landing/Landing'
import Home from '../Home/Home'
import StatePage from '../StatePage/StatePage'
import {cleanData} from '../apiCalls/dataCleaner'
// import Results from '../Results/Results'
// import Location from '../Location/Location'

class App extends Component {
  constructor() {
    super()
    this.state = {
     parks: [],
     error: "",
     favorites: [],
     colorado: [],
     idaho: [],
     montana: [],
     wyoming: [], 
    };
  }

  componentDidMount = async () => {
    try {
      const allData = await cleanData();
      console.log('in app', allData)
      // this.setState({colorado: coData})
    } catch (error) {
      this.setState({
        error: "Oops, something went wrong! 🙁 Please try again.",
      })
    }
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
          return <Home  searchSites={this.searchSites}/>
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
          return <StatePage />
        }}
      />
     {/* <Route 
        exact path="/:state/:location"
        render={() => {
          return <Location />
        }}
      /> */}
    </main>
   </div>
  );
  }

}

export default App;
