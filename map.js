
const map = L.map("map", {
  scrollWheelZoom: false,
}).setView([41.8602353, 12.4747776], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const markers = L.markerClusterGroup();
lavori.forEach((l) => {
  markers.addLayer(
    L.marker([l.lat, l.lng]).bindPopup(
      `<strong>${l["placename"]}</strong>
      <br />
      ${l.city} (${l.country})
      <br>
      Committente: <strong>${l.customer}</strong>`
    )
  );
});
map.addLayer(markers);
map.fitBounds(markers.getBounds());

L.Control.Rilievi = L.Control.extend({
  onAdd: function (map) {
    const div = L.DomUtil.create("div");
    div.classList.add("leaflet-control", "leaflet-bar", "p-2");
    div.style.background = 'rgba(255, 255, 255, .6)'
    div.style.maxWidth = '250px'
    div.innerHTML = `<h3>Rilievi s.r.l.</h3>
    <p>Mappa dei lavori. Clicca su un icona per visualizzare i dettagli</p>
    <a href="#contatti">
      Contatti
    </a>`;
    return div;
  },

  onRemove: function (map) {
    // Nothing to do here
  },
});

L.control.rilievi = function (opts) {
  return new L.Control.Rilievi(opts);
};

L.control.rilievi({ position: "bottomleft" }).addTo(map);
