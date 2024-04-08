import _ from "lodash";
import "./style.css";
import { format, isToday } from "date-fns";
import { staticLoad } from "./staticLoad";
import { contentLoad } from "./contentLoad";
import "./reset.css";
// ///////////////////////////////////////////
staticLoad();
///////////////////////////////////////////////

const header = document.getElementById("header");
const content = document.getElementById("content");
const search_input = document.querySelector("#search_cont");
const search_btn = document.querySelector("#search_btn");
const form = document.querySelector("#form");
const dropdown = document.querySelector("#dropdown");
///////////////////////////////

dropdown.addEventListener("click", (event) => {
  if (event.target.tagName === "DIV") {
    const selectedCity = event.target.textContent;
    document.querySelector("#search_cont").value = selectedCity;
    getInfo();
    form.reset();
  }
});

search_input.addEventListener("input", async () => {
  const inputValue = search_input.value.trim();
  if (inputValue.length >= 3) {
    // Check if input length is sufficient for search
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=105d9db29b9245eeb2491919240704&q=${inputValue}`
    );
    const cities = await response.json();
    showDropdown(cities);
  } else {
    hideDropdown();
  }
});

function showDropdown(cities) {
  const dropdown = document.getElementById("dropdown");
  dropdown.innerHTML = "";
  cities.forEach((city) => {
    const option = document.createElement("div");
    option.textContent = `${city.name}, ${city.region}, ${city.country}`;
    option.addEventListener("click", () => {
      search_input.value = `${city.name}, ${city.region}, ${city.country}`;
      hideDropdown();
    });
    dropdown.appendChild(option);
  });
  dropdown.style.display = "block";
}

function hideDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.innerHTML = "";
  dropdown.style.display = "none";
}

async function getInfo() {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=105d9db29b9245eeb2491919240704&q=${search_input.value}&days=7&aqi=no&alerts=no`
  );
  const weatherInfo = await response.json();
  const Info = parseInfo(weatherInfo);
  contentLoad(Info);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getInfo();

  form.reset();
  hideDropdown();
});

function parseInfo(weatherInfo) {
  const week = [];

  for (let i = 0; i < weatherInfo.forecast.forecastday.length; i++) {
    const date = new Date(weatherInfo.forecast.forecastday[i].date);
    let dayOfWeek = format(date, "EEEE");

    if (isToday(date)) {
      dayOfWeek = "Today";
    }

    const weekdayInfo = {
      WeekdayDay: dayOfWeek,
      ConditionWeekday: weatherInfo.forecast.forecastday[i].day.condition.text,
      ConditionWeekdayIcon:
        weatherInfo.forecast.forecastday[i].day.condition.icon,
      WeekdayMax: weatherInfo.forecast.forecastday[i].day.maxtemp_c,
      WeekdayMin: weatherInfo.forecast.forecastday[i].day.mintemp_c,
      WeekdayAvg: weatherInfo.forecast.forecastday[i].day.avgtemp_c,
      WeekdayRain: weatherInfo.forecast.forecastday[i].day.daily_chance_of_rain,
      WeekdayMorningConditionText:
        weatherInfo.forecast.forecastday[i].hour[10].condition.text,
      WeekdayMorningConditionIcon:
        weatherInfo.forecast.forecastday[i].hour[10].condition.icon,
      WeekdayNightConditionText:
        weatherInfo.forecast.forecastday[i].hour[20].condition.text,
      WeekdayNightConditionIcon:
        weatherInfo.forecast.forecastday[i].hour[20].condition.icon,
    };

    week.push(weekdayInfo);
  }

  return {
    Location: {
      CityName: weatherInfo.location.name,
      CountryName: weatherInfo.location.country,
    },
    Today: {
      DateToday: weatherInfo.forecast.forecastday[0].date,
      ConditionToday: weatherInfo.current.condition.text,
      ConditionTodayIcon: weatherInfo.current.condition.icon,
      TempToday: weatherInfo.current.temp_c,
      TempTodayMax: weatherInfo.forecast.forecastday[0].day.maxtemp_c,
      TempTodayMin: weatherInfo.forecast.forecastday[0].day.mintemp_c,
      Sunrise: weatherInfo.forecast.forecastday[0].astro.sunrise,
      Sunset: weatherInfo.forecast.forecastday[0].astro.sunset,
      Moonphase: weatherInfo.forecast.forecastday[0].astro.moon_phase,
      Moonset: weatherInfo.forecast.forecastday[0].astro.moonset,
      Moonrise: weatherInfo.forecast.forecastday[0].astro.moonrise,
      Pressure: weatherInfo.current.pressure_mb,
      Pressure_in: weatherInfo.current.pressure_in,
    },
    week,
  };
}
