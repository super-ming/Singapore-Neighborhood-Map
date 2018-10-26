import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom'

class MarkerMap extends Component {
  //from https://github.com/fullstackreact/google-maps-react

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

    if (this.state.activeMarker) {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      }
    }
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  //from https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
      this.setState({
        animation: null
      })
    }
  }

  loadMap() {
    // google is available
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }

//mine
  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false
    })
  }

  render() {
    console.log(this.props.google);
    console.log(this.state.activeMarker);
    const locations = this.props.places;
    return (
      <Map google={this.props.google} onClick={this.onMapClicked}
      initialCenter={{lat:1.290604, lng:103.846473}} zoom={14}>
        { locations.map((marker, index) =>
          <Marker key={index} onClick={this.onMarkerClick}
                    name={marker.name} position={{lat: marker.lat, lng: marker.lng}}
                    animation={(Object.keys(this.state.activeMarker).length !== 0) ? ((this.state.activeMarker.name === marker.name) ? 1 : 0) : 2}
                    className="marker" />
        )}
        <InfoWindow marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
            <div>
              <p>{this.state.selectedPlace.name}</p>
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
