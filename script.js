const form = document.getElementById("weather-form");
const input = document.getElementById("city-input");
const result = document.getElementById("weather-result");
const apiKey = "c9b1880a5272b38fed41a21da446fc63"; // 🔁 Replace this with your real API key

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = input.value.trim();

  if (city === "") return;

  result.innerHTML = "Loading...";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    result.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
});

function displayWeather(data) {
  const html = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Weather:</strong> ${data.weather[0].main}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
  result.innerHTML = html;
}
