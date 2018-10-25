import React, { Component } from 'react';

class MapList extends Component {
  render() {
    const locations = this.props.places;
    console.log(locations);
    return (
      <div className="place-list">
      { locations.map((place, index) =>
        <div className="list-item" key={index}>{place.name}</div>
      )}
      </div>
    );
  }
}
export default MapList;
