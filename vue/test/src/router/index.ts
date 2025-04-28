import {createRouter, createWebHistory} from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import HomeFooter from '../components/HomeFooter.vue'

const routes = [
    {
        path: '/hw',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/homefooter',
        name: 'footer',
        component: HomeFooter
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router