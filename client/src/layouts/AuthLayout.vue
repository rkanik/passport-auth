<template>
	<div class="auth-layout bg-gray-200">
		<container>
			<router-view />
		</container>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "AuthLayout",
});
</script>