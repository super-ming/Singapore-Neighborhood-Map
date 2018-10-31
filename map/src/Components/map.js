import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom'
let mark = [];
let m;
class MapContainer extends Component {
  //from https://github.com/fullstackreact/google-maps-react
  componentDidMount() {
    //this.props.getMarkers(mark);
    console.log(mark);
  }

  componentDidUpdate(prevProps, prevState) {
    //prevState.activeMarker.visible = false;
    //console.log(prevProps);
    //if (prevProps.states.placesOnList !== this.props.states.placesOnList) {
    //  this.updateState();
    //}
    //console.log(markers);
    //console.log(this);
    if (prevProps.google !== this.props.google) {
      this.initMap();
    }
    if (prevProps.states.selectedPlace !== this.props.states.selectedPlace){
      //this.triggerClick();
    }
  }

  showMarkers(){
    console.log("marker");
    const click = this.props.states.allLocations.find(obj => {
      return obj.open === true
    });
    console.log(click);
    if(click){
      return true;
    }
  }

  initMap() {
    // if google is available
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

  triggerClick = () => {
    let mev = {
      stop: null,
      latLng: new this.props.google.maps.LatLng(this.props.states.selectedPlace.lat,this.props.states.selectedPlace.lng)
    }
    //this.props.google.maps.event.trigger(mark[0], 'click', mev);
    console.log(new this.props.google.maps.LatLng(1.02,1.03));
    mark[0].props.onClick(mark[0].props, mark[0]);
  }
  render() {
    //(Object.keys(this.state.activeMarker).length !== 0) ? ((this.state.activeMarker.name === marker.name) ? 1 : 0) : 2
    const locations = this.props.states.allLocations;
    console.log(this);
    //console.log(locations

    return (

      <Map google={this.props.google} onClick={this.props.onMapClicked} className="map"ref={"maps"}
      initialCenter={{lat:1.290604, lng:103.846473}} zoom={14} role="application" aria-label="map">
        {
          locations.map((loc, index) => {
            m = <Marker key={index} onClick={this.props.onMarkerClick}
                      name={loc.name} position={{lat: loc.lat, lng: loc.lng}} className="marker"
                      animation={this.props.states.activeMarker ? ((this.props.states.activeMarker.name === loc.name) ? 1 : 0) : 0}
                      visible={this.props.states.placesOnList ? (this.props.showMarkersOnList(loc) ? true : false) : true}
                      />;
                  mark.push(m);
                  return m
              })
        }

        <InfoWindow marker={this.props.states.activeMarker}
          name={this.props.states.activeMarker ? this.props.states.activeMarker.name : ""}
          visible={this.props.states.showingInfoWindow }
          onClose={this.props.states.onInfoWindowClose} >
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
