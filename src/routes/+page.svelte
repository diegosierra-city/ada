<script lang="ts">
	import { onMount, prop_dev } from 'svelte/internal';
	import { apiKey } from '../store';
	import { fade, fly } from 'svelte/transition';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import type { BlockContent } from '$lib/types/BlockContent';
	import type { Menu } from '$lib/types/Menu';
	import type { WebContent } from '$lib/types/WebContent';

	const urlAPI = $apiKey.urlAPI;
	const urlFiles = $apiKey.urlFiles;
	const company_id = $apiKey.company_id;
	const company_name = $apiKey.company_name;
	const tokenWeb = $apiKey.tokenWeb;

	///load the content
	let cont: BlockContent = {
		id: 0,
		menu_id: 0,
		title: '',
		subtitle: '',
		text1: '',
		text2: '',
		text3: '',
		text4: '',
		image1: '',
		image2: '',
		image3: '',
		image4: '',
		video: '',
		position: 1,
		link: ''
	};
	let pag: Menu = {
		id: 0,
		menu_id: 0,
		menu: '',
		type: '',
		link: '',
		head: false,
		foot: false,
		side: false,
		position: 1,
		submenu: false,
		submenus: [],
		metadescription: '',
		metakeywords: ''
	};

	let listCont: Array<WebContent> = [
		{
			id: 0,
			menu: '',
			type: '',
			metadescription: '',
			metakeywords: '',

			content_id: 0,
			title: '',
			subtitle: '',
			text1: '',
			text2: '',
			text3: '',
			text4: '',
			image1: '',
			image2: '',
			image3: '',
			image4: '',
			video: '',
			position: 0,
			link: ''
		}
	];
	//
	onMount(async () => {
		/*
		console.log(
			urlAPI +
				'?ref=load-listDUO&folder=categories&folderB=products&union=category_id&company_id=' +
				company_id +
				'&tokenWeb=' +
				tokenWeb
		);
		*/
		/*
		console.log(
			urlAPI +
				'?ref=load-listWebContent&type=Gallery&company_id=' +
				company_id +
				'&tokenWeb=' +
				tokenWeb
		);
		*/
		fetch(
			urlAPI +
				'?ref=load-listWebContent&type=Gallery&company_id=' +
				company_id +
				'&tokenWeb=' +
				tokenWeb
		)
			.then((response) => response.json())
			.then((result) => {
				//console.table(result);
				if (result.error) {
					console.log('error');
					console.log(result.error);
				} else {
					console.log('ok');
					console.log(result);

					listCont = result;
				}
			});
	});

	onMount(async () => {
		/*
		console.log(
			urlAPI + '?ref=page-web&type=Home&company_id=' + company_id + '&tokenWeb=' + tokenWeb
		);
		*/
		fetch(urlAPI + '?ref=page-web&type=Home&company_id=' + company_id + '&tokenWeb=' + tokenWeb)
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
					//console.table(pag.metadescription);
				}
			});
	});

	$: innerWidth = 0;
	$: innerHeight = 0;
	let prefix: string = '';

	//$: console.log('Ancho: '+innerWidth)
	const movil = (w: number) => {
		if (w > 900) {
			//800
			prefix = '';
		} else {
			prefix = 'M';
		}
	};

	$: movil(innerWidth);

	let slide: number = 1;
	let slideView: number = 1;

	$: if (cont.image2 != '') {
		slide = 2;
		if (cont.image3 != '') {
			slide++;
		}
		if (cont.image4 != '') {
			slide++;
		}
	}

	function slidePlay(s: number) {
		//console.log('inicio:'+s)
		if (s > 1) {
			setInterval(() => {
				if (slideView == s) {
					slideView = 0;
				} else if (slideView == 0) {
					slideView = s - 1;
				}
				slideView++;
				//console.log('slid*:'+slideView+'+'+s)
			}, 7000);
		}
	}

	function slideControl(p: number) {
		if (p > slide) {
			slideView = 1;
		} else if (p == 0) {
			slideView = slide;
		} else {
			slideView = p;
		}
		//console.log('slide:'+slideView+'('+p+')'+slide)
	}

	$: slidePlay(slide);
</script>

<svelte:head>
	<title>{company_name}</title>
	<meta name="description" content={pag.metadescription} />
	<meta name="keywords" content={pag.metakeywords} />
</svelte:head>
<svelte:window bind:innerWidth bind:innerHeight />

<section class="-mt-10">
	<!--Image-->
	{#if cont.image1 != '' && cont.image2 == ''}
		<img src="{urlFiles}/images/pages/{cont.image1}" alt="" class="w-full h-auto" />
	{/if}

	<!--Carousel-->

	{#if cont.image1 != '' && cont.image2 != ''}
		<div class="relative w-full overflow-hidden">
			<img
				src="{urlFiles}/images/pages/{prefix}{cont.image1}"
				alt=""
				class="w-full h-auto relative z-0"
			/>
			<img src="{urlFiles}/images/pages/{prefix}{cont.image2}" alt="" class="hidden" />
			{#if cont.image3 != ''}
				<img src="{urlFiles}/images/pages/{prefix}{cont.image3}" alt="" class="hidden" />
			{/if}
			{#if cont.image4 != ''}
				<img
					transition:fade
					src="{urlFiles}/images/pages/{prefix}{cont.image4}"
					alt=""
					class="hidden"
				/>
			{/if}

			{#if slideView == 1}
				<img
					transition:fade
					src="{urlFiles}/images/pages/{prefix}{cont.image1}"
					alt=""
					class="w-full h-auto absolute top-0 left-0 z-30 "
				/>
				<div
					class="absolute bottom-10 left-0 z-30 w-full text-white drop-shadow-lg shadow-black "
					transition:fly={{ x: 200, duration: 2000 }}
				>
					<h2 class=" w-10/12 mx-auto">Frontend Developer</h2>
				</div>
			{/if}

			{#if slideView == 2}
				<img
					transition:fade
					src="{urlFiles}/images/pages/{prefix}{cont.image2}"
					alt=""
					class="w-full h-auto absolute top-0 left-0 z-20"
				/>
				<div
					class="absolute bottom-10 left-0 z-20 w-full text-white drop-shadow-lg shadow-black "
					transition:fly={{ x: 200, duration: 2000 }}
				>
					<h2 class=" w-10/12 mx-auto">Backend Developer</h2>
				</div>
			{/if}
			{#if cont.image3 != '' && slideView == 3}
				<img
					transition:fade
					src="{urlFiles}/images/pages/{prefix}{cont.image3}"
					alt=""
					class="w-full h-auto absolute top-0 left-0 z-10"
				/>
				<div
					class="absolute bottom-10 left-0 z-10 w-full text-white drop-shadow-lg shadow-black "
					transition:fly={{ x: 200, duration: 2000 }}
				>
					<h2 class=" w-10/12 mx-auto">Movil Developer</h2>
				</div>
			{/if}
			{#if cont.image4 != '' && slideView == 4}
				<img
					transition:fade
					src="{urlFiles}/images/pages/{prefix}{cont.image4}"
					alt=""
					class="w-full h-auto absolute top-0 left-0 z-0"
				/>
				<div
					class="absolute bottom-10 left-0 z-0 w-full text-white drop-shadow-lg shadow-black "
					transition:fly={{ x: 200, duration: 2000 }}
				>
					<h2 class=" w-10/12 mx-auto">Movil Developer</h2>
				</div>
			{/if}

			<div
				class="absolute z-40 left-2 bottom-2 rounded-lg bg-lightsteelblue p-1 opacity-50 cursor-pointer hover:text-white"
				on:click={() => {
					slideControl(slideView - 1);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
				</svg>
			</div>

			<div
				class="absolute z-40 right-2 bottom-2 rounded-lg bg-lightsteelblue p-1 opacity-50 cursor-pointer hover:text-white"
				on:click={() => {
					slideControl(slideView + 1);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>
			</div>
		</div>
	{/if}

	<!--video-->

	{#if cont.video != ''}
		<iframe
			style="width:100%; height:60vw"
			src="https://www.youtube.com/embed/{cont.video}"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	{/if}
</section>

<section>
	<div class="w-11/12 md:w-8/12 mx-auto">
		<h2 class="text-primary">Diego Sierra</h2>
		
	<p class="m-3 p-3 bg-aliceblue">{cont.text1}</p>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto my-6 px-4">
		{#each listCont as ct}
			<a class="card_home mx-auto" href="/page/{ct.link}">
				<div class="card_img">
					<img src="{urlFiles}/images/pages/M{ct.image1}" alt={ct.menu} />
				</div>
				<div class="card_title">
					<h3>{ct.menu}</h3>
					<p class="bg-black opacity-70 p-3 ">
						{ct.text1}
					</p>
				</div>
				<button
					class="btn-green mr-2 flex w-full !mx-auto !rounded-b-lg rounded-t-none relative z-10"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 mr-1"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					more info</button
				>
			</a>
		{/each}
	</div>
</section>
<!---->
