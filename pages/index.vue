<script setup lang="ts">
const playerName = ref("");

const { data: topMoney, error: topMoneyError, pending: topMoneyPending } = await useFetch<{ name: string; balance: string; exempt: boolean }[]>(`https://acvirtuals.com/api/stats/top/money`);
const {
	data: topPlaytime,
	error: topPlaytimeError,
	pending: topPlaytimePending,
} = await useFetch<{ name: string; joins: number; session: number; time: number }[]>(`https://acvirtuals.com/api/stats/top/playtime`);

const top_money_with_uuid = ref<{ name: string; balance: number; uuid: string }[]>([]);
// console.log(topMoneyPending.value);
// setTimeout(() => {
// 	console.log(topMoneyPending.value);
// }, 500);

const top_playtime_with_uuid = ref<{ name: string; joins: number; session: number; time: number; uuid: string }[]>([]);
const top_five_playtime = topPlaytime.value.sort((a, b) => b.time - a.time).slice(0, 5);
top_playtime_with_uuid.value = await Promise.all(
	top_five_playtime.map(async p => {
		const { data } = await useFetch<{ premium_uuid: string }>(`https://acvirtuals.com/api/stats/player/${p.name}`);
		const uuid = data.value.premium_uuid;
		return { uuid: uuid, ...p };
	})
);

const top_five_money = topMoney.value.sort((a, b) => +b.balance - +a.balance).slice(0, 5);
top_money_with_uuid.value = await Promise.all(
	top_five_money.map(async p => {
		const { data } = await useFetch<{ premium_uuid: string }>(`https://acvirtuals.com/api/stats/player/${p.name}`);
		const uuid = data.value.premium_uuid;
		return {
			name: p.name,
			balance: +p.balance,
			uuid: uuid,
		};
	})
);

function submit() {
	navigateTo(`/player/${playerName.value}`);
}
</script>

<template>
	<div class="flex flex-col justify-center items-center space-y-10 py-10 bg-[url('/landscape/9.png')] bg-black/50 bg-blend-overlay bg-cover">
		<!-- <img src="/landscape/9.png" alt="" class="fixed inset-0 -z-50 brightness-50" /> -->
		<!-- <NuxtWelcome /> -->

		<div class="p-10 mx-10 rounded-lg bg-red-200/10 ring-1 ring-rose-600 backdrop-blur-sm text-white">
			<form class="flex flex-col space-y-5" @submit.prevent="submit">
				<h2 class="text-center text-2xl" style="text-shadow: 2px 2px 0 #000">Enter player name</h2>
				<input
					class="bg-transparent font-minecraft text-center tracking-wider border-white focus:border-white focus:ring-4 focus:ring-red-800 placeholder-neutral-300 rounded transition"
					v-model="playerName"
					name="name"
					type="text"
					placeholder="Enter username"
					required
					autocomplete="off"
					autofocus
				/>
				<button
					class="block px-3 py-3 bg-rose-600 hover:bg-rose-700 shadow-lg hover:shadow-black/30 shadow-rose-800/30 font-bold text-lg rounded-md transition-all"
					style="text-shadow: 2px 2px 0 #000"
					type="submit"
				>
					LOOK UP
				</button>
			</form>
			<!-- <nuxt-link :href="`player/${playerName}`">Link</nuxt-link> -->
		</div>

		<div class="flex flex-col w-screen sm:w-auto sm:flex-row sm:space-x-10 space-y-10 sm:space-y-0">
			<div class="p-6 sm:rounded-lg bg-white/10 sm:ring-1 ring-gray-100 backdrop-blur-sm text-white">
				<h2 class="mb-5 text-3xl">Top Money</h2>
				<ul v-if="!topMoneyPending" class="flex flex-col space-y-3">
					<TopMoney
						class="bg-amber-600 shadow-lg shadow-amber-600/20"
						:rank="1"
						:name="top_money_with_uuid[0].name"
						:uuid="top_money_with_uuid[0].uuid"
						:money="top_money_with_uuid[0].balance"
					/>
					<TopMoney
						class="bg-slate-800 shadow-lg shadow-slate-800/20"
						:rank="2"
						:name="top_money_with_uuid[1].name"
						:uuid="top_money_with_uuid[1].uuid"
						:money="top_money_with_uuid[1].balance"
					/>
					<TopMoney
						class="bg-[#6e4218] shadow-lg shadow-[#b87333]/20"
						:rank="3"
						:name="top_money_with_uuid[2].name"
						:uuid="top_money_with_uuid[2].uuid"
						:money="top_money_with_uuid[2].balance"
					/>
					<TopMoney
						class="bg-[#919191] shadow-lg shadow-[#919191]/20"
						:rank="4"
						:name="top_money_with_uuid[3].name"
						:uuid="top_money_with_uuid[3].uuid"
						:money="top_money_with_uuid[3].balance"
					/>
					<TopMoney
						class="bg-[#919191] shadow-lg shadow-[#919191]/20"
						:rank="5"
						:name="top_money_with_uuid[4].name"
						:uuid="top_money_with_uuid[4].uuid"
						:money="top_money_with_uuid[4].balance"
					/>
				</ul>
			</div>

			<div class="p-6 sm:rounded-lg bg-white/10 sm:ring-1 ring-gray-100 backdrop-blur-sm text-white">
				<h2 class="mb-5 text-3xl">Top Play Time</h2>
				<ul v-if="!topPlaytimePending" class="flex flex-col space-y-3">
					<TopPlaytime
						class="bg-amber-600 shadow-lg shadow-amber-600/20"
						:rank="1"
						:name="top_playtime_with_uuid[0].name"
						:uuid="top_playtime_with_uuid[0].uuid"
						:time="top_playtime_with_uuid[0].time"
					/>
					<TopPlaytime
						class="bg-slate-800 shadow-lg shadow-slate-800/20"
						:rank="2"
						:name="top_playtime_with_uuid[1].name"
						:uuid="top_playtime_with_uuid[1].uuid"
						:time="top_playtime_with_uuid[1].time"
					/>
					<TopPlaytime
						class="bg-[#6e4218] shadow-lg shadow-[#b87333]/20"
						:rank="3"
						:name="top_playtime_with_uuid[2].name"
						:uuid="top_playtime_with_uuid[2].uuid"
						:time="top_playtime_with_uuid[2].time"
					/>
					<TopPlaytime
						class="bg-[#919191] shadow-lg shadow-[#919191]/20"
						:rank="4"
						:name="top_playtime_with_uuid[3].name"
						:uuid="top_playtime_with_uuid[3].uuid"
						:time="top_playtime_with_uuid[3].time"
					/>
					<TopPlaytime
						class="bg-[#919191] shadow-lg shadow-[#919191]/20"
						:rank="5"
						:name="top_playtime_with_uuid[4].name"
						:uuid="top_playtime_with_uuid[4].uuid"
						:time="top_playtime_with_uuid[4].time"
					/>
				</ul>
			</div>
		</div>
	</div>
</template>
