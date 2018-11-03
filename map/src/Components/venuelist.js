import React, { Component } from 'react';

class VenueList extends Component {
  render() {
    const venues = this.props.venues;
    return (
      <div>
        <input id="searchBox" type="text" placeholder="Type here to filter locations" value={this.props.query}
        onChange={event => this.props.updateQuery(event.target.value)}
        onKeyUp={event => this.props.updateQuery(event.target.value)}/>
        <div className="place-list">
        { venues && (venues.map((venue, index) =>
          <div className="list-item" name={venue.name} key={index}
          onClick={event => this.props.onListClick(venue, index)}>{venue.name} </div>
        ))}
        </div>
      </div>
    );
  }
}
export default VenueList;
