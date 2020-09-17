import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import './App.scss';
import About from '../About/About'
import Landing from '../Landing/Landing'
import Home from '../Home/Home'
import StatePage from '../StatePage/StatePage'
import {cleanData, statesInfo} from '../apiCalls/dataCleaner'
// import Results from '../Results/Results'
// import Location from '../Location/Location'

class App extends Component {
  constructor() {
    super()
    this.state = {
     parks: [],
     error: "",
     favorites: [],
     stateInfo: []
    };
  }

  componentDidMount = async () => {
    try {
      const allData = await statesInfo();
      this.setState({stateInfo: allData})
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
          return <StatePage stateInfo={this.state.stateInfo} />
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
