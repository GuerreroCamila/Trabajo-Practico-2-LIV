let mapa = L.map('mapa').setView([-24.7821, -65.4232], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

let historial = [];
let marcadores = [];
let trazo = L.polyline([], {color: 'red'}).addTo(mapa);

let btnAgregar = document.getElementById("btnAgregar");
let btnLimpiar = document.getElementById("btnLimpiar");
let listaHistorial = document.getElementById("listaHistorial");
let contenedorError = document.getElementById("mensajeError");

btnAgregar.addEventListener("click", function() {
    navigator.geolocation.getCurrentPosition(agregarPunto, mostrarError);
});

function agregarPunto(posicion) {
    let lat = posicion.coords.latitude;
    let lng = posicion.coords.longitude;
    let punto = [lat, lng];

    historial.push(punto);
    trazo.addLatLng(punto);
    
    let nuevoMarcador = L.marker(punto).addTo(mapa);
    marcadores.push(nuevoMarcador);
    
    mapa.setView(punto, 15);

    let item = document.createElement("li");
    item.innerText = historial.length + " - Lat: " + lat.toFixed(5) + ", Lng: " + lng.toFixed(5);
    listaHistorial.appendChild(item);

    contenedorError.innerText = "";
}

function mostrarError(error) {
    contenedorError.innerText = "No se pudo obtener la ubicación: " + error.message;
}

btnLimpiar.addEventListener("click", function() {
    historial = [];
    trazo.setLatLngs([]);
    listaHistorial.innerHTML = "";
    contenedorError.innerText = "";

    for (let i = 0; i < marcadores.length; i++) {
        mapa.removeLayer(marcadores[i]);
    }
    marcadores = [];
});