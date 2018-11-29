import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home.vue'
import map from './components/map.vue'
import add from './components/add.vue'
import show from './components/show.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/map',
            name: 'map',
            component: map
        },
        {
            path: '/add',
            name: 'add',
            component: add
        },
        {
            path: '/show/:id',
            name: 'show',
            component: show
        }
    ]
})