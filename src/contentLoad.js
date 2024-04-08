export function contentLoad(Info) {
  const weather_cont = document.querySelector("#weather_cont");
  const hero = document.createElement("div");
  const forecast = document.createElement("div");
  hero.id = "hero";

  weather_cont.innerHTML = "";
  hero.innerHTML = `
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
