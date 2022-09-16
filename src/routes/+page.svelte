<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { apiKey } from '../store';

	import type { Car } from '$lib/types/Car';
	import type { Municipio } from '$lib/types/Municipios';

	const urlAPI = $apiKey.urlAPI;

	let listCars: Array<Car> = [];
	let listMunicipios: Array<Municipio> = [];

	//
	function loadlistCars() {
		fetch(urlAPI + 'car')
			.then((response) => response.json())
			.then((result) => {
				//console.table(result);
				if (result.error) {
					//console.log('error');
					console.log(result.error);
				} else {
					//console.log(result);

					listCars = result;
				}
			});
	}

	loadlistCars();

	function loadListMunicipios() {
		fetch('https://www.datos.gov.co/resource/xdk5-pm3f.json')
			.then((response) => response.json())
			.then((result) => {
				//console.table(result);
				if (result.error) {
					//console.log('error');
					console.log(result.error);
				} else {
					//console.log(result);

					listMunicipios = result;
				}
			});
	}

	loadListMunicipios();

	let showNewCar: boolean = false;
	let CarSelect: Car;
	let positionCar: number;

	function showEditCar(item: Car, position: number) {
		CarSelect = item;
		showNewCar = true;
		positionCar = position;
	}

	const editCar = () => {
		fetch(urlAPI + 'car/' + CarSelect.id + '/update', {
			method: 'POST',
			body: JSON.stringify({
				Id: CarSelect.id,
				Name: CarSelect.name,
				Model: CarSelect.model,
				Mark: CarSelect.mark,
				Department: CarSelect.department
				//
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			//.then((response) => response.json())
			.then((response) => console.log(response))
			.then((result: any) => {
				//console.log('ok:'+new_user.error)
				console.log(result);
				/// si es corrrecto
				showNewCar = false;
				listCars[positionCar] = CarSelect;

				//console.table(result)
			});

		//.catch((error) => {console.log(error)})

		//  });
	};

	const deleteCar = (id: number) => {
		if (confirm('Desea Borrar este registro?')) {
			listCars = listCars.filter((item) => item.id != id);
		}

		fetch(urlAPI + 'car/' + id + '/update', {
			method: 'DELETE',
			body: JSON.stringify({}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			//.then((response) => response.json())
			.then((response) => console.table(response))
			.then((result: any) => {
				//console.log('ok:'+new_user.error)
				console.log(result);
				/// si es corrrecto

				//console.table(result)
			});

		//.catch((error) => {console.log(error)})

		//  });
	};

	function newCar() {
		CarSelect = {
			id: 0,
			name: '',
			model: 0,
			mark: '',
			department: ''
		};
		showNewCar = true;
	}

	const saveCar = () => {
		CarSelect.id=Date.now();
		fetch(urlAPI + 'car/store', {
			method: 'POST',
			body: JSON.stringify({
				Id: CarSelect.id,
				Name: CarSelect.name,
				Model: CarSelect.model,
				Mark: CarSelect.mark,
				Department: CarSelect.department
				//
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			//.then((response) => response.json())
			.then((response) => console.table(response))
			.then((result) => {
				//
				console.log(result);
				showNewCar = false;
				listCars = [...listCars, CarSelect];
			});

		//.catch((error:any) => {console.log(error)});

		//  });
	};
</script>

<svelte:head>
	<title>ADA</title>
</svelte:head>

<section class="w-8/12 mx-auto">
	<h2 class="text-secondary text-center">Listado de Vehículos</h2>

	<div class="p-3 w-full ">
		<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
			<div class="flex">
				<button
					class="btn-primary flex"
					on:click={() => {
						newCar();
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 mr-1"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
							clip-rule="evenodd"
						/>
					</svg>
					Agregar Nuevo Vehículo</button
				>
			</div>
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
					<th scope="col" class="px-4 py-2" />
					<th scope="col" class="px-4 py-2"> Nombre </th>
					<th scope="col" class="px-4 py-2"> Modelo </th>
					<th scope="col" class="px-4 py-2"> Marca </th>
					<th scope="col" class="px-4 py-2"> Municipio </th>

					<th scope="col" class="px-4 py-2" />
					<th scope="col" class="px-4 py-2" />
				</thead>
				<tbody>
					{#each listCars as cr, i}
						<tr class="bg-white border-b hover:bg-aliceblue">
							<td class="font-bold">{i + 1}</td>
							<td>{cr.name}</td>
							<td>{cr.model}</td>
							<td>{cr.mark}</td>
							<td>{cr.department}</td>

							<td>
								<svg
									on:click={() => {
										showEditCar(cr, i);
									}}
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-green cursor-pointer hover:black"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
							</td>
							<td>
								<svg
									on:click={() => {
										deleteCar(cr.id);
									}}
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-red cursor-pointer hover:black"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/></svg
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

{#if showNewCar == true}
	<div
		class="bg-message"
		on:click={() => {
			showNewCar = false;
		}}
	/>

	<div class="znMessage">
		<div class="grid grid-cols-1 md:grid-cols-2 md:gap-4">
			<div>
				Nombre <br />
				<input type="text" class="inputA" placeholder="Nombre" bind:value={CarSelect.name} />
			</div>

			<div>
				Modelo <br />
				<input type="number" class="inputA" placeholder="Modelo" bind:value={CarSelect.model} />
			</div>

			<div>
				Marca <br />
				<input type="text" class="inputA" placeholder="Marca" bind:value={CarSelect.mark} />
			</div>

			<div>
				Municipio <br />
				<select class="inputA" bind:value={CarSelect.department} >
					{#each listMunicipios as municipio}
						<option value="{municipio.municipio}"
							>{municipio.municipio} ({municipio.departamento})</option
						>
					{/each}
				</select>
			</div>
		</div>

		<div class="flex mt-4">
			{#if CarSelect.id != 0}
				<button
					class="btn-green flex mr-4"
					on:click={() => {
						editCar();
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 mr-1"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
							clip-rule="evenodd"
						/>
					</svg>
					Guardar</button
				>
			{:else}
				<button
					class="btn-green flex mr-4"
					on:click={() => {
						saveCar();
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 mr-1"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
							clip-rule="evenodd"
						/>
					</svg>
					Registrar</button
				>
			{/if}

			<button
				class="ml-4 flex btn-red"
				on:click={() => {
					showNewCar = false;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 mr-1"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
						clip-rule="evenodd"
					/>
				</svg>
				Cancel</button
			>
		</div>
	</div>
{/if}
