// script.ts
document.addEventListener("DOMContentLoaded", function () {
  const apiKey: string = "7bb40db53e202dc7da26d5404411e9c4";
  let locationKey: string | null = null;

  const weatherContainer: HTMLElement | null =
    document.getElementById("weather-container");

  interface WeatherData {
    name: string;
    main: {
      temp: number;
    };
    weather: [
      {
        description: string;
      }
    ];
  }

  const getUserLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          locationKey = await getLocationKeyByCoordinates(latitude, longitude);

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

  const getWeatherData = async (): Promise<void> => {
    try {
      if (!locationKey) {
        console.error("No hay código de ubicación disponible.");
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationKey}&lon=${locationKey}&appid=${apiKey}&units=metric`
      );
      const data: WeatherData = await response.json();
      displayWeather(data);
    } catch (error) {
      console.error("Error al obtener datos meteorológicos", error);
    }
  };

  const getLocationKeyByCoordinates = async (
    latitude: number,
    longitude: number
  ): Promise<string | null> => {
    try {
      return `${latitude},${longitude}`;
    } catch (error) {
      console.error("Error al obtener las coordenadas", error);
      return null;
    }
  };

  const displayWeather = (weatherData: WeatherData): void => {
    if (weatherContainer) {
      const weatherHtml: string = `
        <div>
          <h3 class="text-xl">${weatherData.name}</h3>
          <p class="text-lg">${weatherData.main.temp}°C</p>
          <p class="text-sm">${weatherData.weather[0].description}</p>
        </div>
      `;
      weatherContainer.innerHTML = weatherHtml;
    }
  };

  getUserLocation();
});
