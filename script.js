let cityList = [];

// Load cities.json
fetch('cities.json')
  .then(response => response.json())
  .then(data => cityList = data);

// Show dropdown suggestions
function showSuggestions() {
  const input = document.getElementById("cityInput").value.toLowerCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (!input) return;

  const matches = cityList.filter(city =>
    city.toLowerCase().startsWith(input)
  ).slice(0, 10); // Limit to top 10 matches

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

// Get weather data
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "your_api_key_here"; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const iconMap = {
    Clear: "wi-day-sunny",
    Clouds: "wi-cloudy",
    Rain: "wi-rain",
    Drizzle: "wi-sprinkle",
    Thunderstorm: "wi-thunderstorm",
    Snow: "wi-snow",
    Mist: "wi-fog",
  };
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const weatherMain = data.weather[0].main;
      const iconClass = iconMap[weatherMain] || "wi-na";
      const result = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <i class="wi ${iconClass}" style="font-size: 48px;"></i>
        <p><strong>${data.weather[0].main}</strong>: ${data.weather[0].description}</p>
        <p>🌡️ Temp: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
      `;
      document.getElementById("weatherResult").innerHTML = result;
    } else {
      document.getElementById("weatherResult").innerHTML = "<p>City not found.</p>";
    }
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = "<p>Error fetching weather data.</p>";
  }
}
