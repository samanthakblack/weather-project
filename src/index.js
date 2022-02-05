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
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
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
