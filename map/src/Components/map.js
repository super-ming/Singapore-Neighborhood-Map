import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  //from https://github.com/fullstackreact/google-maps-react
  state = {
    all: this.props.states.allLocations,
    show: []
  }

  componentDidUpdate(prevProps, prevState) {
    //prevState.activeMarker.visible = false;
    //console.log(prevProps);
    //if (prevProps.states.placesOnList !== this.props.states.placesOnList) {
    //  this.updateState();
    //}
  }

  showMarkers(marker){
    //need trim() in order to match!!
    /*let b = this.state.all.forEach((place, index) => {
      let c = this.props.states.placesOnList.filter(a => {
        return a.trim() === place.name.trim()
      });
      if (c){
        console.log(place);
      }
    });
    //console.log(b);
    this.setState({
      all: this.filterLoc
    })*/
    let b = this.props.states.placesOnList.filter(a => {
      return a.trim() === marker.name.trim();
    });
    if (b) {
      return false
    }
  }

  render() {
    //(Object.keys(this.state.activeMarker).length !== 0) ? ((this.state.activeMarker.name === marker.name) ? 1 : 0) : 2
    const locations = this.props.states.allLocations;
    return (
      <Map google={this.props.google} onClick={this.props.onMapClicked}
      initialCenter={{lat:1.290604, lng:103.846473}} zoom={14} role="application" aria-label="map">
        { locations.map((loc, index) =>
          <Marker key={index} onClick={this.props.onMarkerClick} ref={this.props.getMarkerObjects}
                    name={loc.name} position={{lat: loc.lat, lng: loc.lng}}
                    animation={this.props.states.activeMarker ? ((this.props.states.activeMarker.name === loc.name) ? 1 : 0) : 0}
                    className="marker"
                    visible={this.props.states.placesOnList ? (this.props.showMarkersOnList(loc) ? true : false) : true}
                    />
        )}

        <InfoWindow marker={this.props.states.activeMarker}
          name={this.props.states.activeMarker ? this.props.states.activeMarker.name : ""}
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
})(MapContainer)
