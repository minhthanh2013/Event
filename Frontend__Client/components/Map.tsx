import React from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
  
const Map = () => {
  return (
    <div>
      <GoogleMapReact
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
      </GoogleMapReact>
    </div>
  );
}

export default Map;