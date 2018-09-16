import React, { Component } from "react";

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
      let script = document.createElement("script");
      let tag = document.getElementsByTagName("script")[0];
      script.type = "text/javascript";
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyBC5LUDDNnbuLVJp32DdYn_tXv8ACDZda0`;
      script.async = true;
      script.onerror = function() {
        document.write("Google Maps can't be loaded. Please check your connection and reload the page.");
      };
      tag.parentNode.insertBefore(script, tag);
      //We cannot access google.maps until it's finished loading
      script.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }
  render() {
    return <div className="map-container" id="myMap"/>;
  }
}

export default Map;
