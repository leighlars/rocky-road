import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import './App.scss';
import About from '../About/About'
import Landing from '../Landing/Landing'
import Home from '../Home/Home'
// import Results from '../Results/Results'
// import Location from '../Location/Location'

class App extends Component {
  constructor() {
    super()
    this.state = {
     parks: [],
     error: "",
     favorites: []
    };
  }

  search = (query) => {
    console.log('hi')
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
        {<Route 
        exact path="/home"
        render={() => {
          return <Home  search={this.search}/>
        }}
      />}
     <Route 
        exact path="/about"
        render={() => {
          return <About />
        }}
      />
     {/* <Route 
        exact path="/results"
        render={() => {
          return <Results />
        }}
      /> */}
     {/* <Route 
        exact path="/results/:location"
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
