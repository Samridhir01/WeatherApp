import React, { useState } from "react";
import './weather.css';


const api = {
key: "beb780aeb8505a8eb1c88d438b89fd9a",
base: "https://api.openweathermap.org/data/2.5/"
}



const Weather = () => {
    const [ query, setQuery]= useState('');
    const [weather, setWeather] = useState({

    })
    const [welcomeTextVisible, setWelcomeTextVisible] = useState(true); // State for welcome text



const search = evt => {
    if (evt.key == "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then (result => {
           setWeather(result);
           setQuery('');
           setWelcomeTextVisible(false);
           console.log(result);
           
            
        })
    }
}

const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]; 
    let year = d.getFullYear();

    return `${day}, ${date}, ${month}, ${year}`

}

// const weatherCondition = weather.weather[0].main;


const className = weather?.main
? (weather.weather[0].main.includes('Clouds') ? 'cloudy' :
   weather.weather[0].main.includes('Rain') ? 'rainy' :
   weather.weather[0].main.includes('Snow') || weather.main.temp < 10 ? 'cold' :
   weather.weather[0].main.includes('Haze') ? 'haze' :
   weather.weather[0].main.includes('Clear') ? 'clear' :
   weather.weather[0].main.includes('Sunny') ? 'sunny' :
   weather.weather[0].main.includes('Mist') ? 'mist' :
   weather.weather[0].main.includes('Thunderstorm') ? 'thunderstorm' :
   'undefined')
: 'undefined';




// (typeof weather.main  != "undefined") ? ((weather.main.temp > 30) ? 'app warm' : 'app'): 'app'


    return(

 
        <div className=  {className} >

<main>

    <div className="search-box">
        <input type="text" 
        className="search-bar"
        placeholder=" Search Your Location....."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyPress={search}
        /> 

    </div>

    {welcomeTextVisible && (
                    <div className="hero-content">
                        <h1>Welcome to ThermoDaily</h1>
                        <p> See Today’s Temperature Like Never Before</p>
                    </div>
                )}

    {(typeof weather.main != "undefined") ? (
        <div>
        <div className="location-box">
            <div className="location">
                  <h1>  {weather.name} , {weather.sys.country} </h1>
                  <div className="date">
                    {dateBuilder(new Date())}</div>
                    <div className="weather-box">
                        <div className="temp">
                            {Math.round(weather.main.temp)}°C.
                        </div>
                        <div className="weather"> {weather.weather[0].main}</div>
                    </div>
            </div>
        </div>
    </div>
    ) : ('')}
    
</main>

        </div>

    
    )
}

export default Weather;