import React, {Component} from 'react';

class LocationList extends Component {

    render(){
        return(
             <div className="search">
                <input role="search" aria-labelledby="filter"
                 id="search-field" className="search-field"
                  type="text" placeholder="Filter"
                  value="" onChange=""/>
                  <ul className="location-list"></ul>
                <button className="button" onClick="">
                 Show/Hide Locations </button>
            </div>
        );
    }
}

export default LocationList;
