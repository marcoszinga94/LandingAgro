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

    // Muestra los datos en el elemento HTML si existe
    if (dataContainer) {
      dataContainer.innerHTML = `<p>País: ${data.location.country}</p>
                                 <p>Ciudad: ${data.location.name}</p>
                                 <p>Región: ${data.location.region}</p>`;
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);

    // Lanza el error nuevamente para que pueda ser manejado por otras partes del código
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await Weather("dataContainer");
  } catch (error) {
    console.error("Error al obtener datos:", error);

    // Lanza el error nuevamente para que pueda ser manejado por otras partes del código
    throw error;
  }
});
