import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MarkerMap extends Component {
  //from https://github.com/fullstackreact/google-maps-react
  render() {
    //console.log(this.props.google);
    //console.log(this.state.places);
    //(Object.keys(this.state.activeMarker).length !== 0) ? ((this.state.activeMarker.name === marker.name) ? 1 : 0) : 2
    const locations = this.props.places;
    return (
      <Map google={this.props.google} onClick={this.onMapClicked}
      initialCenter={{lat:1.290604, lng:103.846473}} zoom={14}>

        { locations.map((marker, index) =>
          <Marker key={index} onClick={this.props.onMarkerClick} ref={this.props.getMarkerObjects}
                    name={marker.name} position={{lat: marker.lat, lng: marker.lng}}
                    animation={this.props.states.activeMarker ? ((this.props.states.activeMarker.name === marker.name) ? 1 : 0) : 0}
                    className="marker" visible={this.props.states.showingMarker}/>
        )}

        <InfoWindow marker={this.props.states.activeMarker}
          name={this.props.states.activeMarker.name}
          visible={this.props.states.showingInfoWindow}
          onClose={this.props.onInfoWindowClose}>
            <div>
              <p>{this.props.states.selectedPlace.name}</p>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAf45ANMw2zw1FHJAkn47m5dAQjK-MawRk'),
  libraries: ['places']
})(MarkerMap)
