import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import './App.scss';
// import Header from '../Header/Header'
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
  


  render() { 
  return (
   <div className="App">
    {/* <Header /> */}
    <main>
     <Route 
        exact path="/"
        render={() => {
          return <Home />
        }}
      />
     {/* <Route 
        exact path="/about"
        render={() => {
          return <About />
        }}
      /> */}
     {/* <Route 
        exact path="/results"
        render={() => {
          return <Results />
        }}
      /> */}
     {/* <Route 
        exact path="/results/:id"
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
