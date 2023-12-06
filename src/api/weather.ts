export async function Weather(elementId: string): Promise<void> {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7db644329fmsh52b412170f59829p169394jsn670535384297",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch("https://weatherapi-com.p.rapidapi.com/ip.json?q=200.115.56.63", options);
    const data = await response.json();

    // Obtén el elemento HTML donde deseas mostrar los datos
    const dataContainer = document.getElementById(elementId);

    // Verifica si el elemento existe antes de acceder a sus propiedades
    if (dataContainer) {
      // Muestra los datos en el elemento HTML
      dataContainer.innerHTML = `<p>País: ${data.location.country}</p>
                                 <p>Ciudad: ${data.location.name}</p>
                                 <p>Región: ${data.location.region}</p>`;
    } else {
      console.error(`Elemento con ID '${elementId}' no encontrado.`);
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);

    // En caso de error, muestra un mensaje de error en el elemento HTML
    const dataContainer = document.getElementById(elementId);
    if (dataContainer) {
      dataContainer.innerHTML = "Error al obtener datos.";
    }
  }
}
