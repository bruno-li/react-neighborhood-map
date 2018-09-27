import React, { Component } from "react";

class LocationList extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      markers: []
    };
  }

  componentDidMount() {
    this.setState({ markers: this.props.filterMarkers });
  }

  openMarker(marker){
    // call props to call the function to open infowindow
    this.props.openInfo(marker);
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
          placeholder="Filter locations"
        />
        <ul role="list " className="location-list">
          {this.state.markers &&
            this.state.markers.length &&
            this.state.markers.map((marker, i) => (
              <li className="box" key={i}>
                <a tabIndex="0" role="button"
                onClick={this.props.openInfo.bind(this, marker)}
                >
                  {marker.title}
                </a>
              </li>
            ))}
          ;
        </ul>
        <button className="button">Show/Hide Locations</button>
      </div>
    );
  }
}

export default LocationList;
