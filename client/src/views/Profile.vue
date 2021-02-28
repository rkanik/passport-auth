<template>
	<div class="Profile py-8">
		<container>
			<h4>This is Profile component</h4>
			<router-link to="/signin">Signin</router-link>
			<code>
				<pre>
			{{ JSON.stringify(user, null, 3) }}
			</pre
				>
			</code>
		</container>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "Profile",
	data() {
		return {
			user: {},
		};
	},
	created() {
		console.log(this);
		fetch("http://localhost:3500/api/v1/profile")
			.then((data) => data.json())
			.then((res) => (this.user = res));
	},
});
</script>

<style lang='scss' scoped>
	.Profile {
	}
</style>