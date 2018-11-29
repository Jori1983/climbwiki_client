import Vue from 'vue'
import App from './App.vue'
import router from './router'


import VueGeolocation from 'vue-browser-geolocation'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource' 
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(BootstrapVue)
Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {load: {key: 'AIzaSyDITkjV4HRsAXQ6_wnCEgU5PapySmKBsqw'}})
Vue.use(VueResource)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state:  {
    mapdata: {
      gps:  {
        position: {lat: 0.0, lng: 0.0},
        accuracy:  0
      },
      view: {
        position: {lat: 0.0, lng: 0.0},
        zoom: 15
      }
    },
    user: {
      name: 'nobody',
      id: -1,
      gradeType: 'UIAA',
      position: {
        lat: 0.0,
        lng: 0.0
      }
    },
    addClimb: {
      name: '',
      comment: '',
      grade: '',
      gradeType: '',
      creator: '',
      creatorId: -1,
      position: {
        lat: 0.0,
        lng: 0.0
      }
    }
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
