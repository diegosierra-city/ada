import { writable } from "svelte/store";
import { browser } from "$app/env";
import type { User } from "$lib/types/User";

//export let cookie_name
//export let cookie_value

export const cookiesLibrary = writable([]);

export const cookie_update = (cookie_name:string, cookie_value:string) => {
	if(cookie_value==''){
		cookiesLibrary.subscribe((val) => browser && localStorage.removeItem(cookie_name));///delete
			}else{
			cookiesLibrary.subscribe((val) => browser && localStorage.setItem(cookie_name, cookie_value));///update	
			}
}

export const cookie_info = (name:string) => {
	return browser && localStorage.getItem(name)
}

export const apiKey = writable({
	company_id:1,
	company_name: "Diego Sierra",
	tokenWeb: "7ef4599929298387a27b4b220d757d2f",
	urlAPI: "https://diegosierra.cityciudad.com/api/",//https://diegosierra.cityciudad.com/api/
	urlFiles: "/maker",
})

export const moduleAdmin = writable('menu')//first module

export const userNow = writable({
	id: 0,
	company_id: 0,
	name: '',
	email: '',
	type: '',
	user_time_life: 0,
	token: ''	
})


/*
$apikey.set('nuevo valor')
$apikey.update
*/