<script lang="ts">
	import type { User } from '../types/User';
	import { cookie_update, cookie_info, moduleAdmin, userNow } from '../../store';

	//export let userNow = cookie_info('user')
	
	let userNew: User = {
		id: 0,
		company_id: 0,
		name: '',
		email: '',
		type: '',
		user_time_life: 0,
		token: ''
	};
	
	const salir = () => {
		cookie_update('user', JSON.stringify(userNew));
        $userNow=userNew
	};
</script>


<div class="relative">
	<div class="w-14 lg:w-52" />

	<div class="w-14 lg:w-52 fixed bg-primary shadow top-0 bottom-0 flex-col justify-between ">
		<div class="px-2 lg:px-4">
			<div class="h-16 w-full items-center pt-5">
				<h3 class="text-white hidden lg:block">Admin Panel</h3>
				<small class="text-white hidden lg:block">{$userNow.name}</small>
			</div>
			<ul class="mt-8 pb-2 border-b border-white boton_admin">
				<li
					class:boton_admin_active={$moduleAdmin === 'menu'}
					on:click={() => {
						$moduleAdmin = 'menu';
					}}
				>
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
							/>
						</svg>
						<span class="text-sm ml-2 hidden lg:block">Pages</span>
					</div>
					<!--
                    <div class="boton_alert">5</div>
                    -->
				</li>

				<li
					class:boton_admin_active={$moduleAdmin === 'categories'}
					on:click={() => {
						$moduleAdmin = 'categories';
					}}
				>
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
							/>
						</svg>
						<span class="text-sm ml-2 hidden lg:block">Products</span>
					</div>
				</li>
				<li
					class:boton_admin_active={$moduleAdmin === 'forms'}
					on:click={() => {
						$moduleAdmin = 'forms';
					}}
				>
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
							/>
						</svg>
						<span class="text-sm ml-2 hidden lg:block">Forms</span>
					</div>
				</li>
				<!-- 
            
                <li class="{botones[0]['b3']}" on:click={()=>{botones[0]['b'+boton_activo]='boton_admin'; botones[0]['b3']='boton_admin_active'; boton_activo=3; }}>
                    <div class="focus:ring-2 focus:ring-white focus:outline-none flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                    <span class="text-sm ml-2 hidden lg:block">Landing Pages</span>
                    </div>
                    
                </li>
                
                <li class="boton_admin">
                    <div class="focus:ring-2 focus:ring-white focus:outline-none flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                    <span class="text-sm ml-2 hidden lg:block">Shoping Cart</span>
                    </div>
                    
                </li>
                <li class="boton_admin">
                    <div class="focus:ring-2 focus:ring-white focus:outline-none flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                    <span class="text-sm ml-2 hidden lg:block">Clients</span>
                    </div>
                    
                </li>
                <li class="boton_admin">
                    <div class="focus:ring-2 focus:ring-white focus:outline-none flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                    <span class="text-sm ml-2 hidden lg:block">Users</span>
                    </div>
                    
                </li>
                -->
			</ul>

			<!--
            <div class="flex justify-center mt-6 mb-4 w-full">
    
                <div class="relative">
                    <div class="text-gray-300 absolute ml-4 inset-0 m-auto w-4 h-4">
                        <img class="icon icon-tabler icon-tabler-search" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/with-search-bar-and-bottom-control-svg3.svg" alt="search" />
                    </div>
                    <input class="bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-100 rounded w-full text-sm text-gray-300 placeholder-gray-400 bg-gray-100 pl-10 py-2" type="text" placeholder="Search" />
                </div>
    
            </div>
    -->
		</div>
		<div class="px-0 lg:px-8 border-t border-white absolute bottom-0 w-full">
			<ul class="w-full lg:flex items-center justify-between ">
				<li class="cursor-pointer text-white pt-0 pb-3">
					<button class="icono_admin" on:click={salir}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
					</button>
				</li>
				<li class="cursor-pointer text-white pt-0 pb-3">
					<button aria-label="open chats" class="icono_admin">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				</li>
				<li class="cursor-pointer text-white pt-0 pb-3">
					<button aria-label="open settings" class="icono_admin">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
							/>
						</svg>
					</button>
				</li>
			</ul>
		</div>
	</div>
</div>

