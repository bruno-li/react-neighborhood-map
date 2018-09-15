import React, { Component } from "react";
import { render } from "react-dom";

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(document.getElementById("myMap"), {
      zoom: 12.6,
      center: { lat: 40.758896, lng: -73.98513 }
    });
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyBC5LUDDNnbuLVJp32DdYn_tXv8ACDZda0`;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      //We cannot access google.maps until it's finished loading
      s.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  render() {
    return <div className="map-container" id="myMap" />;
  }
}

export default Map;
