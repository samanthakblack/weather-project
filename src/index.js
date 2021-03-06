//current date and time

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

let now = new Date();

let currentTime = document.querySelector("#current-date");
currentTime.innerHTML = formatDate(now);

//city and weather

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  farhenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "a828ff66f47952eb9b27501e65625a90";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let citySearch = document.querySelector(".search");
citySearch.addEventListener("click", searchCity);

// default city on load

search("San Francisco");

// geolocate

function retrievePosition(position) {
  let apiKey = "a828ff66f47952eb9b27501e65625a90";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector(".location");
currentLocationButton.addEventListener("click", searchLocation);

// daily forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2 pb-5">
          <h5>${formatDay(forecastDay.dt)}</h5>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="50"/>
          <div class="weather-forecast-temp"><span class="max-temp">${Math.round(
            forecastDay.temp.max
          )}??</span>
          <span class="min-temp">${Math.round(
            forecastDay.temp.min
          )}??</span></div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a828ff66f47952eb9b27501e65625a90";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
