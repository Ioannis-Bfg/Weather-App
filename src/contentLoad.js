export function contentLoad(Info) {
  const weather_cont = document.querySelector("#weather_cont");
  const hero = document.createElement("div");

  hero.innerHTML = `
  <div id="hero_icon">
    <img src="${Info.Today.ConditionTodayIcon}">
  </div>
  <div id="hero_content">
      <p id="location_country">${Info.Location.CityName},${Info.Location.CountryName}</p>
      <p id="current">Feels like ${Info.Today.TempToday} C°</p>
      <p id="condition">${Info.Today.ConditionToday}</p>
      <div id="max_min_div">
        <p id="max">${Info.Today.TempTodayMax}</p>
        <p id="min">${Info.Today.TempTodayMin}</p>
      </div>
  </div>
  `;

  weather_cont.appendChild(hero);
}
