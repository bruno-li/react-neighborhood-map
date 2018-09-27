import React, { Component } from "react";
import LocationList from "./LocationList";
import madison from "../img/madison.jpg";
import empireState from "../img/empire.jpg";
import centralPark from "../img/central_park.jpg";
import timesSquare from "../img/times_square.jpg";
import wallStreet from "../img/wallstreet.jpg";
import worldTrade from "../img/world_trade.jpg";

class Map extends Component {
  constructor(props) {
    super(props);
    // retain object instance when used in the function
    this.initMap = this.initMap.bind(this);
    this.markersList = this.markersList.bind(this);
    this.openMarker = this.openMarker.bind(this);


    this.state = {
      infoWindow: '',
      map: '',
      filterMarkers: [],
      markers: [
        {
          lat: 40.750298,
          long: -73.993324,
          name: "Madison Square Garden",
          photo: madison
        },
        {
          lat: 40.748817,
          long: -73.985428,
          name: "Empire State Building",
          photo: empireState
        },
        {
          lat: 40.705842,
          long: -74.008468,
          name: "Wall Street",
          photo: wallStreet
        },
        {
          lat: 40.712742,
          long: -74.013382,
          name: "One World Trade Center",
          photo: worldTrade
        },
        {
          lat: 40.785091,
          long: -73.968285,
          name: "Central Park",
          photo: centralPark
        },
        {
          lat: 40.758896,
          long: -73.98513,
          name: "Times Square",
          photo: timesSquare
        }
      ]
    };
  }

  componentDidMount() {
 // initlialize map once the google map script tag is loaded into the DOM
    if (!window.google) {
      let script = document.createElement("script");
      let tag = document.getElementsByTagName("script")[0];
      script.type = "text/javascript";
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyBC5LUDDNnbuLVJp32DdYn_tXv8ACDZda0`;
      script.async = true;

      // error handling message if map fails to load
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
    }
  }

  // initiliaze map with a default location and zoom
  initMap() {
    const map = new window.google.maps.Map(document.getElementById("myMap"), {
      zoom: 12,
      center: { lat: 40.758896, lng: -73.98513 }
    });

    let InfoWindow = new window.google.maps.InfoWindow({});

    this.setState({ map: map, infoWindow: InfoWindow });
    this.markersList(map);
  }

  // loop though the list of location from the state management
  // then initialize a new Marker object according to list
  markersList(map) {

    let self = this;

    this.state.markers.forEach(marker => {
      const location = { lat: marker.lat, lng: marker.long };

      let mark = new window.google.maps.Marker({
        map: map,
        position: location,
        title: marker.name,
        name: marker.name,
        photo: marker.photo,
        animation: window.google.maps.Animation.DROP
      });

        /* event listener to send request of 
        the marker to the openMarker function 
        which fetches the data from foursquare */
      mark.addListener("click", function() {
        self.openMarker(mark);
      });
      
      //push the location to an array, to pass as a prop for LocationList component for data use
      let virtMarker = this.state.filterMarkers;
      virtMarker.push(mark);
      this.setState({ filterMarkers: virtMarker });
    });
  }

  openMarker(marker) {
    // fetches foursquare api with my unique client id and secret
    const clientId = "BVHR03BJ55MAF4NBUNKM5BV3U3XBEN0DSCJQBCJI1ZABIEO0\n";
    const clientSecret = "Z51JLSAVQYFCZBACBRXIBP01U5F2BDUZB3UZZKUNY1HY3ATH\n";
    const url = `https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20130815&ll=${marker
      .getPosition()
      .lat()},${marker.getPosition().lng()}&limit=1`;
    let info = this.state.infoWindow;

    // checks if infoWindow is not already open on the current marker
    if (info.marker !== marker) {
      info.marker = marker;
      info.open(this.state.map, marker);
      marker.setAnimation(window.google.maps.Animation.BOUNCE);

      // set a timeout for animation to prevent marker to bounce indefinetily
      setTimeout(function() {
        marker.setAnimation(null);
      }, 1000);
      this.markerInfo(url);
    }
  }

  markerInfo(url) {
    // fetches foursquare api data
    let self = this.state.infoWindow;
    fetch(url)
      .then(function(resp) {
        // error handling message if unable to load data
        if (resp.status !== 200) {
          const err = "Unable to load data. Try refreshing page.";
          this.setState({ infoWindow: err });
        }
        // checkes the retrive text in the response
        resp.json().then(function(data) {
          let place = data.response.venues[0];
          let info = `
             <div id='marker'>
             <img src="${self.marker.photo}" alt="${
            self.marker.name
          } image"/><h1>${self.marker.title}</h1><h2>Address:</h2><p>${
            place.location.address
          }, ${place.location.city}, ${place.location.state}</p>
             </div>`;
          self.setContent(info);
        });
      })
      .catch(function(err) {
        const error = "Unable to load data. Try refreshing page.";
        self.setContent(error);
      });
  }

  render() {
    return (
      <div>
        <div className="map-container" role="application" id="myMap" />
        <LocationList
        filterMarkers={this.state.filterMarkers}
        openInfo={this.openMarker}
        infoWindow={this.state.infoWindow}
        />
      </div>
    );
  }
}

export default Map;
