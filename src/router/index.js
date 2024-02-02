import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MainView from '../views/MainView.vue'
import CreationView from '../views/CreationView.vue'
import MyRidesView from '../views/MyRidesView.vue'
import MyReservationView  from '../views/MyReservationView.vue'
import UsersView from '../views/UsersView.vue'

const router = createRouter({  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/main',
      name: 'main',
      component: MainView
    },
    {
      path: '/creation',
      name: 'creation',
      component: CreationView
    },
    {
      path: '/myrides',
      name: 'myrides',
      component: MyRidesView
    },
    {
      path: '/myreservation',
      name: 'myreservation',
      component: MyReservationView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    }
    
    
  ]
})

/*router.beforeEach((to, from) => {    //to be added later...
  if (to.name === 'login') {
    return true
  }

  if (!localStorage.getItem('token')) {
    return {
      name: 'login'
    }
  }

  checkTokenAuthenticity()
})

const checkTokenAuthenticity = () => {
  axios.get('http://localhost/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((response) => {})
    .catch((error) => {
      localStorage.removeItem('token')
      router.push({
        name: 'login'
      })
    })
}*/

export default router
