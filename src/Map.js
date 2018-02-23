import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

//Hardcoded data
const markers = [{
    id: '1',
    latitude:  62.392791,
    longitude: 17.283503,
    createdAt: '00:00',
    updatedAt: '00:00'
  },
  {
    id: '2',
    latitude:  62.392782,
    longitude: 17.283502,
    createdAt: '00:00',
    updatedAt: '00:00'

  },
  {
    id: '3',
    latitude:  62.392784,
    longitude: 17.283503,
    createdAt: '00:00',
    updatedAt: '00:00'

  },
]

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={20}
    defaultCenter={{ lat: 62.392782, lng: 17.283503}}
  >
    {props.markers.map(marker => (
      <Marker
        key={marker.id}
        position={{ lat: marker.latitude, lng: marker.longitude }}
      />
    ))}

  </GoogleMap>
));


class Map extends React.Component {
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
    console.log(this.props.data.allPersons)
    return (
      <MapWithAMarker
        markers={this.props.data.allPersons ? this.props.data.allPersons : []}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} /> }
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


// here we create a query opearation
const MY_QUERY = gql`
  query {
    allPersons {
      id
      longitude
      latitude
    }
  }
`;

// We then can use the graphql container to pass the query results returned by MY_QUERY
// to a component as a prop (and update them as the results change)
export default graphql(MY_QUERY)(Map);
