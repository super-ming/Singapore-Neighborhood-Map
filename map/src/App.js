import React, { Component } from 'react';
import './App.css';
import './Styles/burgermenu.css';
import { slide as Menu } from 'react-burger-menu';
import MapContainer from './Components/map'
import MapList from './Components/maplist'


const mapListRef = React.createRef();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      showingInfoWindow: false,
      activeMarker: {},
      clickedPlace: [],
      selectedIndex: [],
      placesOnList: "",
      allMarkers:[],
      infoWindow: null,
      map: null,
      allLocations: null
    }
  }
  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {

    }
  }

  updateQuery = (input) => {
    //no guarantee that setState will update the component immediately
    //this.filterMarkers executes once setState is completed
    //setState can only take one callback, so make one function and call
    //multiple functions within if needed
    //console.log(input);
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
        visiblePlaces.push(item.innerHTML.trim());
      } else {
        item.style.display = "none";
      }
    });
    this.setState({
      placesOnList: visiblePlaces
    }, this.setMarkerVisibility(visiblePlaces))
  }

  setMarkerVisibility = (place) => {
    this.state.allMarkers.find((marker) => {
      //If list item hasn't been clicked, show markers currently visible on list
      if (place.includes(marker.title.trim())){
        return marker.setVisible(true);
      } else if (this.state.clickedPlace){
        //If list item is clicked, show corresponding marker
        if ([place[0].name].includes(marker.title.trim())){
          this.setState({
            activeMarker: marker
          })
          return marker.setVisible(true);
        } else {
          return marker.setVisible(false);
        }
      } else {
        return marker.setVisible(false);
      }
    });
  }
  //when a list item is clicked on, save the item name, show marker for item and hide other markers
  onListClick = (place, index) => {
    place = [place];
    console.log(index, "click");
    this.setState({
      clickedPlace: place,
      selectedIndex: index,
      allLocations: this.updateLocations(place[0], index)
    })
    //Tried calling setMarkerVisibility as a callback in the this.setState function above, but
    //the new this.state.clickedPlace is still not set by the time setMarkerVisibility runs for some odd
    //reason. When setMarkerVisibility runs, it is still looking at the old this.state.clickedPlace.
    //Using setTimeout to ensure clickedPlace has been updated.
    setTimeout(()=> {
      this.setMarkerVisibility([place[0]])
      this.triggerMarkerClick();
    }, 100)
  }

  updateLocations = (place, idx) => {
    let updatedLocations = this.state.allLocations;
    updatedLocations[idx].isOpen = true;
    return updatedLocations;
  }

  triggerMarkerClick = ()=> {
    this.state.google.maps.event.trigger(this.state.activeMarker, 'click');
  }

  onMarkerClick = (props, marker, index) => {
    this.state.allMarkers.forEach((mkr, index)=>{
      if(marker.title !== mkr.title){
        mkr.setAnimation(null);
      }
    })
    this.setState({
      clickedPlace: props,
      activeMarker: marker,
      selectedIndex: marker.id,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: {},
      clickedPlace: {},
      selectedIndex: [],
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
          <Menu noOverlay className="burger-menu" width={300} >
            <MapList ref={mapListRef} className="map-list" places={this.state.allLocations} updateQuery={this.updateQuery.bind(this)}
            query={this.state.query} onListClick={this.onListClick} />
          </Menu>
          </div>
        </nav>
        <main>
          <MapContainer ref={"map"} className="map-wrapper" places={this.state.allLocations}
          triggerMarkerClick={this.triggerMarkerClick} getFbResults={this.getFbResults}
          onInfoWindowClose={this.onInfoWindowClose} onMarkerClick={this.onMarkerClick} states={this.state}
          onMapClicked={this.onMapClicked} getMarkers={this.getMarkers} updateQuery={this.updateQuery}
          />
        </main>
      </div>
    );
  }
}

export default App;
