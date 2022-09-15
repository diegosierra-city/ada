<script lang="ts">
	import { onMount } from "svelte/internal";
	import { apiKey } from "../../store";

	import type { BlockContent } from "../types/BlockContent";
	import type { Menu } from "../types/Menu";

	const urlAPI = $apiKey.urlAPI;
	const company_id = $apiKey.company_id;
	const company_name = $apiKey.company_name;
	const tokenWeb = $apiKey.tokenWeb;

	
	///load the content
	let cont: BlockContent = {
		id: 0,
		menu_id: 0,
		title: "",
		subtitle: "",
		text1: "",
		text2: "",
		text3: "",
		text4: "",
		image1: "",
		image2: "",
		image3: "",
		image4: "",
		video: "",
		position: 1,
		link: "",
	};
	let pag: Menu = {
		id: 0,
		menu_id: 0,
		menu: "",
		type: "",
		link: "",
		head: false,
		foot: false,
		side: false,
		position: 1,
		submenu: false,
		submenus: [],
		metadescription: "",
		metakeywords: "",
	};

	onMount(async () => {
		fetch(
			urlAPI +
				"?ref=page-web&type=Home&company_id=" +
				company_id +
				"&tokenWeb=" +
				tokenWeb
		)
			.then((response) => response.json())
			.then((result) => {
				//console.table(result);
				if (result.error) {
					console.error(result.error);
				} else {
					console.log(result);

					pag = result[0];
					//cont = JSON.parse(result[1]);
					cont = result[1];
					console.table(pag.metadescription);
				}
			});
	});

	
</script>

<svelte:head>
	<title>{company_name} - Home</title>
	<meta name="description" content={pag.metadescription} />
	<meta name="keywords" content={pag.metakeywords} />
	
</svelte:head>

<section class="mt-0">
	<!--Image-->
	{#if cont.image1 != "" && cont.image2 == ""}
		<img
			src="https://diegosierra.cityciudad.com/maker/images/pages/{cont.image1}"
			alt=""
			class="w-full h-auto"
		/>
	{/if}

	<!--Carousel-->

	{#if cont.image1 != "" && cont.image2 != ""}
		<!--Hacer uno Carousel-->
	{/if}

	<!--video-->

	{#if cont.video != ""}
		<iframe
			style="width:100vw; height:60vw"
			src={cont.video}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	{/if}
</section>