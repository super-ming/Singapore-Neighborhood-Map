import React, { Component } from 'react';
import './App.css';
import './Styles/burgermenu.css';
import { slide as Menu } from 'react-burger-menu';
import Map from './Components/map'
import MapList from './Components/maplist'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      showingMarker: true,
      placesOnList: "",
      allLocations: [
            {name: "Famous Crispy Curry Puff", lat: 1.279088, lng: 103.846591, placeId: "ChIJ642LmRIZ2jERkz20c4ECaYw", visible: true},
            {name: "Tian Tian Hainanese Chicken Rice", lat: 1.280520, lng: 103.844807, placeId: "ChIJ2ZDgUg0Z2jERXUJpEsR0Oto", visible: true},
            {name: "The Golden Duck Co. - Chinatown Point", lat: 1.286149, lng: 103.845921, placeId:"ChIJ3TOiSwsZ2jERNN_xRYcX6H4", visible: true},
            {name: "Ah Chew Desserts", lat: 1.298052, lng: 103.856355, placeId:"ChIJCRd5-K8Z2jER5mCE-Fge3Ug", visible: true},
            {name: "Mustafa Shopping Centre", lat: 25.509221, lng: 69.010958, placeId: "ChIJpb4qAa-uTjkRQ1sY2ISOTd0", visible: true}
      ]
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.allLocations);
    if (prevProps.google !== this.props.google) {
      this.initMap();
    }
  }

  updateQuery = (input) => {
    //no guarantee that setState will update the component immediately
    //this.filterMarkers executes once setState is completed
    //setState can only take one callback, so make one function and call
    //multiple functions within if needed
    console.log(input);
    this.setState({
      query: input,
    }, this.filterList);
  }

  /*filterAll(){
    this.filterList();
  }*/

  filterList() {
    const queryUpperCase = this.state.query.toUpperCase();
    const items = document.querySelectorAll(".list-item");
    let visiblePlaces = [];
    items.forEach(item => {
      //if text entered matches item from list, show item. If not, hide the item.
      if (item.innerHTML.toUpperCase().indexOf(queryUpperCase) > -1) {
        item.style.display = "";
        console.log(item.innerHTML.toUpperCase(),queryUpperCase);
        visiblePlaces.push(item.innerHTML.trim());
        //this.findSelectedPlaceMarkers(item.innerHTML);
      } else {
        item.style.display = "none";
      }
    });
    this.setState({
      placesOnList: visiblePlaces
    })
  }

  //when a list item is clicked on, save the item name, show marker for item and hide other markers
  onListClick = (place) => {
    this.setState({
      selectedPlace: place.innerHTML.trim()
    })
    //console.log("list click update done");
  }

  /*findSelectedPlaceMarkers = (place) => {
    if (this.state.placesOnList){
      this.state.placesOnList.forEach(p => {
        if (p.trim() === place.trim()){
          //console.log("match");
          this.setMarkerVisibility(place);
        } else {
          //console.log("what");
          return false;
        }
      });
    }

    console.log("update marker done")
  }*/

  //this logic is flawed because unless there is only one item in placesOnList,
  //only the final run, which compares the last item in placesOnList with each
  //object in allLocations, is captured and overrides all prior runs.
  /*setMarkerVisibility(place){
    this.state.allLocations.map(p => {
      if (p.name.trim() === place.trim()){
        p.visible = true;
        console.log(place, p.name,true);
        return true
      } else {
        console.log(place, p.name, false);
        p.visible = false;
        return false
      }
    });
    console.log(this.state.allLocations);
  }*/

  showMarkersOnList(marker){
    //If marker's name matches items currently visible on list view, show marker.
    //Need trim() in order to match!
    return this.state.placesOnList.includes(marker.name.trim());
  }

  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    })
  }

  //from https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#
  onMarkerClick = (props, marker, e) => {
    console.log(props, marker, e);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Neighborhood Map</h1>
          <Menu noOverlay className="burger-menu" width={300}>
            <MapList className="map-list" places={this.state.allLocations} updateQuery={this.updateQuery.bind(this)}
            query={this.state.query} onListClick={this.onListClick.bind(this)}/>
          </Menu>
        </header>
        <main>
          <Map ref='map' className="map" places={this.state.allLocations}
          showMarkersOnList={this.showMarkersOnList.bind(this)}
          onInfoWindowClose={this.onInfoWindowClose.bind(this)} onMarkerClick={this.onMarkerClick.bind(this)} states={this.state}
          onMapClicked={this.onMapClicked.bind(this)}
          />
        </main>
      </div>
    );
  }
}

export default App;
