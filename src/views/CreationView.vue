<template>
  <div class="flex">
    <div class="relative w-2/3 h-screen">
      <div id="map" class="w-full h-full"></div>
      <input v-model="departureLocation" @input="placeMarker(departureLocation, 'departure')" placeholder="Departure Location" class="absolute right-0 z-10 p-2 bg-white border rounded shadow input-field top-4">
      <input v-model="destinationLocation" @input="placeMarker(destinationLocation, 'destination')" placeholder="Destination Location" class="absolute right-0 z-10 p-2 bg-white border rounded shadow input-field top-16">
      <input v-model="departureDate" type="date" placeholder="Departure Date" class="absolute right-0 z-10 p-2 bg-white border rounded shadow input-field top-28">
      <input v-model="departureTime" type="time" placeholder="Departure Time" class="absolute right-0 z-10 p-2 bg-white border rounded shadow input-field top-40">

      <!-- Buttons -->
      <div class="absolute right-0 z-10 flex justify-center top-52">
        <button @click="confirmLocation" class="px-4 py-2 mr-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none">Confirm</button>
        <button @click="resetLocation" class="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none">Reset</button>
      </div>
    </div>
    <div class="w-1/3 p-6">
      
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const apiKey = '9xyeBAMniGG3nejL4QIL';
const map = ref(null);
const departureLocation = ref('');
const destinationLocation = ref('');
const departureDate = ref('');
const departureTime = ref('');

const departureIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const destinationIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const placeMarker = async (location, type) => {
  if (!location) return;

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`);
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      // Clear existing markers
      map.value.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer.options.type === type) {
          map.value.removeLayer(layer);
        }
      });

      // Add a marker for the new location with the corresponding icon
      const marker = L.marker([lat, lon], { type, icon: type === 'departure' ? departureIcon : destinationIcon }).addTo(map.value)
        .bindPopup(`${type.charAt(0).toUpperCase() + type.slice(1)} at (${lat.toFixed(4)}, ${lon.toFixed(4)})`)
        .openPopup();

      // Get the bounds of the marker
      const markerBounds = marker.getBounds();

      // Zoom the map to the marker's bounds
      map.value.fitBounds(markerBounds, { padding: [50, 50] });

      // If the type is 'departure', zoom further to the departure location
      if (type === 'departure') {
        map.value.setView([lat, lon], 15);
      }
    } else {
      // Show an error popup when the location is not found
      L.popup()
        .setLatLng(map.value.getCenter())
        .setContent(`${type.charAt(0).toUpperCase() + type.slice(1)} location not found`)
        .openOn(map.value);
    }
  } catch (error) {
    // Show an error popup for fetch errors
    L.popup()
      .setLatLng(map.value.getCenter())
      .setContent(`Error fetching ${type} location: ${error.message}`)
      .openOn(map.value);
  }
};

const confirmLocation = () => {
  // Add your logic for confirming the location
  // You can customize this function as needed
  console.log('Location confirmed');
};

const resetLocation = () => {
  // Show a confirmation popup for resetting the location
  const isConfirmed = window.confirm('Are you sure you want to reset?');

  if (isConfirmed) {
    // Clear all input values
    departureLocation.value = '';
    destinationLocation.value = '';
    departureDate.value = '';
    departureTime.value = '';

    // Clear existing markers
    map.value.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.value.removeLayer(layer);
      }
    });
  }
};
  
onMounted(() => {
  // Center the map on Algeria
  map.value = L.map('map').setView([36.731538, 3.087544], 10);

  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=${apiKey}`, {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value);

  map.value.on('click', onMapClick);
});

const onMapClick = (e) => {
  // Clear existing markers
  map.value.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.value.removeLayer(layer);
    }
  });

  // Add a marker for the clicked location
  const { lat, lng } = e.latlng;
  placeMarker(`${lat}, ${lng}`, 'clicked');
};
</script>

<style>
@import 'leaflet/dist/leaflet.css';

/* Add these styles for proper positioning */
.relative {
  position: relative;
}

#map {
  z-index: 1;
  width: 80%;
  height: 600px; /* Set the height explicitly */
}

.input-field {
  width: calc(40% - 4rem); /* Adjust the width as needed */
  margin-right: -2rem;
}

.absolute {
  right: -15rem;
  z-index: 10;
  position: absolute;
  padding: 2;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
