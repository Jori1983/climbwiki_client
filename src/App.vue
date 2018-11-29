<template>
  <div id="app">
   <b-navbar toggleable="md" type="dark" variant="info" sticky>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">climbWiki</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/map">Map</b-nav-item>
          <b-nav-item to="/add">Add</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>


<script>
import map from './components/map.vue'
import home from './components/home.vue'
import add from './components/add.vue'
import show from './components/show.vue'

export default {
  name: 'app',
  components: {
    home, map, add, show
  }
}
</script>

<style>
#app {
}
</style>
