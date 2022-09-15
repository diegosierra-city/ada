<script lang="ts">
    import type { Category } from "../types/Category";
    import { onMount } from "svelte/internal";
    import { apiKey, userNow } from "../../store";
    import { Circle3 } from 'svelte-loading-spinners';
    import AdminProducts from "$lib/components/AdminProducts.svelte";

    import Messages from '$lib/components/Messages.svelte';

	import type { Message } from '$lib/types/Message';

	let m_show: boolean = false;
	let message: Message;

    //
    let show_products: boolean =false;
    let category_id: number;
    let category_name: string;
let new_category: Category
    let categoryN: Category = {
        id: 0,
        category: "",
        description:'',
        position: 1,
        image: "",
        active: true,
    };
new_category=categoryN
    
    let category_list: Array<Category> = [];

    const urlAPI = $apiKey.urlAPI;
const urlFiles = $apiKey.urlFiles
    onMount(async () => {
        fetch(
            urlAPI +
                "?ref=category-list&user_id=" +
                $userNow.id +
                "&time=" +
                $userNow.user_time_life +
                "&token=" +
                $userNow.token
        )
            .then((response) => response.json())
            .then((result) => {
                //console.table(result);
                if (result[0].error) {
                    console.error(result[0].error);
                } else {
                    //console.log("Listado Category Muy Bien:");
                    category_list = result;
                }
            });
    });

    const saveCategory = () => {
        //console.log("yy");
        //// POST

        fetch(urlAPI + "?ref=save-category", {
            method: "POST", //POST - PUT - DELETE
            body: JSON.stringify({
                user_id: $userNow.id,
                time_life: $userNow.user_time_life,
                token: $userNow.token,
                categories: category_list,
                //password: pass,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            //.then(result => console.log(result))
            .then((result) => {
                //console.log('ok:'+new_user.error)

                if (result[0].error) {
                    message = {
						title: 'Error',
						text: "Error: " + result[0].error,
						class: 'message-red',
						accion: ''
					};
					m_show = true;
                    
                    console.error(result[0].error);
                } else {
                    message = {
						title: 'Save',
						text: "Save data",
						class: 'message-green',
						accion: ''
					};
					m_show = true;
                    
                    //console.log("Muy Bien:"+result[0].ok);
                    category_list = result;
                    //new_user = result[0]
                    //cookie_update('user',JSON.stringify(new_user))
                }
            });

        //.catch(error => console.log(error))

        //  });
    };

    //$: console.log(category_list);

    function add_category() {
        //category_list.push(new_category) ///esta opción no actuaiza el listado automáticamente
        new_category.id = Date.now();
        //category_list.push(new_category)
        category_list = [...category_list, new_category];
        new_category = categoryN
        //console.log('nuevo')
        //show_message("Add Category", "Information was saved", "message-green");
    }

    const deleteCategory = (id: number) => {
        if (confirm("Delete this Category?")) {
            category_list = category_list.filter((item) => item.id != id);
            //mensaje("se borró la tarea", "text-bg-danger");
            message = {
						title: 'Delete Category',
						text: "Information was deleted",
						class: 'message-red',
						accion: ''
					};
					m_show = true;
            
            saveCategory();
            //return category_list;
        }
    };

    

    let fileinput:any;
    let image_id: number = 0;
    let image_position: number = 0;

    //function upload(id: number, position: number) {
    const upload = (e:any) => {
        //console.log('FF:'+image_id)
        if (image_id > 1000000) {
            message = {
						title: 'Error',
						text: "First save this Category",
						class: 'message-red',
						accion: ''
					};
					m_show = true;
            
        } else {
            let image = e.target.files[0];
            //console.table(fileinput);
            //alert(image_id+'*'+image_position+'*'+category_list[image_position].position);
            //console.table(image);
            category_list[image_position].image='load'
            const dataArray = new FormData();
            dataArray.append("user_id", String($userNow.id));
            dataArray.append("time_life", String($userNow.user_time_life));
            dataArray.append("token", $userNow.token);
            dataArray.append("id", String(image_id));
            dataArray.append("position", '');
            dataArray.append("uploadFile", image);

            fetch(urlAPI + "?ref=upload&folder=products&prefix=C", {
                method: "POST",
                body: dataArray,
            })
                .then((response) => response.json())
                .then((result) => {
                    // Successfully uploaded
                    //console.log("RRRY:");
                    //console.table(result);

                    if (result[0].error) {
                        message = {
						title: 'Error',
						text: "Error: " + result[0].error,
						class: 'message-red',
						accion: ''
					};
					m_show = true;
                        
                    } else {
                        category_list[image_position] = result[0];
                        message = {
						title: 'Upload',
						text: "File uploaded",
						class: 'message-green',
						accion: ''
					};
					m_show = true;
                       
                    }
                })
                .catch((error) => {
                    // Upload failed
                    //console.table(error);
                    console.log("error");
                    //show_message("Error", "error: " + error, "message-red");
                });
        }
    };

    
</script>

<svelte:head>
    <title>Admin Products</title>
    
</svelte:head>

{#if show_products==false}
<div class="p-3 w-full">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex">
            <button class="btn-green mr-2 flex" on:click={saveCategory}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                    />
                </svg>
                Save</button
            >
            <button class="btn-primary flex" on:click={add_category}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clip-rule="evenodd"
                    />
                </svg>
                Add Category</button
            >
        </div>
        <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
            <thead
                class="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400"
            >
                <th scope="col" class="px-4 py-2" />
                <th scope="col" class="px-4 py-2"> Category</th>
<th scope="col" class="px-4 py-2"> Description</th>
                <th scope="col" class="px-4 py-2 text-center"> Position </th>
                <th scope="col" class="px-4 py-2 text-center">
                    Image JPG-PNG  <small>1600-600px</small></th
                >
                <th scope="col" class="px-4 py-2 text-center"> Active </th>
                <th scope="col" class="px-4 py-2 text-center"> Products </th>
                <th scope="col" class="px-4 py-2" />
            </thead>
            <tbody>
                {#each category_list as ct, i}
                    <tr class="bg-white border-b hover:bg-aliceblue">
                        <td class="text-bold">{i + 1}</td>
                        <td>
                            <input
                                type="text"
                                class="inputA"
                                bind:value={ct.category}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                class="inputA"
                                bind:value={ct.description}
                            />
                        </td>
                        <td class="text-center">
                            <input
                                type="number"
                                min="1"
                                max="99"
                                class="inputA w-12"
                                bind:value={ct.position}
                            />
                        </td>
                        <td class="">
                            <div class="flex justify-center ">

                                {#if ct.image == 'load'}
										<Circle3 size="20" unit="px" duration="2s" />
									{:else if ct.image != ""}
                                    <div class="flex items-center">
                                        <img
                                            class="w-16 h-auto mr-2"
                                            src='{urlFiles}/images/products/M{ct.image}'
                                            alt={ct.category}
                                        />
                                        
                                        <button
                                            class="btn-min bg-red mr-2 flex"
                                            on:click={() => {
                                                ct.image = "";
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5 mr-1 "
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
                                            ></button
                                        >
                                    </div>
                                {/if}
                                <div class="flex items-center">
                                    <div
                                        class="btn-min bg-primary"
                                        on:click={() => {
                                            
                                            image_id = ct.id;
                                            image_position = i;
                                            fileinput.click();
                                            
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5 text-white cursor-pointer hover:black"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg> file
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center"
                            ><input
                                type="checkbox"
                                bind:checked={ct.active}
                            /></td
                        >

                        <td>
                            <svg
                                on:click={() => {
                                    category_id = ct.id;
                                    category_name = ct.category;
                                    show_products=true;
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-primary cursor-pointer hover:black mx-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </td>
                        <td>
                            <svg
                                on:click={() => {
                                    deleteCategory(ct.id);
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

                    <!---->
                {:else}
                    Please Add the First Category
                {/each}
            </tbody>
        </table>
        <input
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png"
            on:change={(e) => {
                upload(e);
            }}
            bind:this={fileinput}
        />
    </div>
</div>
     {:else}
     <AdminProducts {category_id} {category_name} bind:show_products={show_products}/>
{/if}





<Messages bind:m_show={m_show} bind:message={message} />