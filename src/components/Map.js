import React, { Component } from "react";
import { render } from "react-dom";

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      {
        zoom: 13,
        center: { lat: 40.758896, lng: -73.985130 }
      }
    );
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyBC5LUDDNnbuLVJp32DdYn_tXv8ACDZda0`;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  render() {
    return (<div style={{ width: 500, height: 500 }} id={this.props.id} />);
  }
}

export default Map;
