import React, { Component } from "react";

class LocationList extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      markers: []
    };
  }

  componentDidMount() {
    this.setState({ markers: this.props.filterMarkers });
  }

  openMarker(marker) {
    // call props to call the function to open infowindow
    this.props.openInfo(marker);
  }

  search = event => {
    const query = event.target.value.toLowerCase();
    const markers = this.props.filterMarkers;
    const filteredMarkers = [];

    markers.forEach(function(marker) {
      if (marker.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        marker.setVisible(true);
        filteredMarkers.push(marker);
      } else {
        marker.setVisible(false);
      }
    });
    this.setState({ markers: filteredMarkers });
  };

  render() {
    return (
      <div className="search">
        <input
          role="search"
          aria-labelledby="filter"
          id="search-field"
          className="search-field"
          type="text"
          placeholder="Filter locations"
          onChange={this.search}
        />
        <ul className="location-list">
          {this.state.markers &&
            this.state.markers.length &&
            this.state.markers.map((marker, i) => (
              <a
                role="button"
                onClick={this.props.openInfo.bind(this, marker)}
                key={i}
              >
                <li className="box"
                 tabIndex="0"
                 >
                  {marker.title}
                </li>
              </a>
            ))}
          ;
        </ul>
        <button className="button">Show/Hide Locations</button>
      </div>
    );
  }
}

export default LocationList;
