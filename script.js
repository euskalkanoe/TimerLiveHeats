document.getElementById("applyColor").addEventListener("click", () => {
  const hex = document.getElementById("colorPicker").value;
  const r = parseInt(hex.substr(1,2), 16);
  const g = parseInt(hex.substr(3,2), 16);
  const b = parseInt(hex.substr(5,2), 16);
  
  console.log("Color seleccionado:", r, g, b);
  
  // Aquí en el futuro iría la parte de enviar al dispositivo (BLE, API, etc.)
});
