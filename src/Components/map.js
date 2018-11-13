import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import ErrorBoundary from './errorboundary';
import { storeAPI } from '../config';

window.gm_authFailure = ()=>{
  alert("Invalid Google API key. Please check your Google API key");
};

const fbAppID = process.env.REACT_APP_fbAppID;
const fbAppSecret = process.env.REACT_APP_fbAppSecret;
const googleMapsAPI = process.env.REACT_APP_googleMapsAPI;

class MapContainer extends Component {
  componentDidMount() {
    console.log(fbAppID);
    this.getVenueInfo();
  }

  mapReady = (props,map) => {
    //setTimeout is added to ensure that data from API is available in order to create the markers.
    setTimeout(() => {
      this.addMarkers(map);
    }, 1300);
  }
  //fetch nearby restaurant information from Facebook Graph API
  getVenueInfo = () => {
    let searchResults = [];
    const placeSearchUrl = `https://graph.facebook.com/v3.2/search?type=place&center=1.290604,103.846473&categories=["FOOD_BEVERAGE"]&distance=1000&fields=name, location, overall_star_rating, phone, website, picture, link, checkins, price_range&access_token=${fbAppID}|${fbAppSecret}`
    let headers = new Headers();
    let request = new Request(placeSearchUrl, {
      method: 'GET',
      headers
    });

    fetch(request).then(res => {
      if (!res.ok) {
        throw Error (`Request rejected with status code ${res.status}`);
      } else {
        return res.json()
      }}).then(res => {
      res.data.forEach((result, index)=> {
        let venue = {};
        venue.name = result.name;
        venue.lat = result.location.latitude;
        venue.lng = result.location.longitude;
        venue.id = result.id;
        if(result.overall_star_rating) {
          venue.rating = result.overall_star_rating;
        } else {
          venue.rating = "No rating provided";
        }
        if(result.price_range) {
          venue.price_range = result.price_range;
        } else {
          venue.price_range = "No price range provided";
        }
        if(result.checkins) {
          venue.checkins = result.checkins;
        } else {
          venue.checkins = "None";
        }
        if(result.website) {
          venue.website = result.website;
        } else {
          venue.website = result.link;
        }
        venue.index = index;
        searchResults.push(venue);
      });
    }).catch(err=> {
      alert("Something went wrong with Facebook Places API."+ err);
    })
    this.props.getFbResults(searchResults);
  }

  addMarkers(map) {
    let markers = [];
    const infoWindow = new this.props.google.maps.InfoWindow();

    if(this.props.fbResults){
      for (let venue of this.props.fbResults){
        const marker = new this.props.google.maps.Marker({
          position: {lat: venue.lat, lng: venue.lng},
          map: map,
          title: venue.name,
          id: venue.index,
          animation: 2  //Drop
        });
        markers.push(marker);
        const infoContent = `<h4>${venue.name}</h4><p>Rating: ${venue.rating}</p><p>Price Range: ${venue.price_range}</p><p>Facebook Check-ins: ${venue.checkins}</p><a href=${venue.website}>Website</a>`;
        ['click', 'mouseover'].forEach(e => {
          marker.addListener(e, ()=> {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(1); //Bounce
          }
            infoWindow.setContent(infoContent);
            infoWindow.open(map, marker);
            this.props.onMarkerClick(venue, marker, infoWindow);
          }, false);
        });
        marker.addListener('mouseout', ()=>{
          marker.setAnimation(null);
          this.props.onInfoWindowClose();
        })
        infoWindow.addListener('closeclick', ()=>{
          marker.setAnimation(null);
          this.props.onInfoWindowClose();
        })
      }
    }
    this.props.getMap(markers, infoWindow, map, this.props.google);
  }

  onMapClicked = ()=>{
    if(this.props.infoWindow){
      this.props.infoWindow.close();
    }
    this.props.allMarkers.forEach(marker=>{
      marker.setAnimation(null);
    }, this.props.onInfoWindowClose)
    this.props.updateQuery(this.props.query);
  }

  render() {
    if(window.google){
      return (
        <ErrorBoundary>
          <Map
            aria-label="map"
            className="map"
            role="application"
            google={this.props.google}
            initialCenter={{lat:1.290604, lng:103.846473}}
            onClick={this.onMapClicked}
            onReady={this.mapReady}
            zoom={15}>
          </Map>
        </ErrorBoundary>
      )
    } else {
      return(
        <div>Error loading Google Maps</div>
      )
    }
  }
}

export default GoogleApiWrapper({
  apiKey: (`${googleMapsAPI}`)
})(MapContainer)
