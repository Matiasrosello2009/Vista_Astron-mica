let apiKey = "DEMO_KEY"; 
let resultsDiv = document.getElementById("results");

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

// Mostrar resultados (imágenes o videos)
function showResults(dataArray) {
  resultsDiv.innerHTML = ""; // Limpiar resultados
  dataArray.forEach(item => {
    let mediaContent = "";

    if (item.media_type === "image") {
      mediaContent = `<img src="${item.url}" alt="${item.title}" />`;
    } else if (item.media_type === "video") {
      mediaContent = `<iframe src="${item.url}" frameborder="0" allowfullscreen></iframe>`;
    }

    resultsDiv.innerHTML += `
      <div class="card">
        ${mediaContent}
        <h3>${item.title}</h3>
        <p>${item.explanation}</p>
      </div>
    `;
  });
}
