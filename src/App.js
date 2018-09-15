import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './components/Map'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
        <Map/>
    );
  }
}


export default App;
