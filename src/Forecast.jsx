/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import "./Forecast.css";

export default function Forecast({ lat, lon }) {
  const [weatherForecast, setWeatherForecast] = useState({});

  useEffect(() => {
    if (lat !== null && lon !== null) {
      mainApiRequest(lat, lon);
    }
  }, [lat, lon]);

  function mainApiRequest(lat, lon) {
    axios
      .get("http://api.openweathermap.org/data/2.5/forecast", {
        params: {
          lat: lat,
          lon: lon,
          appid: "12da728ac853596858313e80808c93d2",
          units: "metric",
        },
      })
      .then(function (response) {
        console.log("Forecast:");
        console.log(response);
        setWeatherForecast({
          city: response.data.city.name,
          country: response.data.city.country,
          desc: [
            response.data.list[1].weather[0].main,
            response.data.list[2].weather[0].main,
            response.data.list[3].weather[0].main,
            response.data.list[4].weather[0].main,
            response.data.list[5].weather[0].main,
          ],
          icon: [
            response.data.list[1].weather[0].icon,
            response.data.list[2].weather[0].icon,
            response.data.list[3].weather[0].icon,
            response.data.list[4].weather[0].icon,
            response.data.list[5].weather[0].icon,
          ],
          temp: [
            response.data.list[1].main.temp,
            response.data.list[2].main.temp,
            response.data.list[3].main.temp,
            response.data.list[4].main.temp,
            response.data.list[5].main.temp,
          ],
        });
      });
  }

  useEffect(() => {
    console.log("Updated weather forecast", weatherForecast);
  }, [weatherForecast]);

  function ImageIcon(icon) {
    return (
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather Icon"
      />
    );
  }

  function upcomingDays(i) {
    var day = new Date();

    var nextDay = new Date(day);
    nextDay.setDate(day.getDate() + i);
    return nextDay;
  }

  // function NextDay(country, icon, temp, description, city) {
  //   return (
  //     <>
  //       <div className="nextday">
  //         <div className="icon">{ImageIcon(icon)}</div>
  //         <div className="info">
  //           <ul className="country">
  //             {city}, {country}
  //           </ul>
  //           <ul className="temp">{temp} °C</ul>
  //           <ul className="description">{description}</ul>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      {
        //check if weatherForecast is not empty then render
        Object.keys(weatherForecast).length > 0 && (
          <div className="ForecastContainer">
            <div className="nextday">
              <div className="iconForecast">{ImageIcon(weatherForecast.icon[0])}</div>
              <div className="infoForecast">
                <ul className="dateForecast">
                  {upcomingDays(1).getDate()}-{upcomingDays(1).getMonth() + 1}-
                  {upcomingDays(1).getFullYear()}
                </ul>
                <ul className="countryForecast">
                  {weatherForecast.city}, {weatherForecast.country}
                </ul>
                <ul className="tempForecast">{weatherForecast.temp[0]} °C</ul>
                <ul className="descriptionForecast">{weatherForecast.desc[0]}</ul>
              </div>
            </div>

            <div className="nextday">
              <div className="iconForecast">{ImageIcon(weatherForecast.icon[1])}</div>
              <div className="infoForecast">
                <ul className="dateForecast">
                  {upcomingDays(2).getDate()}-{upcomingDays(2).getMonth() + 1}-
                  {upcomingDays(2).getFullYear()}
                </ul>
                <ul className="countryForecast">
                  {weatherForecast.city}, {weatherForecast.country}
                </ul>
                <ul className="tempForecast">{weatherForecast.temp[1]} °C</ul>
                <ul className="descriptionForecast">{weatherForecast.desc[1]}</ul>
              </div>
            </div>

            <div className="nextday">
              <div className="iconForecast">{ImageIcon(weatherForecast.icon[2])}</div>
              <div className="infoForecast">
                <ul className="dateForecast">
                  {upcomingDays(3).getDate()}-{upcomingDays(3).getMonth() + 1}-
                  {upcomingDays(3).getFullYear()}
                </ul>
                <ul className="countryForecast">
                  {weatherForecast.city}, {weatherForecast.country}
                </ul>
                <ul className="tempForecast">{weatherForecast.temp[2]} °C</ul>
                <ul className="descriptionForecast">{weatherForecast.desc[2]}</ul>
              </div>
            </div>

            <div className="nextday">
              <div className="iconForecast">{ImageIcon(weatherForecast.icon[3])}</div>
              <div className="infoForecast">
                <ul className="dateForecast">
                  {upcomingDays(4).getDate()}-{upcomingDays(4).getMonth() + 1}-
                  {upcomingDays(4).getFullYear()}
                </ul>
                <ul className="countryForecast">
                  {weatherForecast.city}, {weatherForecast.country}
                </ul>
                <ul className="tempForecast">{weatherForecast.temp[3]} °C</ul>
                <ul className="descriptionForecast">{weatherForecast.desc[3]}</ul>
              </div>
            </div>

          </div>
        )
      }
    </>
  );
}
