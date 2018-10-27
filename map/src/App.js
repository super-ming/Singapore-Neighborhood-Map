import React, { Component } from 'react';
import './App.css';
import './Styles/burgermenu.css';
import { slide as Menu } from 'react-burger-menu';
import Map from './Components/map'
import MapList from './Components/maplist'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      results: [],
      query: ""
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
    items.forEach(item => {
      //if text entered matches item from list, show item. If not, hide the item.
      if (item.innerHTML.toUpperCase().indexOf(queryUpperCase) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
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
            query={this.state.query} />
          </Menu>
        </header>
        <main>
          <Map ref='map' className="map" places={places}/>
        </main>
      </div>
    );
  }
}

export default App;
