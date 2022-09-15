<script lang="ts">
	import { onMount } from "svelte/internal";
	import { apiKey } from "../../../store";
	
	import { page } from '$app/stores';
 $: console.log($page.params.slug)

	import type { Category } from "$lib/types/Category";
	import type { Product } from "$lib/types/Product";


	 let category: string;
category=$page.params.slug;

	const removeAccents = (str:string) => {
		let result=str.replace(/ /g, "-")
  return result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 


	let listCat: Array<Category> = [
		{
			id: 0,
			category: "",
			description:'',
			position: 1,
			image: "",
			active: true,
		},
	];

	let listProd: Array<Product> = [
		{
			id: 0,
			category_id: 0,
			product: "",
			ref: "",
			description: "",
			description2: "",
			price: 0,
			size: "",
			color: "",
			image1: "",
			image2: "",
			image3: "",
			image4: "",
			position: 0,
			active: true,
		},
	];

	const urlAPI = $apiKey.urlAPI;
	const urlFiles= $apiKey.urlFiles;
	const company_id = $apiKey.company_id;
	const company_name = $apiKey.company_name;
	const tokenWeb = $apiKey.tokenWeb;

	const loadCategory= (ct:number) => {
		fetch(
			urlAPI +
				"?ref=categories-web&category=" +
				ct +
				"&company_id=" +
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
					if (category == "") {
						listCat = result[0];
					} else {
						listCat = result[0];
						listProd = result[1];
					}

					//cont = JSON.parse(result[1]);
				}
			});
	}

	

	///////$: loadCategory(category)
</script>

<svelte:head>
	{#if category==''}
	<title>{company_name} - Products</title>	
	{:else}
	<title>{company_name} - {category}</title>
	{/if}
	
</svelte:head>

<!--focus navigator-->
<h1 class="hidden">{category}</h1>

{#if category==''}


<section class="w-8/12 mx-auto mt-4">
	<h2>Categories</h2>
	<div class="grid gap-4 grid-cols-2 lg:grid-cols-4 p-4 rounded-lg my-4">
{#each listCat as cat}

	 <a class="card text-center" href="/product/{removeAccents(cat.category)}">
		<h4>{cat.category}</h4>
<img src="{urlFiles}/images/products/{cat.image}" alt="">
	 </a>
{/each}
</div>
</section>

{:else}

	<section class="w-8/12 mx-auto mt-4">
		<h2>Products</h2>
		<div class="grid gap-4 grid-cols-2 lg:grid-cols-4 p-4 rounded-lg my-4">
	{#each listProd as prodt}
	
		 <a class="card text-center" href="/product/{prodt.category_id}/{removeAccents(prodt.product)}">
			<h4>{prodt.product}</h4>
	<img src="{urlFiles}/images/products/M{prodt.image1}" alt="">
		 </a>
	{/each}
	</div>
	</section>
	



{/if}