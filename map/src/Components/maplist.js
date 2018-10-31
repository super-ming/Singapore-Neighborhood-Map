import React, { Component } from 'react';

class MapList extends Component {
  render() {
    const locations = this.props.places;
    return (
      <div>
        <input id="searchBox" type="text" placeholder="Type here to filter locations" value={this.props.query}
        onChange={event => this.props.updateQuery(event.target.value)}
        onKeyPress={event => this.props.updateQuery(event.target.value)}/>
        <div className="place-list">
        { locations.map((place, index) =>
          <div className="list-item" name={place.name} key={index}
          onClick={event => this.props.onListClick(place, index)}>{place.name} </div>
        )}
        </div>
      </div>
    );
  }
}
export default MapList;
