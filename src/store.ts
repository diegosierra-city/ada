import { writable } from "svelte/store";

export const apiKey = writable({
	company_id:1,
	company_name: "Diego Sierra",
	tokenWeb: "7ef4599929298387a27b4b220d757d2f",
	urlAPI: "https://diegosierra.cityciudad.com/api/",//https://diegosierra.cityciudad.com/api/
	urlFiles: "/maker",
})
