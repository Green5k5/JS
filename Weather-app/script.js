const BASE_URL = "http://api.weatherapi.com/v1";
const API_KEY = "e2ef0b26e0e646e7b7e225131252112";

async function getCurrentWeatherByCity(city) {
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&aqi=no`;

  const response = await fetch(url);
  const currentWeather = await response.json();
  console.log(currentWeather);
  return currentWeather;
}

async function getForecastByCity(city) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&days=1&aqi=no&alerts=no`;

  const response = await fetch(url);
  const forecast = await response.json();
  console.log(forecast);
  return forecast;
}

const locationInput = document.querySelector(".location-input");
const locationButton = document.querySelector(".location-button");

locationButton.addEventListener("click", async () => {
  const city = locationInput.value.trim();
  if (!city) return;
  await updateWeather(city);
});

locationInput.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter") return;
  const city = locationInput.value.trim();
  if (!city) return;
  await updateWeather(city);
});

function renderCurrentWeather(iconSrc, temperature, status) {
  const currentWeather = document.querySelector(".current-weather");
  currentWeather.innerHTML = "";

  if (iconSrc) {
    const currentWeatherIcon = document.createElement("img");
    currentWeatherIcon.setAttribute("class", "current-weather-icon");
    currentWeatherIcon.setAttribute("src", iconSrc);
    currentWeather.appendChild(currentWeatherIcon);
  }

  const currentWeatherTemperature = document.createElement("p");
  currentWeatherTemperature.setAttribute("class", "current-weather-temperature");
  currentWeatherTemperature.innerHTML =
    typeof temperature === "number" ? `${Math.round(temperature)}°C` : temperature;

  const currentWeatherStatus = document.createElement("p");
  currentWeatherStatus.setAttribute("class", "current-weather-status");
  currentWeatherStatus.innerHTML = status;

  currentWeather.appendChild(currentWeatherTemperature);
  currentWeather.appendChild(currentWeatherStatus);
}

function createForecastElement(iconSrc, time, temperature) {
  const forecastElement = document.createElement("div");
  forecastElement.setAttribute("class", "forecast-element");

  const forecastTime = document.createElement("p");
  forecastTime.setAttribute("class", "forecast-time");
  forecastTime.innerHTML = time;

  const forecastIcon = document.createElement("img");
  forecastIcon.setAttribute("class", "forecast-icon");
  forecastIcon.setAttribute("src", iconSrc);

  const forecastTemperature = document.createElement("p");
  forecastTemperature.setAttribute("class", "forecast-temperature");
  forecastTemperature.innerHTML = `${Math.round(temperature)}°C`;

  forecastElement.appendChild(forecastTime);
  forecastElement.appendChild(forecastIcon);
  forecastElement.appendChild(forecastTemperature);

  return forecastElement;
}

function renderForecast(forecast) {
  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";

  forecast.forEach((forecastItem) => {
    const forecastElement = createForecastElement(
      forecastItem.condition.icon,
      forecastItem.time,
      forecastItem.temp_c
    );
    forecastContainer.appendChild(forecastElement);
  });
}

function formatHour(timeString) {
  const parts = String(timeString).split(" ");
  return parts[1] || timeString;
}

function buildForecastArray(forecastJson) {
  const hours = forecastJson?.forecast?.forecastday?.[0]?.hour || [];
  if (!hours.length) return [];

  const nowEpoch = forecastJson?.current?.last_updated_epoch;
  let startIndex = 0;

  if (nowEpoch) {
    const idx = hours.findIndex((h) => h.time_epoch >= nowEpoch);
    startIndex = idx === -1 ? 0 : idx;
  }

  const slice = hours.slice(startIndex, startIndex + 5);

  return slice.map((h, i) => ({
    time: i === 0 ? "Сейчас" : formatHour(h.time),
    temp_c: h.temp_c,
    condition: { icon: h.condition.icon },
  }));
}

async function updateWeather(city) {
  try {
    const currentWeather = await getCurrentWeatherByCity(city);

    if (currentWeather?.error) {
      renderCurrentWeather(
        "",
        "—",
        currentWeather.error.message || "Ошибка получения погоды"
      );
      renderForecast([]);
      return;
    }

    const currentWeatherIcon = `http:${currentWeather.current.condition.icon}`;
    const currentWeatherTemperature = currentWeather.current.temp_c;
    const currentWeatherStatus = currentWeather.current.condition.text;

    renderCurrentWeather(
      currentWeatherIcon,
      currentWeatherTemperature,
      currentWeatherStatus
    );

    const forecastJson = await getForecastByCity(city);

    if (forecastJson?.error) {
      renderForecast([]);
      return;
    }

    const forecastArray = buildForecastArray(forecastJson);
    renderForecast(forecastArray);
  } catch (e) {
    console.log(e);
    renderCurrentWeather("", "—", "Failed to fetch (проверь HTTP/HTTPS и сеть)");
    renderForecast([]);
  }
}

updateWeather("Moscow");
