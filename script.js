// --- Función para pedir datos a la API ---
async function fetchEventData(eventId) {
  const query = `
    query event($id: ID!) {
      event(id: $id) {
        name
        currentScheduleIndex
        fullSchedule {
          podiums {
            heats {
              id
            }
          }
          heatsIntervalSeconds
        }
      }
    }
  `;

  const variables = { id: eventId };

  try {
    const response = await fetch("https://liveheats.com/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables
      })
    });

    const result = await response.json();
    console.log("Respuesta de la API:", result);

    // Extraemos el nombre del evento
    const eventName = result.data.event.name;
    document.getElementById("eventName").textContent = eventName;

  } catch (error) {
    console.error("Error al pedir datos:", error);
    document.getElementById("eventName").textContent = "Error al cargar";
  }
}

// --- Llamamos a la API con el id 28328 ---
fetchEventData("28328");


// --- Lógica de color (de antes) ---
document.getElementById("applyColor").addEventListener("click", () => {
  const hex = document.getElementById("colorPicker").value;
  const r = parseInt(hex.substr(1,2), 16);
  const g = parseInt(hex.substr(3,2), 16);
  const b = parseInt(hex.substr(5,2), 16);

  console.log("Color seleccionado:", r, g, b);
});
