<template>
  <div class="flex">
    <div class="relative w-2/3 h-screen">
      <div id="map" class="w-full h-full"></div>

      <!-- Departure Location Input and Suggestions -->
      <div class="absolute right-0 z-10 p-2 bg-white border rounded shadow input-field top-4">
        <input v-model="departureLocation" @input="searchLocation(departureLocation, 'departure')" placeholder="Departure Location">
        <div v-for="(suggestion, index) in departureSuggestions" :key="index" class="z-20 suggestion-item">
          <button @click="selectSuggestion(suggestion, 'departure')" class="block w-full px-2 py-1 text-left hover:bg-gray-200">
            {{ suggestion.display_name }}
          </button>
        </div>
      </div>

      <!-- Destination Location Input and Suggestions -->
      <div class="absolute right-0 z-10 p-2 bg-white border rounded shadow input-field top-16">
        <input v-model="destinationLocation" @input="searchLocation(destinationLocation, 'destination')" placeholder="Destination Location">
        <div v-for="(suggestion, index) in destinationSuggestions" :key="index" class="z-20 suggestion-item">
          <button @click="selectSuggestion(suggestion, 'destination')" class="block w-full px-2 py-1 text-left hover:bg-gray-200">
            {{ suggestion.display_name }}
          </button>
        </div>
      </div>

      <!-- Departure Date Input -->
      <input v-model="departureDate" type="date" placeholder="Departure Date" class="absolute right-0 z-10 p-2 bg-white border rounded shadow input-field top-28">

      <!-- Departure Time Input -->
      <input v-model="departureTime" type="time" placeholder="Departure Time" class="absolute right-0 z-10 p-2 bg-white border rounded shadow input-field top-40">
  

      <!-- Available Places Input -->
      <input v-model="availablePlace" type="number" placeholder="Available Places" min="1"  class="absolute right-0 z-10 p-2 bg-white border rounded shadow input-field top-40">


      <!-- Buttons -->
      <div class="absolute right-0 z-10 flex justify-center top-52">
        <button @click="confirmLocation" class="px-4 py-2 mr-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none">Confirm</button>
        <button @click="resetLocation" class="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none">Reset</button>
      </div>
    </div>

    <div class="w-1/3 p-6">
      <!-- Other content in the right column -->
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
const departureSuggestions = ref([]);
const destinationSuggestions = ref([]);
const availablePlace = ref('');

const searchLocation = async (query, type) => {
  if (!query) return;

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`);
    const data = await response.json();

    if (type === 'departure') {
      departureSuggestions.value = data;
    } else {
      destinationSuggestions.value = data;
    }
  } catch (error) {
    console.error(`Error fetching location suggestions: ${error.message}`);
    console.error('Check the network tab for more details.');

    L.popup()
      .setLatLng(map.value.getCenter()) // Set the popup location to the center of the map
      .setContent(`Error fetching location suggestions: ${error.message}<br>Check the network tab for more details.`)
      .openOn(map.value);

  }
};

const selectSuggestion = (suggestion, type) => {
  let location = { lat: suggestion.lat, lon: suggestion.lon };
  
  if (type === 'departure') {
    departureLocation.value = suggestion.display_name;
    departureSuggestions.value = [];
  } else {
    destinationLocation.value = suggestion.display_name;
    destinationSuggestions.value = [];
  }
  
  placeMarker(location, type);

};  

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
    let lat, lon;
    lat = location.lat;
    lon = location.lon;

    // Clear existing markers
    map.value.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer.options.type === type) {
        map.value.removeLayer(layer);
      }
    });

    // Add a marker for the location with the corresponding icon
    const marker = L.marker([lat, lon], { type, icon: type === 'departure' ? departureIcon : destinationIcon }).addTo(map.value);

   map.value.setView([lat,lon], 15);

  } catch (error) {
    // Show an error popup for fetch errors
      window.alert(`Error fetching ${type} location: ${error.message}`);
  }
};


const confirmLocation = () => {
  // Check if any of the required values is null or empty
  if (
    !departureLocation.value ||
    !destinationLocation.value ||
    !departureDate.value ||
    !departureTime.value ||
    !availablePlace.value
  ) {
    // Show a popup to notify the user to fill all inputs
    window.alert('Please fill in all required inputs.');
    return; // Exit the function early if any input is missing
  }

  // Add your logic for confirming the location
  // You can customize this part of the function as needed
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
    availablePlace.value= 1;

    map.value.setView([36.731538, 3.087544], 10);
    

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
    attribution: '&copy; IL-M1 2024'
  }).addTo(map.value);

});




</script>


<style>
@import 'leaflet/dist/leaflet.css';

/* Add these styles for proper positioning */
.relative {
  position: relative;
  height: 100vh; /* Set the height of the container to the full viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}

#map {
  z-index: 1;
  width: 90%;
  height: 700px; /* Set the height explicitly */
}

.input-field {
  width: calc(100% - 4rem); /* Adjust the width as needed */
  margin-right: 0;
  position: relative;
}



.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  z-index: 20;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.suggestion-item {
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #e2e8f0;

}

.suggestion-item:last-child {
  border-bottom: none;
}

.absolute {
  right: -15rem;
  position: absolute;
  padding: 2;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}



.flex {
  padding: 2rem; /* Set the desired padding around all corners */
}

/* Add the following style to center the content within the flex container */
.flex > div {
  margin: auto;
}

.input-container {
  display: flex;
  align-items: center;
  
}

.input-container input {
  flex: 1;
  
}

</style>
