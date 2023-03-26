<template>
	<div id="app">
		<p>hi</p>
		<button @click="toggleSidebar">toggle</button>
	</div>
</template>

<script>


export default {
	name: 'App',
	components: {
	},
	  methods: {
		toggleSidebar() {
		  this.bus.emit('test_move_arrow', null);
		}
	  },
	created() {
		this.bus.on('test_move_arrow', () => {
			alert(3);
		})
	}
}

function fcm_body_to_object(string) {
	
	string.replace('\\"', '"')
	let object = JSON.parse(string)
	return object
	
}

let l = function (to_log) { 
	console.log(to_log) 
}

let lo = l

/*
could add:
<div id="tests">
	<FirebaseTest/>
</div>

*/
</script>

<style>

</style>
