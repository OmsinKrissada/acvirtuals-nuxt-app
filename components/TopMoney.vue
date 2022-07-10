<script setup>
const props = defineProps({
	name: String,
	uuid: String,
	rank: Number,
	money: Number,
});
</script>

<template>
	<li :class="`flex justify-start items-center px-5 py-2 rounded-lg`">
		<p class="mr-8 font-minecraft tracking-wider">#{{ rank }}</p>
		<img class="w-8 mr-3 rounded-sm shadow-sm shadow-black/30" :src="`https://crafatar.com/avatars/${uuid ?? '408422d7-12c1-360a-a394-a3c13eaf274b'}?overlay`" />
		<nuxt-link class="mr-3" :href="`/player/${name}`"> {{ name }} </nuxt-link>
		<span class="ml-auto font-minecraft text-sm tracking-wider" style="margin-left: auto">${{ money.toLocaleString() }}</span>
	</li>
</template>
