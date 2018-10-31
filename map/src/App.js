import React, { Component } from 'react';
import './App.css';
import './Styles/burgermenu.css';
import { slide as Menu } from 'react-burger-menu';
import MapContainer from './Components/map'
import MapList from './Components/maplist'
import ReactDOM from 'react-dom'


const mapRef = React.createRef();
const mapListRef = React.createRef();
const mapListWrapper = React.forwardRef((props, ref) => {

})

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      selectedIndex: [],
      showingMarker: true,
      placesOnList: "",
      show: null,
      markers: null,
      map: null,
      allLocations: [
            {name: "Famous Crispy Curry Puff", lat: 1.279088, lng: 103.846591, placeId: "ChIJ642LmRIZ2jERkz20c4ECaYw", visible: true, open: false},
            {name: "Tian Tian Hainanese Chicken Rice", lat: 1.280520, lng: 103.844807, placeId: "ChIJ2ZDgUg0Z2jERXUJpEsR0Oto", visible: true, open: false},
            {name: "The Golden Duck Co. - Chinatown Point", lat: 1.286149, lng: 103.845921, placeId:"ChIJ3TOiSwsZ2jERNN_xRYcX6H4", visible: true, open: false},
            {name: "Ah Chew Desserts", lat: 1.298052, lng: 103.856355, placeId:"ChIJCRd5-K8Z2jER5mCE-Fge3Ug", visible: true, open: false},
            {name: "Mustafa Shopping Centre", lat: 25.509221, lng: 69.010958, placeId: "ChIJpb4qAa-uTjkRQ1sY2ISOTd0", visible: true, open: false}
      ]
    }
  }
  componentDidMount() {
    console.log(this.refs);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    console.log(prevProps);
    console.log(this);
    //console.log(this.state.activeMarker);
    if (prevProps.google !== this.props.google) {
      //this.initMap();
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

  filterList() {
    const queryUpperCase = this.state.query.toUpperCase();
    const items = document.querySelectorAll(".list-item");
    let visiblePlaces = [];
    items.forEach(item => {
      //if text entered matches item from list, show item. If not, hide the item.
      //items.filter(item=>{new RegExp(this.state.query,'i').exec(item.innerHTML)})
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
  onListClick = (place, index) => {
    this.setState({
      selectedPlace: place,
      selectedIndex: index,
      allLocations: this.updateLocations(place),
      show: true
    });
    console.log(this);
    //let m = this.state.markers[index];
    //m.click();
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

  showMarkersOnList = (marker) => {
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
    let locationsWithClick = this.updateLocations(marker);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      allLocations: locationsWithClick,
      show: true
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

  updateLocations = (place) => {
    let updatedLocations = this.state.allLocations;
    console.log(place);
    this.state.allLocations.find((obj, idx)=>{
      if(obj.name === place.name){
        updatedLocations[idx].open = true;
        return true;
      } else {
        return false;
      }
    })
    return updatedLocations;
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

  getMarkers = (map) => {
    //console.log(map[0].props.onClick);
    //map[0].props.onClick();
    this.setState({
      map: map
    })
  }

  render() {
    //console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <h1>Neighborhood Map</h1>
          <Menu noOverlay className="burger-menu" width={300}>
            <MapList ref={mapListRef} className="map-list" places={this.state.allLocations} updateQuery={this.updateQuery.bind(this)}
            query={this.state.query} onListClick={this.onListClick} />
          </Menu>
        </header>
        <main>
          <MapContainer ref={"map"} className="map-wrapper" places={this.state.allLocations}
          showMarkersOnList={this.showMarkersOnList}
          onInfoWindowClose={this.onInfoWindowClose} onMarkerClick={this.onMarkerClick} states={this.state}
          onMapClicked={this.onMapClicked} getMarkers={this.getMarkers}
          />
        </main>
      </div>
    );
  }
}

export default App;
