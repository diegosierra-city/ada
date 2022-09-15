<script lang="ts">
	import { page } from '$app/stores';
	//$: console.log($page.params.slug);

	import { onMount } from 'svelte';

	import { apiKey } from '../../../store';
	import { fade, fly } from 'svelte/transition';
	import type { WebContent } from '$lib/types/WebContent';
	import type { Gallery } from '$lib/types/Gallery';
	import type { Form } from '$lib/types/Form';

	import Messages from '$lib/components/Messages.svelte';
	import type { Message } from '$lib/types/Message';

	let m_show: boolean = false;
	let message: Message;

	const urlAPI = $apiKey.urlAPI;
	const urlFiles = $apiKey.urlFiles;
	const company_id = $apiKey.company_id;
	const company_name = $apiKey.company_name;
	const tokenWeb = $apiKey.tokenWeb;

	let ContBase: WebContent = {
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
	};

	const loadContent = (name: string) => {
		console.log('contenido:' + name);

		console.log(
			urlAPI +
				'?ref=load-listWebContent&folder=content&name=' +
				name +
				'&company_id=' +
				company_id +
				'&tokenWeb=' +
				tokenWeb
		);
		/**/
		fetch(
			urlAPI +
				'?ref=load-listWebContent&folder=content&name=' +
				name +
				'&company_id=' +
				company_id +
				'&tokenWeb=' +
				tokenWeb
		)
			.then((response) => response.json())
			.then((result) => {
				ContBase = result[0];

				if (result[0].type == 'Gallery') {
					loadGallery(result[0].content_id);
				}
				if (result[0].type == 'Form') {
					loadForm(result[0].id);
				}
			});
	};

	$: loadContent($page.params.slug);

	let listGalleries: Array<Gallery> = [];

	const loadGallery = (id: number) => {
		console.log('gallery:' + id);

		console.log(
			urlAPI +
				'?ref=load-listGalleryWeb&company_id=' +
				company_id +
				'&tokenWeb=' +
				tokenWeb +
				'&id=' +
				id
		);
		/**/
		fetch(
			urlAPI +
				'?ref=load-listGalleryWeb&company_id=' +
				company_id +
				'&tokenWeb=' +
				tokenWeb +
				'&id=' +
				id
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Nuevas Galleries:::');
				console.log(result);
				/*
                   if (result[0].error) {
                       console.error(result[0].error);
                   } else {
                       //console.log("Listado Category Muy Bien:");
                       content = result[0];
                   }
               */
				listGalleries = result;
			});
	};

	let listForm: Array<Form> = [];
   let listFormReset: Array<Form> = [];  

	const loadForm = (id: number) => {
		console.log(
			urlAPI + '?ref=form-listWeb&company_id=' + company_id + '&tokenWeb=' + tokenWeb + '&id=' + id
		);
		fetch(
			urlAPI + '?ref=form-listWeb&company_id=' + company_id + '&tokenWeb=' + tokenWeb + '&id=' + id
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('recibiendo formulario:');
				//console.table(result);
				if (result.error) {
					//console.error(result.error);
					message = {
						title: 'Error',
						text: 'Error in Request ' + result.error,
						class: 'message-red',
						accion: ''
					};
					m_show = true;
				} else {
					console.log('Formulario:');
					console.log(result);
					//alert(cont_id+':'+result.length)
					if (result.length > 0) {
						listForm = result;
                 //listFormReset = [...result];
                  
					}
				}
			});
		//});
		//}

		//load_form (cont_id)
	};

	$: innerWidth = 0;
	$: innerHeight = 0;
	let prefix: string = '';

   let input:any

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

	$: if (ContBase.image2 != '') {
		slide = 2;
		if (ContBase.image3 != '') {
			slide++;
		}
		if (ContBase.image4 != '') {
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
		if (p == slide) {
			slideView = 1;
		} else if (p == 0) {
			slideView = slide;
		} else {
			slideView = p;
		}
		//console.log('control:'+slideView)
	}

	$: slidePlay(slide);

	let showGallery: boolean = false;

	let galleryImg: string = '';
	let galleryTitle: string = '';
	let galleryDescription: string = '';
	let galleryTotal: number = 0;
	let galleryActual: number = 0;

	$: galleryTotal = listGalleries.length - 1;

	function playGallery(position: number) {
		if (position > galleryTotal) {
			position = 0;
		} else if (position < 0) {
			position = galleryTotal;
		}
		console.log('position:' + position);
		let gallery: Gallery = listGalleries[position];
		galleryImg = gallery.image;
		galleryTitle = gallery.title;
		galleryDescription = gallery.description;
		galleryActual = position;
		showGallery = true;
	}

	const form_run = () => {
      
		fetch(urlAPI + '?ref=save-formWeb&company_id=' + company_id + '&tokenWeb=' + tokenWeb, {
			method: 'POST', //POST - PUT - DELETE
			body: JSON.stringify({
				listForm: listForm,
				page: ContBase.link,
				sendTo: 'diegosierra@cityciudad.com'
				//password: pass,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then((response) => response.json())
			//.then(result => console.log(result))
			.then((result) => {
				//console.log('ok:'+new_user[0].error)

				if (result[0].error) {
					console.error(result[0].error);
				} else {
               
					console.log(result[0]);
					message = {
						title: 'Send Form',
						text: 'The information was sent, thank you',
						class: 'message-green',
						accion: ''
					};
					m_show = true;
               

              //listForm= [...listFormReset ]
              bt_reset.click()
				}
			});

		//.catch(error => console.log('R:' + error))

		//  });
	}

let bt_reset:any
 
</script>

<svelte:head>
	<title>{ContBase.menu} - {company_name}</title>
	<meta name="description" content={ContBase.metadescription} />
	<meta name="keywords" content={ContBase.metakeywords} />
</svelte:head>
<svelte:window bind:innerWidth bind:innerHeight />

<section class="-mt-10">
	<!--Image-->
	{#if ContBase.image1 != '' && ContBase.image2 == ''}
		<img src="{urlFiles}/images/pages/{ContBase.image1}" alt="" class="w-full h-auto" />
	{/if}

	<!--Carousel-->

	{#if ContBase.image1 != '' && ContBase.image2 != ''}
		<div class="relative w-full overflow-hidden">
			<img src="{urlFiles}/images/pages/{prefix}{ContBase.image1}" alt="" class="w-full h-auto relative z-0" />
			<img src="{urlFiles}/images/pages/{prefix}{ContBase.image2}" alt="" class="hidden" />
			{#if ContBase.image3 != ''}
				<img src="{urlFiles}/images/pages/{prefix}{ContBase.image3}" alt="" class="hidden" />
			{/if}
			{#if ContBase.image4 != ''}
				<img src="{urlFiles}/images/pages/{prefix}{ContBase.image4}" alt="" class="hidden" />
			{/if}

			{#if slideView == 1}
				<img
					transition:fade
					src="{urlFiles}/images/pages/{prefix}{ContBase.image1}"
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
					src="{urlFiles}/images/pages/{prefix}{ContBase.image2}"
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
			{#if ContBase.image3 != '' && slideView == 3}
				<img
					transition:fade
					src="{urlFiles}/images/pages/{prefix}{ContBase.image3}"
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
			{#if ContBase.image4 != '' && slideView == 4}
				<img
					transition:fade
					src="{urlFiles}/images/pages/{prefix}{ContBase.image4}"
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

	{#if ContBase.video != ''}
		<iframe
			style="width:100%; height:60vw"
			src="https://www.youtube.com/embed/{ContBase.video}"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	{/if}
</section>

<section>
	<div class="w-11/12 md:w-8/12 mx-auto">
		{#if ContBase.title != ''}
			<h1 class="text-primary">{ContBase.title}</h1>
		{:else}
			<h1 class="text-primary">{ContBase.menu}</h1>
		{/if}

		<p>{ContBase.text1}</p>
		{#if ContBase.text2 != ''}
			<p>{ContBase.text2}</p>
		{/if}
		{#if ContBase.text3 != ''}
			<p>{ContBase.text3}</p>
		{/if}
		{#if ContBase.text4 != ''}
			<p>{ContBase.text4}</p>
		{/if}

		{#if ContBase.type == 'Gallery'}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
				{#each listGalleries as gallery, i}
					<div
						class="card_home border-2 border-silver mx-auto"
						on:click={() => {
							playGallery(i);
						}}
					>
						<div class="card_img">
							<img src="{urlFiles}/images/gallery/M{gallery.image}" alt="" class="w-full h-auto" />
							<img src="{urlFiles}/images/gallery/{gallery.image}" alt="" class="hidden" />
						</div>
						<div class="card_titleB"><h4>{gallery.title}</h4></div>
					</div>
				{/each}
			</div>
		{/if}

		{#if ContBase.type == 'Form'}
			<form on:submit|preventDefault={form_run}>
				<div
					class="grid gap-4 grid-cols-1 lg:grid-cols-2 bg-aliceblue p-4 rounded-lg my-4 md:w-10/12 xl:w-8/12 mx-auto"
				>
					{#each listForm as item}
						{#if item.type == 'text'}
							<input
								type="text"
								class="inputA"
								required={item.required == true}
								bind:value={item.response}
								placeholder={item.name}
                        
							/>
						{:else if item.type == 'number'}
							<input
								type="number"
								class="inputA"
								required={item.required == true}
								bind:value={item.response}
								placeholder={item.name}
							/>
						{:else if item.type == 'date'}
							<input
								type="date"
								class="inputA"
								required={item.required == true}
								bind:value={item.response}
								placeholder={item.name}
							/>
						{:else if item.type == 'email'}
							<input
								type="email"
								class="inputA"
								required={item.required == true}
								bind:value={item.response}
								placeholder={item.name}
							/>
						{:else if item.type == 'phone'}
							<input
								type="phone"
								class="inputA"
								required={item.required == true}
								bind:value={item.response}
								placeholder={item.name}
							/>
						{:else if item.type == 'longtext'}
							<textarea
								class="inputA h-28"
								required={item.required == true}
								bind:value={item.response}
								placeholder={item.name}
							/>
						{:else if item.type == 'checkbox'}
							<div class="flex align-middle items-center">
								<input
									type="checkbox"
									class="inputA w-8 mr-2"
									required={item.required == true}
									bind:checked={item.response}
								/> <span>{item.name}</span>
							</div>
						{:else}
							<!-- else content here -->
						{/if}
					{/each}

				<button type="submit" class="btn-green w-2/4">Send</button>
            <button type="reset" class="hidden" bind:this={bt_reset}>	Reset</button>	
				</div>
				
			</form>
		{/if}
	</div>
</section>

{#if ContBase.type == 'Gallery' && showGallery == true}
	<!--Gallery System-->

	<!-- transition:fade-->
	<div
		class="bg-black opacity-70 fixed top-0 left-0 right-0 bottom-0 z-50"
		on:click={() => {
			showGallery = !showGallery;
		}}
	/>

	<div
		transition:fade
		class="w-9/12 lg:w-6/12 xl:w-5/12 mx-auto  fixed z-50 rounded-xl border-2 border-white "
		style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
	>
		<img src="{urlFiles}/images/gallery/{galleryImg}" alt="" class="rounded-t-xl w-full h-auto" />

		<div class="bg-primary text-white rounded-b-xl p-3">
			<h3>{galleryTitle}</h3>
			<p>{@html galleryDescription}</p>
		</div>

		<div
			class="absolute shadow-lg cursor-pointer"
			style="top: 50%; left: -60px; transform: translate(0, -50%); "
			on:click={() => {
				playGallery(galleryActual - 1);
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				id="arrow-circle-down"
				viewBox="0 0 24 24"
				width="50"
				height="50"
				fill="white"
				class="opacity-80 hover:opacity-100 "
				><path
					d="M24,12A12,12,0,1,0,12,24,12.013,12.013,0,0,0,24,12ZM8,12a2.993,2.993,0,0,1,.752-1.987c.291-.327.574-.637.777-.84L12.353,6.3a1,1,0,0,1,1.426,1.4L10.95,10.58c-.187.188-.441.468-.7.759a1,1,0,0,0,0,1.323c.258.29.512.57.693.752L13.779,16.3a1,1,0,0,1-1.426,1.4L9.524,14.822c-.2-.2-.48-.507-.769-.833A2.99,2.99,0,0,1,8,12Z"
				/></svg
			>
		</div>

		<div
			class="absolute shadow-lg cursor-pointer"
			style="top: 50%; right: -60px; transform: translate(0, -50%); "
			on:click={() => {
				playGallery(galleryActual + 1);
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				id="arrow-circle-down"
				viewBox="0 0 24 24"
				width="50"
				height="50"
				fill="white"
				class="opacity-80 hover:opacity-100 "
				><path
					d="M0,12A12,12,0,1,0,12,0,12.013,12.013,0,0,0,0,12Zm16,0a2.993,2.993,0,0,1-.752,1.987c-.291.327-.574.637-.777.84L11.647,17.7a1,1,0,1,1-1.426-1.4L13.05,13.42c.187-.188.441-.468.7-.759a1,1,0,0,0,0-1.323c-.258-.29-.512-.57-.693-.752L10.221,7.7a1,1,0,1,1,1.426-1.4l2.829,2.879c.2.2.48.507.769.833A2.99,2.99,0,0,1,16,12Z"
				/></svg
			>
		</div>
	</div>
	<!--End Gallery System-->
{/if}

{#if m_show == true}
	<Messages bind:m_show bind:message />
{/if}
