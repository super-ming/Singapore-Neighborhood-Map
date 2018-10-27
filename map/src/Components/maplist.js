import React, { Component } from 'react';

class MapList extends Component {
  //this.props.updateQuery points to the updateQuery function in the parent component, which alters parent's state
  render() {
    const locations = this.props.places;
    return (
      <div>
        <input id="searchBox" type="text" placeholder="Type here to filter locations" value={this.props.query}
        onChange={(event) => this.props.updateQuery(event.target.value)}
        onKeyPress={(event) => this.props.updateQuery(event.target.value)}/>
        <div className="place-list">
        { locations.map((place, index) =>
          <div className="list-item" key={index}>{place.name}</div>
        )}
        </div>
      </div>
    );
  }
}
export default MapList;
