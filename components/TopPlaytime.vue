<script setup lang="ts">
import { formatDuration } from "date-fns";
const props = defineProps({
	name: String,
	uuid: String,
	rank: Number,
	time: Number,
});

function fullDurationString(ms): string {
	let str = "";
	const days = Math.floor(ms / 86400000);
	const hours = Math.floor((ms % 86400000) / 3600000);
	const mins = Math.floor((ms % 3600000) / 60000);
	const secs = Math.floor((ms % 60000) / 1000);
	if (days) str += `${days}d `;
	if (hours) str += `${hours}h `;
	if (mins) str += `${mins}m `;
	if (secs) str += `${secs}s`;
	return str;
}

onMounted(() => {
	console.log(formatDuration({ seconds: props.time }));
});
</script>

<template>
	<li :class="`flex justify-start items-center px-5 py-2 rounded-lg`">
		<p class="mr-8 font-minecraft tracking-wider">#{{ rank }}</p>
		<img class="w-8 mr-3 rounded-sm shadow-sm shadow-black/30" :src="`https://crafatar.com/avatars/${uuid ?? '408422d7-12c1-360a-a394-a3c13eaf274b'}?overlay`" />
		<nuxt-link class="mr-3" :href="`/player/${name}`"> {{ name }} </nuxt-link>
		<span class="ml-auto font-minecraft text-sm tracking-wider" style="margin-left: auto">{{ fullDurationString(time * 1000) }}</span>
	</li>
</template>
