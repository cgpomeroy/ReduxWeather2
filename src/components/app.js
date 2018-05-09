import React, { Component } from 'react';

import SearchBar from '../containers/SearchBar';
import WeatherList from '../containers/WeatherList'

export default class App extends Component {
  render() {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100vh" }}>
            <img src="../../cloud1.png" style={{position: "fixed", left: "24%", top: "37%"}}/>
            <img src="../../cloud2.png" style={{position: "fixed", right: "28%", top: "32%"}}/>
            <div className="shadow" style={{maxWidth: "60%", color: "white", minHeight: "30%", backgroundColor: "rgba(54,124,214,.9)",
                borderRadius: "25px", boxShadow: "100px black"}}>
                <SearchBar style={{opacity: 0, backgroundColor: "rgba(54,124,214,0.1)"}}/>
                <WeatherList style={{opacity: 0}}/>
            </div>
        </div>
    );
  }
}
