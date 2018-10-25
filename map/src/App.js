import React, { Component } from 'react';
import './App.css';
import './Styles/burgermenu.css';
import { slide as Menu } from 'react-burger-menu';
import MarkerMap from './Components/map'
import MapList from './Components/maplist'

class App extends Component {
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
          <Menu noOverlay className={"burger-menu"} width={300}>
            <MapList className={"map-list"} places={places}/>
          </Menu>
        </header>
        <main>
          <MarkerMap ref='map' className={"map"} places={places}/>
        </main>
      </div>
    );
  }
}

export default App;
