import React, { Component } from 'react';
import './App.css';
import './Styles/burgermenu.css';
import { slide as Menu } from 'react-burger-menu';
import MarkerMap from './Components/map'
import MapList from './Components/maplist'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Neighborhood Map</h1>
          <Menu noOverlay className={"burger-menu"} width={300}>
          </Menu>
        </header>
        <main>
          <MapList>
          </MapList>
          <MarkerMap />
        </main>
      </div>
    );
  }
}

export default App;
