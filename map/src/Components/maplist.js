import React, { Component } from 'react';

class MapList extends Component {
  state = {
    places: [],
    results: [],
    query: ""
  }

  updateQuery = (input) => {
    //no guarantee that setState will update the component immediately
    //this.fikterMarkers executes once setState is completed
    this.setState({query: input}, this.filterMarkers);
  }

  filterMarkers() {
    const { places, results, query } = this.state;
    /*if(query === '' || query === undefined) {
      return this.setState({ results: [] });
    }*/
    const queryUpperCase = query.toUpperCase();
    const items = document.querySelectorAll(".list-item");
    items.forEach(item => {
      //if text entered matches item from list
      if (item.innerHTML.toUpperCase().indexOf(queryUpperCase) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    })
  }

  render() {
    const locations = this.props.places;
    return (
      <div>
        <input id="searchBox" type="text" placeholder="Type here to filter destinations" value={this.state.query}
        onChange={(event) => this.updateQuery(event.target.value)}
        onKeyPress={(event) => this.updateQuery(event.target.value)}/>
        <input id="filterButton" type="button" value="Filter"/>
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
