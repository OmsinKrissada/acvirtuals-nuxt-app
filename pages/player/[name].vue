<script setup>
const route = useRoute();
const { data: content, error: err, pending: isPending } = await useFetch(`https://acvirtuals.com/api/stats/player/${route.params.name}`);
</script>

<template>
	<div>
		<p>
			{{ content }}
		</p>
		<p>Error: {{ err }}</p>
		<p v-if="isPending">Loading...</p>
	</div>
</template>
