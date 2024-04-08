export function contentLoad(Info) {
  const weather_cont = document.querySelector("#weather_cont");
  const hero = document.createElement("div");
  const forecast = document.createElement("div");

  weather_cont.innerHTML = "";

  hero.id = "hero";
  hero.innerHTML = `
  <div id="main">
    <div id="main_div">
      <div id="hero_icon">
      <p id="location_country">${Info.Location.CityName},${Info.Location.CountryName}</p>
        <img src="${Info.Today.ConditionTodayIcon}">
        <p id="condition">${Info.Today.ConditionToday}</p>
        <p id="current">Feels like ${Info.Today.TempToday} C°</p>
      </div>
      <div id="hero_content">
          <div id="max_min_div">
            <p id="max">${Info.Today.TempTodayMax}</p>
            <p id="min">${Info.Today.TempTodayMin}</p>
          </div>
      </div>
    </div>
  </div>
  <div id="secondary">
    <div id="wind" class="box">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weather-dust</title><path d="M3 5C3 4.4 3.4 4 4 4H5C5.6 4 6 4.4 6 5S5.6 6 5 6H4C3.4 6 3 5.6 3 5M4 13C4 12.4 4.4 12 5 12H6C6.6 12 7 12.4 7 13S6.6 14 6 14H5C4.4 14 4 13.6 4 13M4 16C3.4 16 3 16.4 3 17S3.4 18 4 18H9C9.6 18 10 17.6 10 17S9.6 16 9 16H4M18 5C18 4.4 18.4 4 19 4H21C21.6 4 22 4.4 22 5S21.6 6 21 6H19C18.4 6 18 5.6 18 5M7 20C6.4 20 6 20.4 6 21S6.4 22 7 22H11C11.6 22 12 21.6 12 21S11.6 20 11 20H7M3 10C2.4 10 2 9.6 2 9S2.4 8 3 8H12C13.1 8 14 7.1 14 6S13.1 4 12 4C11.4 4 10.9 4.2 10.6 4.6C10.2 5 9.6 5 9.2 4.6C8.8 4.2 8.8 3.6 9.2 3.2C9.9 2.5 10.9 2 12 2C14.2 2 16 3.8 16 6S14.2 10 12 10H3M19 12C19.6 12 20 11.6 20 11S19.6 10 19 10C18.7 10 18.5 10.1 18.3 10.3C17.9 10.7 17.3 10.7 16.9 10.3C16.5 9.9 16.5 9.3 16.9 8.9C17.4 8.3 18.2 8 19 8C20.7 8 22 9.3 22 11S20.7 14 19 14H10C9.4 14 9 13.6 9 13S9.4 12 10 12H19M18 18H13C12.4 18 12 17.6 12 17S12.4 16 13 16H18C19.7 16 21 17.3 21 19S19.7 22 18 22C17.2 22 16.4 21.7 15.9 21.1C15.5 20.7 15.5 20.1 15.9 19.7C16.3 19.3 16.9 19.3 17.3 19.7C17.5 19.9 17.7 20 18 20C18.6 20 19 19.6 19 19S18.6 18 18 18Z" /></svg>
        <p>Wind</p>
      </div>
      <p>20 km/h </p>
    </div>
    <div id="humidity" class="box">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>water-percent</title><path d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z" /></svg>
        <p>Humidity</p>
      </div>
      <p>50%</p>
    </div>
    <div id="uv" class="box">
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weather-sunny</title><path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" /></svg>
      <p>UV Index</p>
      </div>
      <p>4</p>
    </div>
    <div id="visibility" class="box">
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>eye-outline</title><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" /></svg>
      <p>Visibility</p>
      </div>
      <p>20 km</p>
    </div>
  </div>
  `;

  forecast.id = "forecast";

  for (let j = 0; j < Info.week.length; j++) {
    let card = document.createElement("div");
    card.id = "card";

    card.innerHTML = `
    <div id="day">
      <p id="weekday_name">${Info.week[j].WeekdayDay}</p>
    </div>
    <div id="day_water">
      <div id="precipitation_div">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>water</title><path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z" /></svg>
        <p id="precipitationDay">${Info.week[j].WeekdayRain}%</p>
      </div>
      <div id="day_info">
        <img src=${Info.week[j].WeekdayMorningConditionIcon}>
        <img src=${Info.week[j].WeekdayNightConditionIcon}>
        <p id="day_max_temp">${Info.week[j].WeekdayMax}°</p>
        <p id="day_min_temp">${Info.week[j].WeekdayMin}°</p>
      </div>
    </div>
    `;

    forecast.appendChild(card);
  }

  weather_cont.appendChild(hero);
  weather_cont.appendChild(forecast);
}
