<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">Enter your credentials</h1>
    <form v-if="!waitingOnVerification" action="#" @submit.prevent="handleLogin">
      <div class="max-w-sm mx-auto overflow-hidden text-left shadow sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div>
            <input type="text" v-model="credentials.username" name="username" id="username"
              placeholder="Your Email Address"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
          </div>
          <div class="mt-4">
            <input type="password" v-model="credentials.password" name="password" id="password"
              placeholder="Your password"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
          </div>
        </div>
        <div class="flex justify-between px-4 py-3 bg-gray-50 sm:px-6">
          <button type="submit"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none">Login</button>
          <router-link to="/register"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-blue-200 rounded-md hover:text-gray-500">Register</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { vMaska } from 'maska'
import { reactive, ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter()

const credentials = reactive({
  username: null,
  password: null
})
const waitingOnVerification = ref(false)

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push({
      name: 'main'
    })
  }
})

const getFormattedCredentials = () => {
  return {
    email: credentials.username,
    password: credentials.password
  }
}

const handleLogin = () => {
  axios.post('http://localhost:8000/api/login', getFormattedCredentials())
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Invalid credentials');
      }
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      // Redirect to main page or perform other actions
      router.push({ name: 'main' });
    })
    .catch((error) => {
      console.error(error);
      alert(error.response.data.message);
    });
}



</script>
