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

  // Función para obtener la ubicación del usuario mediante geoposicionamiento
  const getUserLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          locationKey = await getLocationKeyByCoordinates(latitude, longitude);

          // Llama a la función para obtener datos meteorológicos
          if (locationKey) {
            getWeatherData();
          } else {
            console.error("No se pudo obtener el código de ubicación.");
          }
        },
        (error) => {
          console.error("Error al obtener la ubicación del usuario", error);
        }
      );
    } else {
      console.error("Geolocalización no compatible en este navegador.");
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
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=es-AR`
      );
      const data: WeatherData[] = await response.json();
      displayWeather(data[0]);
    } catch (error) {
      console.error("Error al obtener datos meteorológicos", error);
    }
  };

  // Función para obtener el código de ubicación de AccuWeather a partir de coordenadas
  const getLocationKeyByCoordinates = async (
    latitude: number,
    longitude: number
  ): Promise<string | null> => {
    try {
      const locationResponse = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude},${longitude}`
      );
      const locationData = await locationResponse.json();

      if (locationData.Key) {
        return locationData.Key;
      } else {
        console.error(
          "No se encontró el código de ubicación para las coordenadas proporcionadas."
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
        <h3 class="text-xl">Ubicacion: ${weatherData.LocalizedName}</h3>
        <p class="text-lg">Temperatura: ${weatherData.Temperature.Metric.Value}°C</p>
        <p class="text-sm">Tiempo: ${weatherData.WeatherText}</p>
      `;
      weatherContainer.innerHTML = weatherHtml;
    }
  };

  // Llama a la función al cargar la página
  getUserLocation();
});
