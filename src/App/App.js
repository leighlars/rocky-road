import React, { Component } from 'react';
import './App.css';
// import MapContainer from '../map/Map';
import Header from '../Header/Header'

class App extends Component {
  constructor() {
    super()
    this.state = {
     parks: [],
     error: "",
     favorites: [],
     location: {
      address: "1600 Amphitheatre Parkway, Mountain View, California.",
      lat: 37.42216,
      lng: -122.08427,
     },
    };
  }
  


  render() { 
  return (
   <div className="App">
    <Header />
    <main>
      {/* <MapContainer location={this.state.location} zoom={17}/> */}
    </main>
   </div>
  );
  }

}

export default App;
