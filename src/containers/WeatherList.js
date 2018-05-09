import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class WeatherList extends Component {
    constructor(props){
        super(props);
        this.renderWeather = this.renderWeather.bind(this);
    }

    renderWeather(cityData){
        const currentTemp = Math.floor(1.8*(cityData.list[0].main.temp-273)+32);
        const currentDesc = cityData.list[0].weather[0].description.replace(/\b\w/g, l => l.toUpperCase());
        const currentHumi = `${cityData.list[0].main.humidity}% Humidity`;
        const {id, name} = cityData.city;

        let currentMax = -1000;
        let currentMin = 1000;
        let currentDay = new Date(cityData.list[0].dt*1000).customFormat("#MMM# #DD#");
        let weatherIcons = {};
        const forecasts = [];

        for(const forecast in cityData.list){

            const date = new Date(cityData.list[forecast].dt*1000).customFormat("#MMM# #DD#");
            const max = Math.floor(1.8*(cityData.list[forecast].main.temp_max-273)+32);
            const min = Math.floor(1.8*(cityData.list[forecast].main.temp_min-273)+32);
            const icon = cityData.list[forecast].weather[0].icon;

            console.log(`The current day is: ${currentDay}. The date of the current forecast in the loop is ${date}`);

            if(currentDay === date){
                if(max > currentMax){
                    currentMax = max;
                    console.log(`The new currentMax is ${currentMax}`);
                }
                if(min < currentMin){
                    currentMin = min;
                    console.log(`The new currentMin is ${currentMin}`);
                }

                console.log(`Night? ${icon.substr(icon.length-1)}`)

                if(weatherIcons[icon]){
                    weatherIcons[icon] ++;
                }else{
                    weatherIcons[icon] = 1;
                }
            }
            else{
                console.log(`How many different icons? ${Object.keys(weatherIcons).length}`);
                let arr = [];
                for (let icon in weatherIcons){
                    arr.push([icon, weatherIcons[icon]]);
                }
                arr.sort((a, b) => {
                   return a[1] - b[1];
                });
                weatherIcons = {};
                console.log(`Sort length: ${arr.length}`);
                forecasts.push({date: currentDay, max: currentMax, min: currentMin, icon: arr[0][0]});
                arr = [];
                console.log(`Forecasts array updated: ${forecasts.length}`);
                currentDay = date;
                console.log(`The new current day is ${currentDay}`);
                currentMax = max;
                currentMin = min;
            }
        }
        while(forecasts.length == 5){

            return (
                <div className="noPadding" key={Date.now()}>
                    <div style={{width: "80%", margin: "0 auto"}}>
                        <div key={id} style={{display: "flex", alignContent: "center", lineHeight: 1}}>
                            <div style={{flex: 1}}></div>
                            <div style={{fontSize: "14em", position: "relative", flex: 4}}>
                                <div>{currentTemp}<span style={{fontSize: ".45em", position: "absolute", top: "7%"}}>°
                                    <span style={{fontSize: ".4em", position: "absolute", top: "7%", fontFamily: "'Open Sans Light', sans-serif" }}>F</span></span></div>
                            </div>
                            <div style={{alignSelf: "center", fontSize: "1.6em", flex: 3, lineHeight: 1.5, paddingTop: "1em"}}>
                                <div>{currentDesc}</div>
                                <div>{currentHumi}</div>
                            </div>
                        </div>
                    </div>
                    <div className="dayForecast" style={{display: "flex", fontSize: "2em", width: "100%",
                        backgroundColor: "white", borderRadius: "0 0 25px 25px", justifyContent:"center",
                        alignItems: "center", padding: ".5em .1em .5em 0"}}>
                        <div className="noPadding rightBorder" style={{color: "black", textAlign: "center", flex: 1}}>
                            <div className="noPadding" style={{fontSize: ".65em", color: "#B3B5B7",
                                padding: "0 !important"}}>{forecasts[0].date}</div>
                            <div className="noPadding" style={{padding: "0 !important"}}><img src={`http://openweathermap.org/img/w/${forecasts[0].icon}.png`}/></div>
                            <div className="noPadding" style={{color: "#3A4B58",padding: "0 !important"}}>{forecasts[0].max}</div>
                            <div className="noPadding" style={{color: "#96908A", padding: "0 !important"}}>{forecasts[0].min}</div>
                        </div>
                        <div className="noPadding rightBorder" style={{color: "black", textAlign: "center", flex: 1}}>
                            <div style={{fontSize: ".65em", color: "#B3B5B7"}}>{forecasts[1].date}</div>
                            <div><img src={`http://openweathermap.org/img/w/${forecasts[1].icon}.png`}/></div>
                            <div style={{color: "#3A4B58"}}>{forecasts[1].max}</div>
                            <div style={{color: "#96908A"}}>{forecasts[1].min}</div>
                        </div>
                        <div className="noPadding rightBorder" style={{color: "black", textAlign: "center", flex: 1}}>
                            <div style={{fontSize: ".65em", color: "#B3B5B7"}}>{forecasts[2].date}</div>
                            <div><img src={`http://openweathermap.org/img/w/${forecasts[2].icon}.png`}/></div>
                            <div style={{color: "#3A4B58"}}>{forecasts[2].max}</div>
                            <div style={{color: "#96908A"}}>{forecasts[2].min}</div>
                        </div>

                        <div className="noPadding rightBorder" style={{color: "black", textAlign: "center", flex: 1}}>
                            <div style={{fontSize: ".65em", color: "#B3B5B7"}}>{forecasts[3].date}</div>
                            <div><img src={`http://openweathermap.org/img/w/${forecasts[3].icon}.png`}/></div>
                            <div style={{color: "#3A4B58"}}>{forecasts[3].max}</div>
                            <div style={{color: "#96908A"}}>{forecasts[3].min}</div>
                        </div>

                        <div className="noPadding" style={{color: "black", textAlign: "center", flex: 1}}>
                            <div style={{fontSize: ".65em", color: "#B3B5B7"}}>{forecasts[4].date}</div>
                            <div><img src={`http://openweathermap.org/img/w/${forecasts[4].icon}.png`}/></div>
                            <div style={{color: "#3A4B58"}}>{forecasts[4].max}</div>
                            <div style={{color: "#96908A"}}>{forecasts[4].min}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return <div>{this.props.weather.map(this.renderWeather)}</div>
    }
}

function mapStateToProps({ weather }) {
    return { weather };
}

Date.prototype.customFormat = function(formatString){
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    var dateObject = this;
    YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
    MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=dateObject.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

    h=(hhh=dateObject.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=dateObject.getMinutes())<10?('0'+m):m;
    ss=(s=dateObject.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};

export default connect(mapStateToProps)(WeatherList);