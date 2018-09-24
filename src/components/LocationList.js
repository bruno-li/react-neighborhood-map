import React, { Component } from "react";

class LocationList extends Component {
  constructor() {
    super();

    this.state = {
        markers: []
    }
  }

 componentDidMount() {
    this.setState({ markers: this.props.filterMarkers });
  }

  render() {

    return (
      <div className="search">
        <input
          role="search"
          aria-labelledby="filter"
          id="search-field"
          className="search-field"
          type="text"
          placeholder="Filter"
        />
        <ul className="location-list">
              {this.state.markers && this.state.markers.length && this.state.markers.map((marker, i) =>
                            <li key={i}>
                                <a href="#" 
                                tabIndex="0" role="link">{marker.title
                                }</a>
                            </li>
                        )}
         </ul>
        <button className="button">Show/Hide Locations</button>
      </div>
    );
  }
}

export default LocationList;
