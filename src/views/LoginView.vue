<template>
    <div class="pt-16">
        <h1 class="mb-4 text-3xl font-semibold">Enter your credentials</h1>
        <form v-if="!waitingOnVerification" action="#" @submit.prevent="handleLogin">
            <div class="max-w-sm mx-auto overflow-hidden text-left shadow sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <div>
                        <input type="text" v-model="credentials.username" name="username" id="username" placeholder="Your username"
                            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
                    </div>
                    <div class="mt-4">
                        <input type="password" v-model="credentials.password" name="password" id="password" placeholder="Your password"
                            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none">
                    </div>
                </div>
                <div class="flex justify-between px-4 py-3 bg-gray-50 sm:px-6">
                    <button type="submit"
                        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none">Login</button>
                    <router-link to="/register" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-blue-200 rounded-md hover:text-gray-500">Register</router-link>
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
            name: 'landing'
        })
    }
})

const getFormattedCredentials = () => {
    return {
        phone: credentials.phone.replaceAll(' ', '').replace('(', '').replace(')', '').replace('-', ''),
        login_code: credentials.login_code
    }
}

const handleLogin = () => {
    axios.post('http://localhost/api/login', getFormattedCredentials())
        .then((response) => {
            console.log(response.data)
            waitingOnVerification.value = true
        })
        .catch((error) => {
            console.error(error)
            alert(error.response.data.message)
        })
}



</script>