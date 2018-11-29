<template>
<div>
	<b-carousel id="carousel_show" style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">
        <b-carousel-slide :key="index" v-for="(img,index) in route.images" v-bind:img-src="img"></b-carousel-slide>
	</b-carousel>
	<H1>{{route.name}}</H1>
	<H2>{{route.grade}}&nbsp;&nbsp;<b-btn v-b-toggle.collapseRate>rate</b-btn></H2>
	<div id="description">{{route.comment}}</div>
	<div>{{route.id}}</div>
	<b-collapse class="mt-2" id="collapseRate">
		<b-card>
			<form>
				<div class="form-group row">
					<label for="colFormLabel" class="col-sm-2 col-form-label">Rating</label>
					<div class="col-sm-10">
						<select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
							<option selected>Choose...</option>
							<option>5</option>
							<option>6</option>
							<option>7</option>
							<option>8</option>
							<option>9</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="exampleFormControlTextarea1">Comment</label>
					<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
				</div>
				<b-btn>Submit</b-btn>
			</form>
		</b-card>
	</b-collapse>
	<br><br>
	<div class="list-group">
		<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
		<div class="d-flex w-100 justify-content-between">
			<h5 class="mb-1">Chimpmaster41</h5>
			<small>3 days ago</small>
		</div>
		<p class="mb-1">Total langweilig</p>
		<small>7b+</small>
		</a>
		<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
		<div class="d-flex w-100 justify-content-between">
			<h5 class="mb-1">Chimpmaster41</h5>
			<small>3 days ago</small>
		</div>
		<p class="mb-1">Total langweilig</p>
		<small>7b+</small>
		</a>
		<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
		<div class="d-flex w-100 justify-content-between">
			<h5 class="mb-1">Chimpmaster41</h5>
			<small>3 days ago</small>
		</div>
		<p class="mb-1">Total langweilig</p>
		<small>7b+</small>
		</a>
		<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
		<div class="d-flex w-100 justify-content-between">
			<h5 class="mb-1">Chimpmaster41</h5>
			<small>3 days ago</small>
		</div>
		<p class="mb-1">Total langweilig</p>
		<small>7b+</small>
		</a>
	</div>
</div>

</template>

<script>

export default {
  data () {
    return {
      slide      : 0,
      sliding    : null,
			route: {
				id: this.$route.params.id,
				name: "unknown",
				grade: "0",
				comment: "",
				images: ['/images/img_1234.jpg']
			}
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
		},
    getClimbs: function() {
		this.$http.get('http://worldsend.spdns.de/api/climbs/'+this.route.id).then(function(data){
        	this.route.id      = data.body.climb.id;
			this.route.name    = data.body.climb.name;
			this.route.comment = data.body.climb.comment;
			this.route.grade   = data.body.climb.grade;
			
			this.route.images  = [];
			data.body.climb.images.split(',').forEach(element => {
				this.route.images.push('http://worldsend.spdns.de/storage/climb_'+element+".jpg")
				});
			})
	  	}
	},
	mounted() {
		this.getClimbs();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
