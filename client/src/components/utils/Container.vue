<template>
	<component :is="tag" class="container mx-auto px-4 sm:px-0">
		<slot />
	</component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "Container",
	props: {
		tag: {
			type: String,
			default: "div",
		},
	},
});
</script>