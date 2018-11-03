import React, { Component } from 'react';
import './App.css';
import './Styles/burgermenu.css';
import { slide as Menu } from 'react-burger-menu';
import MapContainer from './Components/map'
import VenueList from './Components/venuelist'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: {},
      allLocations: null,
      allMarkers: [],
      clickedPlace: [],
      infoWindow: null,
      map: null,
      placesOnList: "",
      query: "",
    }
  }

  updateQuery = (input) => {
    this.setState({
      query: input,
    }, this.filterList);
  }

  filterList = ()=>{
    const queryUpperCase = this.state.query.toUpperCase();
    const items = document.querySelectorAll(".list-item");
    let visiblePlaces = [];
    items.forEach(item => {
      //if text entered matches item from list, show item. If not, hide the item.
      //Other possible code: items.filter(item=>{new RegExp(this.state.query,'i').exec(item.innerHTML)})
      if (item.innerHTML.toUpperCase().indexOf(queryUpperCase) > -1) {
        item.style.display = "";
        const changeAmp = item.innerHTML.replace(/&amp;/, "&");
        visiblePlaces.push(changeAmp.trim());
      } else {
        item.style.display = "none";
      }
    });
    this.setState({
      placesOnList: visiblePlaces
    }, this.setMarkerVisibility(visiblePlaces))
  }

  setMarkerVisibility = (venue) => {
    this.state.allMarkers.find((marker) => {
      //If list item hasn't been clicked, show markers currently visible on list
      if (venue.includes(marker.title.trim())){
        return marker.setVisible(true);
      } else if (this.state.clickedPlace){
        //If list item is clicked, show corresponding marker
        if ([venue[0].name].includes(marker.title.trim())){
          this.setState({
            activeMarker: marker
          })
          return this.triggerMarkerClick();
        } else {
          return marker.setVisible(false);
        }
      } else {
        return marker.setVisible(false);
      }
    });
  }
  //when a list item is clicked on, save the item name, show marker for item and hide other markers
  onListClick = (venue) => {
    venue = [venue];
    this.setState({
      clickedPlace: venue
    })
    //Tried calling setMarkerVisibility as a callback in the this.setState function above, but
    //the new this.state.clickedPlace is still not set by the time setMarkerVisibility runs for some odd
    //reason. When setMarkerVisibility runs, it is still looking at the old this.state.clickedPlace.
    //Using setTimeout to ensure clickedPlace has been updated.
    setTimeout(()=> {
      this.setMarkerVisibility([venue[0]])
    }, 100)
  }

  triggerMarkerClick = ()=> {
    this.state.google.maps.event.trigger(this.state.activeMarker, 'click');
  }

  onMarkerClick = (props, marker) => {
    this.state.allMarkers.forEach((mkr)=>{
      if(marker.title !== mkr.title){
        mkr.setAnimation(null);
      }
    })
    this.setState({
      activeMarker: marker,
      clickedPlace: props
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: null
      })
    }
  }

  onInfoWindowClose = () => {
    this.setState({
      activeMarker: {},
      clickedPlace: {}
    })
  }

  getMarkers = (markers, infoWindow, map, google) => {
    this.setState({
      allMarkers: markers,
      infoWindow: infoWindow,
      map: map,
      google: google
    })
  }

  getFbResults = (searchResults) => {
    this.setState({
      allLocations: searchResults
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="App-header">
          <h1>Neighborhood Map</h1>
          <div tabIndex="0">
          <Menu noOverlay
            className="burger-menu"
            width={300} >
            <VenueList
              className="map-list"
              onListClick={this.onListClick}
              venuesvenue={this.state.allLocations}
              query={this.state.query}
              updateQuery={this.updateQuery.bind(this)}
            />
          </Menu>
          </div>
        </nav>
        <main>
          <MapContainer
            ref={"map"}
            className="map-wrapper"
            states={this.state}
            getFbResults={this.getFbResults}
            getMarkers={this.getMarkers}
            onInfoWindowClose={this.onInfoWindowClose}
            onMapClicked={this.onMapClicked}
            onMarkerClick={this.onMarkerClick}
            setMarkerVisibility={this.setMarkerVisibility}
            triggerMarkerClick={this.triggerMarkerClick}
            updateQuery={this.updateQuery}
          />
        </main>
      </div>
    );
  }
}

export default App;
