import React, { Component } from "react";
import Map from "./components/Map";
import LocationList from "./components/LocationList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <LocationList />
        <Map />
      </div>
    );
  }
}

export default App;
