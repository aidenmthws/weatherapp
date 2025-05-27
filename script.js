let cityList = [];

// Load cities.json
fetch('cities.json')
  .then(response => response.json())
  .then(data => cityList = data);

// WeatherIcons mapping
const iconMap = {
  Clear: "wi-day-sunny",
  Clouds: "wi-cloudy",
  Rain: "wi-rain",
  Drizzle: "wi-sprinkle",
  Thunderstorm: "wi-thunderstorm",
  Snow: "wi-snow",
  Mist: "wi-fog",
  Smoke: "wi-smoke",
  Haze: "wi-day-haze",
  Dust: "wi-dust",
  Fog: "wi-fog",
  Sand: "wi-sandstorm",
  Ash: "wi-volcano",
  Squall: "wi-strong-wind",
  Tornado: "wi-tornado"
};

function showSuggestions() {
  const input = document.getElementById("cityInput").value.toLowerCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (!input) return;

  const matches = cityList.filter(city =>
    city.toLowerCase().startsWith(input)
  ).slice(0, 10);

  matches.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.onclick = () => {
      document.getElementById("cityInput").value = city;
      suggestions.innerHTML = "";
    };
    suggestions.appendChild(li);
  });
}

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "9f2c0829c7d1ea3f50e27484aab274b3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.classList.remove("visible");

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const main = data.weather[0].main;
      const iconClass = iconMap[main] || "wi-na";

      const result = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <i class="wi ${iconClass} weather-icon"></i>
        <p><strong>${main}</strong>: ${data.weather[0].description}</p>
        <p>🌡️ Temp: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
      `;
      weatherDiv.innerHTML = result;
    } else {
      weatherDiv.innerHTML = "<p>City not found.</p>";
    }
    setTimeout(() => weatherDiv.classList.add("visible"), 10);
  } catch (error) {
    weatherDiv.innerHTML = "<p>Error fetching weather data.</p>";
    setTimeout(() => weatherDiv.classList.add("visible"), 10);
  }
}
