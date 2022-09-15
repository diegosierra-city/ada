<script lang="ts">
	import { page } from '$app/stores';
	//import type { MenuWeb } from '$lib/types/MenuWeb';
import Icon from 'svelte-icons-pack/Icon.svelte'
import FaSolidBars from 'svelte-icons-pack/fa/FaSolidBars'
	import { apiKey } from '../../store';
	import { fade } from 'svelte/transition';

	//let menu_list: Array<MenuWeb> = [];

	const urlAPI = $apiKey.urlAPI;
	const company_id = $apiKey.company_id;
	const company_name = $apiKey.company_name;
	const tokenWeb = $apiKey.tokenWeb;

	async function getMenu() {
		const result = await fetch(
			urlAPI + '?ref=menu-web-head&company_id=' + company_id + '&tokenWeb=' + tokenWeb
		);
		return result.json();
	}

	let movil_menu:boolean=false
</script>

<header>

	<div class="rounded-full overflow-hidden w-20 h-20 absolute top-2 left-2">
		<img src="/Mlogo.jpg" class="rounded-full -mt-6" alt="Diego Sierra" />
	</div>
	{#await getMenu()}
		<p>Loading...</p>
	{:then menu_list}
		<!--
{$page.url.pathname}	
-->
<div class="flex justify-end w-full sm:hidden" on:click={()=>{movil_menu=!movil_menu}}>
	
	<Icon
				src={FaSolidBars}
				color="white"
				size="20"
				className="FaSolidBars cursor-pointer hover:bg-black my-2 mr-2 "
				title=""
			/>	
	

</div>
{#if movil_menu==true}
<nav transition:fade class="menu_up_movil sm:hidden">
	<ul>
		{#each menu_list as menu}
			<li
				class:active={$page.url.pathname === menu.link + '/' ||
					$page.url.pathname === menu.link}
			>
				<a sveltekit:prefetch href={menu.link} on:click={()=>{movil_menu=false}}>{menu.menu}</a>
			</li>
		{/each}
	</ul>
</nav>
{/if}


		<nav class="menu_up hidden sm:block">
			<ul>
				{#each menu_list as menu}
					<li
						class:active={$page.url.pathname === menu.link + '/' ||
							$page.url.pathname === menu.link}
					>
						<a sveltekit:prefetch href={menu.link}>{menu.menu}</a>
					</li>
				{/each}
			</ul>
		</nav>

	{:catch error}
		<p>Error: {error.message}</p>
	{/await}
</header>
