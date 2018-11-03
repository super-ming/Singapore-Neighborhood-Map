import React, { Component } from 'react';
import './Styles/App.css';
import { slide as Menu } from 'react-burger-menu';
import MapContainer from './Components/map'
import VenueList from './Components/venuelist'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: {},
      fbResults: null,
      allMarkers: [],
      clickedPlace: [],
      infoWindow: null,
      map: null,
      menuOpen: false,
      placesOnList: "",
      query: "",
      showingInfoWindow: false
    }
  }

  updateQuery = (input) => {
    if(this.state.infoWindow){
      this.state.infoWindow.close();
    }
    this.setState({
      query: input,
      menuOpen: true
    }, this.filterList);
  }

  //when a list item is clicked on, save the item name, show marker for item and hide other markers
  onListClick = (venue) => {
    venue = [venue];
    this.setState({
      clickedPlace: venue,
      menuOpen: false
    })
    //When setMarkerVisibility runs as a callback in the this.setState function above,
    //it is still looking at the old this.state.clickedPlace.
    //Using setTimeout to ensure clickedPlace has been updated.
    setTimeout(()=> {
      this.setMarkerVisibility([venue[0]])
    }, 100)
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
          marker.setVisible(true);
          return this.triggerMarkerClick();
        } else {
          return marker.setVisible(false);
        }
      } else {
        return marker.setVisible(false);
      }
    });
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
      clickedPlace: props,
      menuOpen: false,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: null,
        menuOpen: false,
        showingInfoWindow: false
      })
    } else {
      this.setState({
        menuOpen: false
      })
    }
  }

  onInfoWindowClose = () => {
    this.setState({
      activeMarker: {},
      clickedPlace: {},
      showingInfoWindow: false
    })
  }

  getMap = (markers, infoWindow, map, google) => {
    this.setState({
      allMarkers: markers,
      infoWindow: infoWindow,
      map: map,
      google: google
    })
  }

  getFbResults = (searchResults) => {
    this.setState({
      fbResults: searchResults
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="App-header">
          <h1>Neighborhood Map</h1>
          <div tabIndex="0">
          <Menu noOverlay isOpen={this.state.menuOpen}
            className="burger-menu"
            width={300} >
            <VenueList
              className="map-list"
              onListClick={this.onListClick}
              venues={this.state.fbResults}
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
            fbResults={this.state.fbResults}
            infoWindow={this.state.infoWindow}
            allMarkers={this.state.allMarkers}
            query={this.state.query}
            getFbResults={this.getFbResults}
            getMap={this.getMap}
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
