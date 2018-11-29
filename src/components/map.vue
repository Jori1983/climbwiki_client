<template>
<div>
  <gmap-map
    ref="mapRef"
    :center="mapdata.view.position"
    :zoom="15"
    map-type-id="terrain"
    @click="getCoord"
    style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; margin-top:56px;z-index:-1">
      <gmap-marker
        :key="index"
        v-for="(r, index) in markers"
        :position="r.position"
        @click="openInfo(r)">
      </gmap-marker>

      <gmap-marker
        :position="addClimb.position"
        icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        @click="openInfoNew()">
      </gmap-marker>
    
      <!--<gmap-circle ref="circle" :radius="gps.accuracy" :center="gps.position" :draggable="false" :editable="false">
      </gmap-circle>-->
      <gmap-marker :position="mapdata.gps.position" icon="http://www.robotwoods.com/dev/misc/bluecircle.png">
      </gmap-marker>
    
      <gmap-info-window
        :opened="infoWindow.open"
        :position="infoWindow.position"
        :options="{
          pixelOffset: {width: 0, height: -35}
          }">
        <router-link :to="infoWindow.link">{{infoWindow.content}}</router-link >
      </gmap-info-window>
  </gmap-map>
</div>
</template>

<script>
export default {
  data() {
    return {
      markers: [
        {
          id: -1,
          name: "error",
          grade: "",
          position: {lat: 0.0, lng:0.0},
        },
      ],
      infoWindow: {
        link: "empty",
        position: {lat:0, lng:0},
        open: false,
        content: ""
      }  
    }
  },

  computed: {
	  addClimb() {
		  return this.$store.state.addClimb;
    },
    mapdata() {
      return this.$store.state.mapdata;
    }
  },

  methods:{
    openInfo: function(item) {
      this.infoWindow.position = item.position;
      this.infoWindow.content  = item.name + " (" + item.grade + ")";
      this.infoWindow.link     = "/show/"+item.id;
      this.infoWindow.open     = true;
    },
    openInfoNew: function(item) {
      this.infoWindow.position = this.addClimb.position;
      this.infoWindow.content  = "add New Route";
      this.infoWindow.link     = "/add/";
      this.infoWindow.open     = true;
    },
    getCoord (e) {
      this.addClimb.position = {lat: e.latLng.lat(), lng: e.latLng.lng()}
      this.infoWindow.open = false;
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.mapdata.gps.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.mapdata.gps.accuracy  = position.coords.accuracy;
        this.addClimb.position     = this.mapdata.gps.position;

        this.mapdata.view.position = this.mapdata.gps.position;
        this.addClimb.position = this.mapdata.view.position;
      });
    },
    getClimbs: function() {
		  this.$http.get('http://worldsend.spdns.de/api/climbs').then(function(data){
        this.markers = [];
        for (var i =0; i<data.body.climbs.length; i++) {
        this.markers.push({
            id : parseInt(data.body.climbs[i].id),
            name : data.body.climbs[i].name,
            grade : data.body.climbs[i].grade,
            position : {
              lat : parseFloat(data.body.climbs[i].posLat),
              lng : parseFloat(data.body.climbs[i].posLng)
              }
            });
        };
		  })  
	  }
  },
  created() {
    //fetch("http://localhost:3000/routes/")
    //  .then(response => response.json())
    //  .then((data) => {
    //    this.routes =  data;
    //  })
    this.geolocate();
    this.getClimbs();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
