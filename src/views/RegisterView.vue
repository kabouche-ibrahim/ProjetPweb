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
                        <input type="password" v-model="credentials.confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"
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

const credentials = reactive({
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    confirmPassword: null,
});

const handleRegister = () => {
    const formattedCredentials = {
        firstname: credentials.firstname,
        lastname: credentials.lastname,
        email: credentials.email,
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
    };

    // If API endpoint is '/api/register'
    axios.post('/api/register', formattedCredentials)
        .then((response) => {
            console.log("Registration successful:", response.data);
            
        })
        .catch((error) => {
            console.error("Registration failed:", error.response.data.message);
         
        });
};
</script>

