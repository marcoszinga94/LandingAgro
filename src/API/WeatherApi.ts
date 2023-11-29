// APIKEY = 7bb40db53e202dc7da26d5404411e9c4

document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = "7bb40db53e202dc7da26d5404411e9c4";
  const weatherContainer = document.getElementById("weather-container");

  const getUserLocation = () =>
    new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  const getLocationKeyByCoordinates = async (
    latitude: number,
    longitude: number
  ) => `${latitude},${longitude}`;

  const getWeatherData = async () => {
    try {
      const { coords } = (await getUserLocation()) as GeolocationPosition;
      const locationKey = await getLocationKeyByCoordinates(
        coords.latitude,
        coords.longitude
      );

      const response = await fetch(
        `hhttps://api.openweathermap.org/data/2.5/weather?lat=-33.44&lon=-66.55&appid=7bb40db53e202dc7da26d5404411e9c4&units=metric&lang=es`
      );
      const data = await response.json();

      displayWeather(data);
    } catch (error) {
      console.error("Error al obtener datos meteorológicos", error);
    }
  };

  const displayWeather = (weatherData: any) => {
    if (weatherContainer) {
      const weatherHtml = `
        <div class="flex flex-row">
          <img src"${weatherData.weather[0].icon}"
          <div class="flex flex-col">
            <h3 class="text-xl">Ubicacion: ${weatherData.name}</h3>
            <p class="text-lg">Temperatura: ${weatherData.main.temp}°C</p>
            <p class="text-sm">Tiempo: ${weatherData.weather[0].description}</p>
          </div>
        </div>
      `;
      weatherContainer.innerHTML = weatherHtml;
    }
  };

  getWeatherData();
});
