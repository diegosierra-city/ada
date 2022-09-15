<script lang="ts">
	import { page } from '$app/stores';
	//import type { MenuWeb } from '$lib/types/MenuWeb';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FaBrandsFacebookSquare from 'svelte-icons-pack/fa/FaBrandsFacebookSquare';
	import FaBrandsLinkedin from 'svelte-icons-pack/fa/FaBrandsLinkedin';
	import FaBrandsGithub from 'svelte-icons-pack/fa/FaBrandsGithub';

	import { apiKey } from '../../store';

	//let menu_list: Array<MenuWeb> = [];

	const urlAPI = $apiKey.urlAPI;
	const company_id = $apiKey.company_id;
	const company_name = $apiKey.company_name;
	const tokenWeb = $apiKey.tokenWeb;

	async function getMenu() {
		const result = await fetch(
			urlAPI + '?ref=menu-web-footer&company_id=' + company_id + '&tokenWeb=' + tokenWeb
		);
		return result.json();
	}
</script>

<footer>
	
		<!--
{$page.url.pathname}     
-->
<div class="grid grid-cols-1 mb-3 sm:grid-cols-3 gap-2 place-content-center place-items-center">
		<div>
			<img src="/Mlogo.jpg" class="logo_down md:mr-4" alt="Diego Sierra" />
		</div>
		<div class="my-2 flex sm:w-10/12">
			<a href="https://facebook.com/diego.sierra.391/" target="_blank" rel="noopener noreferrer">
			<Icon
				src={FaBrandsFacebookSquare}
				color="white"
				size="50"
				className="FaBrandsFacebookSquare mr-6 cursor-pointer border-b-2 border-darkgray hover:border-b-secondary pb-2"
				title=""
			/></a>
			<a href="https://linkedin.com/in/diego-sierra-398627227/" target="_blank" rel="noopener noreferrer">
			<Icon
				src={FaBrandsLinkedin}
				color="white"
				size="50"
				className="FaBrandsLinkedin mr-6 cursor-pointer border-b-2 border-darkgray hover:border-b-secondary pb-2"
				title=""
			/></a>
			<a href="https://github.com/diegosierra-city" target="_blank" rel="noopener noreferrer">
			<Icon
				src={FaBrandsGithub}
				color="white"
				size="50"
				className="FaBrandsGithub cursor-pointer border-b-2 border-darkgray hover:border-b-secondary pb-2"
				title=""
			/></a>
		</div>
		
		<div>
			{#await getMenu()}
		<p>Loading...</p>
	{:then menu_list}
		<nav>
			<ul class="menu_footer">
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
		<p>Error loading menu: {error.message}</p>
	{/await}

	<div><h4>Diego Sierra</h4>
		phone: +57 3163783258 <br>
		email: diegosierra@cityciudad.com<br>
		Colombia
	</div>
</div>

</div>
	
<div class="w-full text-center "><small>2022 - By Diego Sierra - Made with SvelteKit</small></div>

</footer>
