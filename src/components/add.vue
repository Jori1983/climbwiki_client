<template>
  <b-card>
	<b-form>
		<h1 class="text-center">add a new climb</h1>
		<b-form-group id="climbNameGroup" label="Name" label-for="climbName">
			<b-form-input
				type="text"
				id="climbName"
				placeholder="Name"
				v-model="climb.name"
				requiered/>
		</b-form-group>
		<b-form-group id="climbCommentGroup" label="Comment" label-for="climbComment">
			<b-form-textarea
				id="climbDescription"
				rows="3"
				placeholder="comment"
				v-model="climb.comment">
			</b-form-textarea>
		</b-form-group>
		<b-form-group id="climbGradeGroup" label="Grade" label-for="climbGrade">
			<b-select
				class="form-control"
				id="climbGrade"
				v-model="climb.grade">
					<option selected>Choose...</option>
					<option value="5.0">5</option>
					<option value="6.0">6</option>
					<option value="7.0">7</option>
			</b-select>
		</b-form-group>
		<b-form-group id="climbGPSGroup" label="GPS" label-for="climbGPS">
			<b-input-group id="climbGPS">
				<b-form-input type="text" v-model="climb.position.lat"/>
				<b-form-input type="text" v-model="climb.position.lng"/>
				<b-btn variant="outline-success">Map</b-btn>
			</b-input-group>
		</b-form-group>
		<b-form-group id="climbFileGroup" label="Images" label-for="climbFile">
			<b-form-file id="climbFile" placeholder="Choose a file..." @change="onFileSelected"></b-form-file>
		</b-form-group>
		<b-button type="submit" variant="primary" v-on:click.prevent="postClimb">Submit</b-button>
	</b-form>
  </b-card>
</template>

<script>
import axios from 'axios';

export default {
  data () {
	  return {
		  uploadFile: null
	  }
  },
  computed: {
	  climb() {
		  return this.$store.state.addClimb;
	  },
	  user() {
		  return this.$store.state.user;
	  }
  },
  methods: {
	  onFileSelected(event) {
		  console.log(event);
		  this.uploadFile = event.target.files[0]
	  },
	  postClimb: function() {
		  const fd = new FormData();
		  fd.append('climbFile',this.uploadFile,this.uploadFile.name);
		  fd.append('name',this.climb.name);
		  fd.append('comment',this.climb.comment);
		  fd.append('grade',this.climb.grade);
		  fd.append('gradeType',this.user.gradeType);
		  fd.append('creator',this.user.name);
		  fd.append('creatorId',this.user.id);
		  fd.append('posLat',this.climb.position.lat);
		  fd.append('posLng',this.climb.position.lng);

		  console.log(fd);
		  axios.post('http://worldsend.spdns.de/api/climb',fd, {headers: {'Content-Type': 'multipart/form-data'}})
		  	.then(res => {
				  this.$router.push('/show/'+res.data.climb.id);
				  })
		  /*
		  this.$http.post('http://climbwiki.exp/api/climb',{
			  name: 		this.climb.name,	
			  comment: 		this.climb.comment,
			  grade: 		this.climb.grade,
			  gradeType:	this.user.gradeType,
			  creator: 		this.user.name,
			  creatorId: 	this.user.id,
			  posLat: 		this.climb.position.lat,
			  posLng: 		this.climb.position.lng
		  }).then(function(data){
			  console.log(data)
		  })
		  */  
	  }
  	}
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
