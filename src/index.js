import _ from "lodash";
import "./style.css";

const search_input = document.querySelector("#search_cont");
const search_btn = document.querySelector("#search_btn");
const form = document.querySelector("#form");

async function getInfo() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=105d9db29b9245eeb2491919240704&q=${search_input.value}&days=7&aqi=no&alerts=no`
  );
  const weatherInfo = await response.json();
  const LocInfo = parseInfoLoc(weatherInfo);
  const todayInfo = parseInfoToday(weatherInfo);
  console.log(LocInfo);
  console.log(todayInfo);
  console.log(weatherInfo);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getInfo();
});

function parseInfoLoc(weatherInfo) {
  return {
    CityName: weatherInfo.location.name,
    CountryName: weatherInfo.location.country,
  };
}

function parseInfoToday(weatherInfo) {
  return {
    DateToday: weatherInfo.forecast.forecastday[0].date,
    ConditionToday: weatherInfo.current.condition.text,
    ConditionTodayIcon: weatherInfo.current.condition.icon,
    TempToday: weatherInfo.current.temp_c,
    TempTodayMax: weatherInfo.forecast.forecastday[0].day.maxtemp_c,
    TempTodayMin: weatherInfo.forecast.forecastday[0].day.mintemp_c,
  };
}

function parseInfoWeek(weatherInfo) {
  for (let i = 0; i < weatherInfo.forecast.forecastday.length; i++) {
    return {
      WeekdayDate: weatherInfo.forecast.forecastday[i].date,
      ConditionWeekday: weatherInfo.forecast.forecastday[i].condition.text,
      ConditionWeekdayIcon: weatherInfo.forecast.forecastday[i].condition.icon,
    };
  }
}
