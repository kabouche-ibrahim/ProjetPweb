<template>
    <div class="pt-16">
      <h1 class="mb-4 text-3xl font-semibold">Covoiturage</h1>
      <div class="max-w-sm mx-auto overflow-hidden text-left shadow sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="flex justify-between">
            <router-link to="/Creation" tag="button" type="button"
                class="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none"
            >
                Create Ride
            </router-link>
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none"
            >
              Find A Ride
            </button>
          </div>
        </div>
      </div>
  
      <!-- Table with Search Bar -->
      <div class="max-w-full mx-auto mt-8">
        <input
          type="text"
          class="float-right p-2 border rounded-md"
          placeholder="Search..."
        />
        <table class="w-full mt-4 border border-collapse border-gray-300">
          <thead>
            <tr>
              <th class="p-3 text-center bg-gray-200 border-b">From</th>
              <th class="p-3 text-center bg-gray-200 border-b">To</th>
              <th class="p-3 text-center bg-gray-200 border-b">Departure Date</th>
              <th class="p-3 text-center bg-gray-200 border-b">Time</th>
              <th class="p-3 text-center bg-gray-200 border-b">Available Seats</th>
              <th class="p-3 text-center bg-gray-200 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Add more rows as needed -->
            <tr>
              <td class="p-3 text-center border">Algiers</td>
              <td class="p-3 text-center border">Blida</td>
              <td class="p-3 text-center border">2024-01-27</td>
              <td class="p-3 text-center border">15:00</td>
              <td class="p-3 text-center border">4</td>
              <td class="p-3 text-center border">
                <button @click="showForm" class="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-600 focus:outline-none">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Form for Selected Ride -->
      <div v-if="showFormFlag" class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <div class="max-w-xl p-8 mx-auto bg-white rounded-md shadow-md">
          <h2 class="mb-4 text-xl font-semibold">Driver Information</h2>
          <div>
            <div>
              <p>Driver's Name: John Doe</p>
              <p>Car Name: Sedan</p>
              <p>Car Color: Blue</p>
              <p>Car Year: 2005</p>
              <p>Matricule: ABC123</p>
            </div>
  
            <h3 class="mt-4 text-lg font-semibold">Meeting Place</h3>
            
            

  
            <h3 class="mt-4 text-lg font-semibold">Destination</h3>
            <p>Alger</p>
            <p>Available Seats: 4</p>
  
            <div class="mt-4">
              <button @click="showConfirmation" class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
                Reserve
              </button>
              <button @click="hideForm" class="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Confirmation Popup -->
      <div v-if="showConfirmationFlag" class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <div class="max-w-md p-8 mx-auto bg-white rounded-md shadow-md">
          <h2 class="mb-4 text-xl font-semibold">Confirmation</h2>
          <p>Are you sure?</p>
  
          <div class="mt-4">
            <button @click="confirmReservation" class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
              Yes
            </button>
            <button @click="cancelReservation" class="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  

  
  const showFormFlag = ref(false);
  const showConfirmationFlag = ref(false);
  
  const showForm = () => {
    showFormFlag.value = true;
  };
  
  const hideForm = () => {
    showFormFlag.value = false;
  };
  
  const showConfirmation = () => {
    showConfirmationFlag.value = true;
  };
  
  const confirmReservation = () => {
    // Add logic for confirming reservation
    showConfirmationFlag.value = false;
  };
  
  const cancelReservation = () => {
    showConfirmationFlag.value = false;
  };
  
  

  
  
  </script>
  