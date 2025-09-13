// Buscar por fecha
document.getElementById("searchByDate").addEventListener("click", () => {
  let date = document.getElementById("dateInput").value;
  if (!date) {
    alert("Por favor, elige una fecha.");
    return;
  }
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
    .then(res => res.json())
    .then(data => showResults([data]))
    .catch(err => console.error(err));
});

// Buscar imágenes aleatorias
document.getElementById("searchRandom").addEventListener("click", () => {
  let count = document.getElementById("countInput").value;
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`)
    .then(res => res.json())
    .then(data => showResults(data))
    .catch(err => console.error(err));
});

// Mostrar resultados en tarjetas
function showResults(dataArray) {
  resultsDiv.innerHTML = ""; // Limpiar resultados
  dataArray.forEach(item => {
    if (item.media_type === "image") {
      resultsDiv.innerHTML += `
        <div class="card">
          <img src="${item.url}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.explanation}</p>
        </div>
      `;
    }
  });
}