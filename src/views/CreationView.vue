<template>
  <div class="flex">
    <div class="relative w-2/3 h-screen">
      <div id="map" class="w-full h-full"></div>
      <input v-model="departureLocation" @input="placeMarker(departureLocation, 'departure')" placeholder="Departure Location" class="absolute right-0 z-10 p-2 bg-white border rounded shadow top-4">
      <input v-model="destinationLocation" @input="placeMarker(destinationLocation, 'destination')" placeholder="Destination Location" class="absolute right-0 z-10 p-2 bg-white border rounded shadow top-16">
      <input v-model="departureDate" type="date" placeholder="Departure Date" class="absolute right-0 z-10 p-2 bg-white border rounded shadow top-28">
      <input v-model="departureTime" type="time" placeholder="Departure Time" class="absolute right-0 z-10 p-2 bg-white border rounded shadow top-40">
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

      // Add a marker for the new location
      L.marker([lat, lon], { type }).addTo(map.value)
        .bindPopup(`${type.charAt(0).toUpperCase() + type.slice(1)} at (${lat.toFixed(4)}, ${lon.toFixed(4)})`)
        .openPopup();
    } else {
      console.error(`${type.charAt(0).toUpperCase() + type.slice(1)} location not found`);
    }
  } catch (error) {
    console.error(`Error fetching ${type} location:`, error);
  }
};

onMounted(() => {
  // Center the map on Algeria
  map.value = L.map('map').setView([28.0339, 1.6596], 6);

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
  height: 500px; /* Set the height explicitly */
}

.absolute {
  right: -15rem;
  z-index: 10; /* Set a higher z-index for the input to appear above the map */
  position: absolute;
  padding: 2;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
