function mostrarErroresComoAlertasConRetraso(errores) {
  const alertsContainer = document.getElementById("alerts-container");
  
  alertsContainer.innerHTML = "";
  if (errores.length == 0) return;

  errores.forEach((error, index) => {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add(
      "alert",
      "alert-danger",
      "my-2",
      "animate__animated",
      "animate__backInRight"
    );
    alertDiv.textContent = error.msg;

    // Mostrar cada alerta con un retraso de 3 segundos entre ellas
    setTimeout(() => {
      alertsContainer.appendChild(alertDiv);
    }, index * 400); // index * 3000 milisegundos = retraso de 3 segundos entre cada alerta

    // Cerrar cada alerta automáticamente después de 15 segundos
    setTimeout(() => {
      alertDiv.classList.add("animate__backOutRight");
      setTimeout(() => {
        alertDiv.remove();
      }, 3000);
    }, 1000 - (index + 1) * 1000 + 6 * 1000); // (index + 1) * 15000 milisegundos = cierre después de 15 segundos desde la aparición
  });
}
