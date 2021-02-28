<template>
	<div class="default-layout">
		<router-view />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "DefaultLayout",
});
</script>