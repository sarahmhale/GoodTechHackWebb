import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

//Hardcoded data
const markers = [{
    id: '1',
    latitude: -34.397,
    longitude: 150.644,
    createdAt: '00:00',
    updatedAt: '00:00'
  },
  {
    id: '2',
    latitude: -34.400,
    longitude: 150.644,
    createdAt: '00:00',
    updatedAt: '00:00'

  },
  {
    id: '3',
    latitude: -34.397,
    longitude: 150.650,
    createdAt: '00:00',
    updatedAt: '00:00'

  },
]

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {markers.map(marker => (
      <Marker
        position={{ lat: marker.latitude, lng: marker.longitude }}
      />
    ))}

  </GoogleMap>
));


export default class Map extends React.Component {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />
        }
        containerElement = {
          <div style={{position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'flex-end',
          alignItems: 'center'}} />
        }
        mapElement = {
          <div style={{  position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
          bottom: 0, }} />
        }
    />
  )
}
}
