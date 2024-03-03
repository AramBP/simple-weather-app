/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import "./info.css";
import Forecast from "./Forecast";

export default function Info({ nameCity }) {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [error, setError] = useState(null);

  const date = new Date();

  //only get get current location once
  useEffect(() => {
    if (nameCity) {
      getCoordsByName(nameCity);
    } else {
      getCurrentLocation((error, location) => {
        if (error) {
          setError(error.message);
        } else {
          setLat(location.latitude);
          setLon(location.longitude);
        }
      });
    }
  }, [nameCity]);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      mainApiRequest(lat, lon);
    }
  }, [lat, lon]);

  function mainApiRequest(lat, lon) {
    axios
      .get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: lat,
          lon: lon,
          limit: 1,
          appid: "12da728ac853596858313e80808c93d2",
          units: "metric",
        },
      })
      .then(function (response) {
        setWeatherInfo({
          icon: response.data.weather[0].icon,
          city: response.data.name,
          country: response.data.sys.country,
          desc: response.data.weather[0].description,
          temp: response.data.main.temp,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getCoordsByName(city) {
    axios
      .get("http://api.openweathermap.org/geo/1.0/direct", {
        params: {
          q: `${city}`,
          limit: 1,
          appid: "12da728ac853596858313e80808c93d2",
        },
      })
      .then(function (response) {
        setLat(response.data[0].lat);
        setLon(response.data[0].lon);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getCurrentLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          callback(null, { latitude: latitude, longitude: longitude });
        },
        function (error) {
          callback(error);
        }
      );
    } else {
      callback(new Error("Geolocation is not supported by this browser."));
    }
  }

  function ImageIcon(icon) {
    return (
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather Icon"
      />
    );
  }

  return (
    <>
      <div className="weatherInfo">
        <div className="icon">{ImageIcon(weatherInfo.icon)}</div>
        <div className="info">
          <ul className="date">
            {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
          </ul>
          <ul className="country">
            {weatherInfo.city}, {weatherInfo.country}
          </ul>
          <ul className="temp">{weatherInfo.temp} °C</ul>
          <ul className="description">{weatherInfo.desc}</ul>
        </div>
      </div>
      {lat !== null && <Forecast lat={lat} lon={lon}/>}
      
    </>
  );
}
