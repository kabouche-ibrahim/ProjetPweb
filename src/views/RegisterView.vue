<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">Create your account</h1>
    <!-- Registration Form -->
    <form action="#" @submit.prevent="handleRegister">
      <div class="max-w-sm mx-auto overflow-hidden text-left shadow sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="flex">
            <div class="flex-1 mr-2">
              <input type="text" v-model="credentials.firstname" name="firstname" id="firstname" placeholder="First Name"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
            </div>
            <div class="flex-1 ml-2">
              <input type="text" v-model="credentials.lastname" name="lastname" id="lastname" placeholder="Last Name"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
            </div>
          </div>
          <div class="mt-4">
            <input type="email" v-model="credentials.email" name="email" id="email" placeholder="Email"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
          </div>
          <div class="mt-4">
            <input type="password" v-model="credentials.password" name="password" id="password" placeholder="Password"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
          </div>
          <div class="mt-4">
            <input type="password" v-model="credentials.confirmPassword" name="confirmPassword" id="confirmPassword"
              placeholder="Confirm Password"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
          </div>
          <!-- New input fields for phone_number and student_id -->
          <div class="mt-4">
            <input type="text" v-model="credentials.phone_number" name="phone_number" id="phone_number"
              placeholder="Phone Number"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
          </div>
          <div class="mt-4">
            <input type="text" v-model="credentials.student_id" name="student_id" id="student_id" placeholder="Student ID"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
          </div>
        </div>
        <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <button type="submit"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none">Register</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()

const credentials = reactive({
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  confirmPassword: null,
  phone_number: null, // Added field
  student_id: null // Added field
});

const getFormattedCredentials = () => {
  return {
    first_name: credentials.firstname,
    last_name: credentials.lastname,
    email: credentials.email,
    password: credentials.password,
    phone_number: credentials.phone_number, // Include phone_number
    student_id: credentials.student_id // Include student_id

  }
}
const handleRegister = () => {
  axios.post('http://localhost:8000/api/login', getFormattedCredentials())
    .then((response) => {
      console.log(response);
      if (response.status !== 200) {
        throw new Error(response.data.message)
      }
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      // Redirect to main page or perform other actions
      router.push({ name: 'main' });
    })
    .catch((error) => {
      console.error("Registration failed:", error);
      // Handle registration error if needed
    });
};
</script>
