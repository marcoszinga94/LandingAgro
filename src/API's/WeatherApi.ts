// script.ts
document.addEventListener("DOMContentLoaded", function () {
  const apiKey: string = "AgQKRAWPFGfbAOTt7OhoYIWHON5qAbxt";
  let locationKey: string | null = null;

  const weatherContainer: HTMLElement | null =
    document.getElementById("weather-container");

  // Interface para definir la estructura de los datos meteorológicos
  interface WeatherData {
    LocalizedName: string;
    Temperature: {
      Metric: {
        Value: number;
      };
    };
    WeatherText: string;
  }

  // Función para obtener la ubicación del usuario mediante su IP
  const getUserLocation = async (): Promise<void> => {
    try {
      const ipInfoResponse = await fetch("https://ipinfo.io/json");
      const ipInfoData = await ipInfoResponse.json();

      // Obtén el código de ubicación a partir de la ciudad (puedes ajustar esto según la estructura de los datos de AccuWeather)
      const city = ipInfoData.city;
      locationKey = await getLocationKey(city);

      // Llama a la función para obtener datos meteorológicos
      if (locationKey) {
        getWeatherData();
      } else {
        console.error("No se pudo obtener el código de ubicación.");
      }
    } catch (error) {
      console.error("Error al obtener la ubicación del usuario", error);
    }
  };

  // Función para obtener datos meteorológicos
  const getWeatherData = async (): Promise<void> => {
    try {
      if (!locationKey) {
        console.error("No hay código de ubicación disponible.");
        return;
      }

      const response = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
      );
      const data: WeatherData[] = await response.json();
      displayWeather(data[0]);
    } catch (error) {
      console.error("Error al obtener datos meteorológicos", error);
    }
  };

  // Función para obtener el código de ubicación de AccuWeather a partir del nombre de la ciudad
  const getLocationKey = async (city: string): Promise<string | null> => {
    try {
      const locationResponse = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
      );
      const locationData = await locationResponse.json();

      if (locationData.length > 0) {
        return locationData[0].Key;
      } else {
        console.error(
          "No se encontró el código de ubicación para la ciudad proporcionada."
        );
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el código de ubicación", error);
      return null;
    }
  };

  // Función para mostrar los datos meteorológicos en la página
  const displayWeather = (weatherData: WeatherData): void => {
    if (weatherContainer) {
      const weatherHtml: string = `
          <h1>${weatherData.LocalizedName}</h1>
          <p>${weatherData.Temperature.Metric.Value}°C</p>
          <p>${weatherData.WeatherText}</p>
        `;
      weatherContainer.innerHTML = weatherHtml;
    }
  };

  // Llama a la función al cargar la página
  getUserLocation();
});
