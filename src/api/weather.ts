export async function Weather(elementId: string): Promise<void> {}

const response = await fetch(
  "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=AgQKRAWPFGfbAOTt7OhoYIWHON5qAbxt&q=-33%2C353593%2C%20-63%2C717729&language=es-AR"
);

if (response.ok) {
  const data = await response.json();
  const dataContainer: HTMLElement | null = document.getElementById(elementId);

  if (dataContainer) {
    dataContainer.innerHTML = `<p>País: ${data.location.country}</p>
                               <p>Región: ${data.location.region}</p>
                               <p>Ciudad: ${data.location.name}</p>`;
  } else {
    console.error("No encontrado el HTMLElement");
  }
}
