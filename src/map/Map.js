import React from 'react'
import  GoogleMapReact from 'google-maps-react'
import LocationPin from './LocationPin'
import './Map.css'


const MapContainer = ({ location, zoomLevel }) => (
 <div className="map">
  <h2 className="map-h2">Come Visit Us At Our Campus</h2>

  <div className="google-map">
   <GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyBQ_yHIwcbDOLeFt06d3rJ9vsm410UpBIw' }}
    defaultCenter={location}
    defaultZoom={zoomLevel}
   >
    <LocationPin
     lat={location.lat}
     lng={location.lng}
     text={location.address}
    />
   </GoogleMapReact>
  </div>
 </div>
);

export default MapContainer