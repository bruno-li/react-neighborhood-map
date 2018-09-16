import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);
    // retain object instance when used in the function
    this.initMap = this.initMap.bind(this);

    this.state = {

      markers: [
        {
          lat: 40.750298,
          long: -73.993324,
          name: "Madison Square Garden"
        },
        {
          lat: 40.748817,
          long: -73.985428,
          name: "Empire State Building"
        },
        {
          lat: 40.689247,
          long: -74.044502,
          name: "Statue of Liberty"
        },
        {
          lat: 40.712742,
          long: -74.013382,
          name: "One World Trade Center"
        },
        {
          lat: 40.785091,
          long: -73.968285,
          name: "Madison Square Garden"
        }
      ]
    };
  }

  componentDidMount() {
    if (!window.google) {
      let script = document.createElement("script");
      let tag = document.getElementsByTagName("script")[0];
      script.type = "text/javascript";
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyBC5LUDDNnbuLVJp32DdYn_tXv8ACDZda0`;
      script.async = true;
      script.onerror = function() {
        document.write(
          "Google Maps can't be loaded. Please check your connection and reload the page."
        );
      };
      tag.parentNode.insertBefore(script, tag);

      //We cannot access google.maps until it's finished loading
      script.addEventListener("load", e => {
        this.initMap();
      });
    } else {
      this.initMap();
    }
  }

  initMap() {
    const map = new window.google.maps.Map(document.getElementById("myMap"), {
      zoom: 12.6,
      center: { lat: 40.758896, lng: -73.98513 }
    });
    this.markersList(map);
  }


  markersList(map) {
    let self = this;

    this.state.markers.forEach(marker => {
      const location = {lat: marker.lat, lng: marker.long}

      let mark = new window.google.maps.Marker({
        position: location,
        map: map,
        title: marker.name
      })
    })
  }


  render() {
    return <div className="map-container" id="myMap" />;
  }
}

export default Map;
