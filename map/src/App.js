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
      places: [],
      markerObjects: [],
      query: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      dropAnimation: true,
      showingMarker: true,
      placesOnList: []
    }
  }
  updateQuery = (input) => {
    //no guarantee that setState will update the component immediately
    //this.filterMarkers executes once setState is completed
    //setState can only take one callback, so make one function and call
    //multiple functions within if needed
    this.setState({query: input}, this.filterAll);
  }

  filterList() {
    /*if(query === '' || query === undefined) {
      return this.setState({ results: [] });
    }*/
    const queryUpperCase = this.state.query.toUpperCase();
    const items = document.querySelectorAll(".list-item");
    let visiblePlaces = [];
    items.forEach(item => {
      //if text entered matches item from list, show item. If not, hide the item.
      if (item.innerHTML.toUpperCase().indexOf(queryUpperCase) > -1) {
        item.style.display = "";
        visiblePlaces.push(item.innerHTML);
      } else {
        item.style.display = "none";
      }

      /*if (item.style.display !== "none") {
        this.setState({
          placesOnList: item.innerHTML
        });
      }*/
    })
    this.setState({
      placesOnList: visiblePlaces
    })
  }

  filterMap() {
    const markers = document.querySelectorAll(".marker");
    const queryUpperCase = this.state.query.toUpperCase();
    markers.forEach(marker => {
      if (marker.innerHTML.toUpperCase().indexOf(queryUpperCase) > -1) {
        marker.style.display = "";
      } else {
        marker.style.display = "none";
      }
    })
  }

  filterAll(){
    this.filterList();
    this.filterMap();
  }

  clickedPlace = (place) => {
    this.setState({
      places: place
    })
  }

  handleClick = (place) => {
    this.setState({
      selectedPlace: place
    }, this.matchMarker)
  }

  matchMarker(){
    //document.querySelectorAll(".")
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
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
    //prevState.activeMarker.visible = false;
    if (prevProps.google !== this.props.google) {
      this.initMap();
      this.setState({
        dropAnimation: true
      })
    }
    console.log(prevState);
    console.log(this.state.placesOnList);
  }

  initMap() {
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
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    })
  }

  getMarkerObjects = (element) => {
    console.log(element);
    this.setState(prevState => ({
      markerObjects: [...prevState.markerObjects, element.marker]
    }))
  };

  render() {
    const places = [
          {name: "Famous Crispy Curry Puff", lat: 1.279088, lng: 103.846591, placeId: "ChIJ642LmRIZ2jERkz20c4ECaYw"},
          {name: "Tian Tian Hainanese Chicken Rice", lat: 1.280520, lng: 103.844807, placeId: "ChIJ2ZDgUg0Z2jERXUJpEsR0Oto"},
          {name: "The Golden Duck Co. - Chinatown Point", lat: 1.286149, lng: 103.845921, placeId:"ChIJ3TOiSwsZ2jERNN_xRYcX6H4"},
          {name: "Ah Chew Desserts", lat: 1.298052, lng: 103.856355, placeId:"ChIJCRd5-K8Z2jER5mCE-Fge3Ug"},
          {name: "Mustafa Shopping Centre", lat: 25.509221, lng: 69.010958, placeId: "ChIJpb4qAa-uTjkRQ1sY2ISOTd0"}
        ]
    return (
      <div className="App">
        <header className="App-header">
          <h1>Neighborhood Map</h1>
          <Menu noOverlay className="burger-menu" width={300}>
            <MapList className="map-list" places={places} updateQuery={this.updateQuery.bind(this)}
            query={this.state.query} handleClick={this.handleClick.bind(this)} states={this.state}/>
          </Menu>
        </header>
        <main>
          <Map ref='map' className="map" places={places} clickedPlace={this.state.places}
          filter={this.filterMap.bind(this)}
          onInfoWindowClose={this.onInfoWindowClose.bind(this)} onMarkerClick={this.onMarkerClick.bind(this)} states={this.state}/>
        </main>
      </div>
    );
  }
}

export default App;
