import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

window.gm_authFailure = ()=>{
  alert("Invalid Google API key. Please check your Google API key")
}

const fbAppID = '2203110406389507'
const fbAppSecret ='378ed176af2b45d3d7c38f62a82256a0'

class MapContainer extends Component {
  //from https://github.com/fullstackreact/google-maps-react
  componentDidMount() {
    this.getVenueInfo();
  }

  mapReady = (props,map) =>{
    //setTimeout is added to ensure that data from API is available in order to create the markers.
    setTimeout(()=> {
      this.addMarkers(map);
    }, 1300)
  }

  getVenueInfo = () => {
    let searchResults = [];
    const placeSearchUrl = `https://graph.facebook.com/v3.2/search?type=place&center=1.290604,103.846473&categories=["FOOD_BEVERAGE"]&distance=1000&fields=name, location, overall_star_rating, phone, website, picture, link&access_token=${fbAppID}|${fbAppSecret}`
    let headers = new Headers();
    let request = new Request(placeSearchUrl, {
      method: 'GET',
      headers
    });

    fetch(request).then(res => res.json()).then(results => {
      results.data.forEach((result, index)=> {
        let venue = {};
        venue.name = result.name
        venue.lat = result.location.latitude
        venue.lng = result.location.longitude
        venue.id = result.id
        venue.rating = result.overall_star_rating
        if(result.website){
          venue.website = result.website
        } else {
          venue.website = result.link
        }
        venue.visible = true
        venue.isOpen = false
        venue.index = index
        searchResults.push(venue);
      });
    }).catch(err=> {
      alert("Facebook Places API is currently unavailable", err);
    });
    this.props.getFbResults(searchResults);
  }

  addMarkers(map) {
    let markers = [];
    const infoWindow = new this.props.google.maps.InfoWindow();
    if(this.props.states.allLocations){
      for (let place of this.props.states.allLocations){
        const marker = new this.props.google.maps.Marker({
          position: {lat: place.lat, lng: place.lng},
          map: map,
          title: place.name,
          id: place.index,
          animation: 2  //Drop
        })
        markers.push(marker);
        const infoContent = `<h4>${place.name}</h4><p>Rating: ${place.rating}</p><p>Website: ${place.website}</p>`;
        marker.addListener('click', ()=>{
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(1); //Bounce
          }
          infoWindow.setContent(infoContent);
          infoWindow.open(map, marker);
          this.props.onMarkerClick(place, marker);
        });
        infoWindow.addListener('closeclick', ()=>{
          marker.setAnimation(null)
          this.props.onInfoWindowClose()
        })
      };
    }
    this.props.getMarkers(markers, infoWindow, map, this.props.google)
  }

  onMapClicked = ()=>{
    this.props.states.infoWindow.close();
    this.props.states.allMarkers.forEach(marker=>{
      marker.setAnimation(null);
    }, this.props.onInfoWindowClose)
    this.props.updateQuery(this.props.states.query)
  }

  render() {
    if(window.google){
      return (
        <Map google={this.props.google} onClick={this.onMapClicked} className="map"
        initialCenter={{lat:1.290604, lng:103.846473}} zoom={15} role="application" aria-label="map"
        onReady={this.mapReady}>
        </Map>
      );
    } else {
      return(
        <div>Error loading Google Maps</div>
      )
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAf45ANMw2zw1FHJAkn47m5dAQjK-MawRk'),
  libraries: ['places']
})(MapContainer)
