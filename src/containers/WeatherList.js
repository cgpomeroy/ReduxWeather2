import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import GoogleMap from "../components/GoogleMap";


class WeatherList extends Component {

    renderWeather(cityData){
        const temps = _.map(cityData.list.map(weather => weather.main.temp), temp=> (1.8*(temp-273))+32);
        const pressure = cityData.list.map(weather => weather.main.pressure);
        const humidity = cityData.list.map(weather => weather.main.humidity);
        const {id, name} = cityData.city;
        const { lon, lat } = cityData.city.coord;


        return(
          <tr key={id}>
              <td><GoogleMap lon={lon} lat={lat} /></td>
              <td>
                <Chart
                    color="red"
                    data={temps}
                    units=" °F"
                />
              </td>
              <td>
                  <Chart
                      color="grey"
                      data={pressure}
                      units=" hPA"
                  />
              </td>
              <td>
                  <Chart
                      color="blue"
                      data={humidity}
                      units="%"
                  />
              </td>
          </tr>
        );
    }
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature</th>
                        <th>Pressure</th>
                        <th>Humidity</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps({ weather }) {
    return { weather };
}

export default connect(mapStateToProps)(WeatherList);