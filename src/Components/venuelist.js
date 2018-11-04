import React from 'react';

const VenueList = (props) => {
  const venues = props.venues;
  return (
    <div>
    <label htmlFor="searchBox">Search Box</label>
      <input
        id="searchBox"
        type="text"
        placeholder="Type here to filter locations"
        value={props.query}
        onChange={event => props.updateQuery(event.target.value)}
        onKeyUp={event => props.updateQuery(event.target.value)}/>
      <div className="place-list">
      { venues && (venues.map((venue, index) =>
        <div
          className="list-item"
          name={venue.name} key={index}
          onClick={event => props.onListClick(venue, index)}>{venue.name} </div>
      ))}
      </div>
    </div>
  );
}

export default VenueList;
