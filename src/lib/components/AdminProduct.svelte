<script lang="ts">
    import { apiKey, userNow } from "../../store";
    import type { Product } from "../types/Product";
    import { Circle3 } from 'svelte-loading-spinners';
    import Messages from '$lib/components/Messages.svelte';

	import type { Message } from '$lib/types/Message';

	let m_show: boolean = false;
	let message: Message;

    export let show_product: boolean;
    

    export let prod: Product;
    //export let prod_position: number;
    //export let product_edit: number

    //$: console.log('PX:'+prod)
    //$: prod=product[product_edit]

    const urlAPI = $apiKey.urlAPI;
    const urlFiles = $apiKey.urlFiles;

    const saveProd = () => {
        //console.log("yy:" + prod.id);
        fetch(urlAPI + "?ref=save-prod", {
            method: "POST", //POST - PUT - DELETE
            body: JSON.stringify({
                user_id: $userNow.id,
                time_life: $userNow.user_time_life,
                token: $userNow.token,
                product: prod,
                //prod_position: prod_position
                //
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            //.then(result => console.log(result))
            .then((result) => {
                //console.log('ok:'+new_user.error)
                console.table(result);
                if (result[0].error) {
                    message = {
						title: 'Error',
						text: "Error: " + result.error,
						class: 'message-red',
						accion: ''
					};
					m_show = true;
                    
                    //console.error(result[0].error);
                } else {
                    //++++show_message("Save", "Save data", "message-green");
                    //console.log("Muy Bien:"+result[0].ok);
                    prod = result[0];
                    console.log("cargado");
                    message = {
						title: 'Save Product',
						text: "Save Product " + prod.product,
						class: 'message-green',
						accion: ''
					};
					m_show = true;
                    
                    //console.table(product);
                }
            });

        //.catch(error => console.log(error))

        //  });
    };

    let fileImage: FileList;

    function upload(position: number) {
        //console.table(fileImage[0]);
        const dataArray = new FormData();
        dataArray.append("user_id", String($userNow.id));
        dataArray.append("time_life", String($userNow.user_time_life));
        dataArray.append("token", $userNow.token);
        dataArray.append("id", String(prod.id));
        dataArray.append("position", String(position));
        dataArray.append("uploadFile", fileImage[0]);

        fetch(urlAPI + "?ref=upload&folder=products&prefix=", {
            method: "POST",
            body: dataArray,
        })
            .then((response) => response.json())
            .then((result) => {
                // Successfully uploaded
                console.log("upload:");
                console.log(result);

                if (result[0].error) {
                    message = {
						title: 'Error',
						text: "Error: " + result[0].error,
						class: 'message-red',
						accion: ''
					};
					m_show = true;
                    
                } else {
                    prod = result[0];
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
                console.log(error);
            });
    }
</script>


    <div class="bg-edit">
        <div class="edit-page">
            <h3>{prod.product}</h3>

            <div class="flex mt-3 bg-aliceblue p-3 rounded-lg">
                <button
                    class="btn-green flex"
                    on:click={() => {
                        show_product = false;
                        saveProd();
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
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Save</button
                >
                <button
                    class="ml-4 flex btn-red"
                    on:click={() => {
                        show_product = false;
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
                    Close</button
                >
            </div>

            <div
                aria-label="form"
                tabindex="0"
                class="focus:outline-none xl:w-10/12 w-full "
            >
                <div class="xl:px-8">
                    <div
                        class="mt-16 lg:flex justify-between border-b border-silver pb-4"
                    >
                        <div class="w-80">
                            <div class="flex items-center">
                                <h1
                                    tabindex="0"
                                    class="focus:outline-none text-xl font-medium pr-2 leading-5 text-gray-800"
                                >
                                    Images
                                </h1>
                            </div>
                            <p
                                tabindex="0"
                                class="focus:outline-none mt-4 text-sm leading-5 text-gray-600"
                            >
                                Upload the images
                            </p>
                        </div>
                        <div>
                            <div class="md:flex items-center lg:ml-24">
                                <div class="md:w-64 mx-2">
{#if prod.image1 == "load"}
<Circle3 size="60" unit="px" duration="2s" />                                 
                                    {:else if prod.image1 != ""}
                                        <img
                                            src="{urlFiles}/images/products/M{prod.image1}"
                                            alt={prod.product}
                                        /> <br />
                                        <button
                                            class="btn-red flex"
                                            on:click={() => {
                                                prod.image1 = "";
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
                                            >
                                            Delete
                                        </button>
                                    {/if}
                                    Image JPG - PNG <br />
                                    <small>800 x 600 px</small>

                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        class="inputA"
                                        placeholder="Image 1"
                                        bind:files={fileImage}
                                        on:change={() => {
                                            prod.image1='load'
                                            upload(1);
                                        }}
                                    />
                                </div>

                                <div class="md:w-64 mx-2">
                                    {#if prod.image2 == "load"}
<Circle3 size="60" unit="px" duration="2s" />                                 
                                    {:else if prod.image2 != ""}
                                        <img
                                            src="{urlFiles}/images/products/M{prod.image2}"
                                            alt={prod.product}
                                        /> <br />
                                        <button
                                            class="btn-red flex"
                                            on:click={() => {
                                                prod.image2 = "";
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
                                            >
                                            Delete
                                        </button>
                                    {/if}
                                    Image JPG - PNG <br />
                                    <small>800 x 600 px</small>

                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        class="inputA"
                                        placeholder="Image 2"
                                        bind:files={fileImage}
                                        on:change={() => {
                                            prod.image2;
                                            upload(2);
                                        }}
                                    />
                                </div>
                            </div>
                            <div class="md:flex items-center lg:ml-24">
                                <div class="md:w-64 mx-2">
                                    {#if prod.image3 == "load"}
<Circle3 size="60" unit="px" duration="2s" />                                 
                                    {:else if prod.image3 != ""}
                                        <img
                                            src="{urlFiles}/images/products/M{prod.image3}"
                                            alt={prod.product}
                                        /> <br />
                                        <button
                                            class="btn-red flex"
                                            on:click={() => {
                                                prod.image3 = "";
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
                                            >
                                            Delete
                                        </button>
                                    {/if}
                                    Image JPG - PNG <br />
                                    <small>800 x 600 px</small>

                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        class="inputA"
                                        placeholder="Image 3"
                                        bind:files={fileImage}
                                        on:change={() => {
                                            prod.image3;
                                            upload(3);
                                        }}
                                    />
                                </div>

                                <div class="md:w-64 mx-2">
                                    {#if prod.image4 == "load"}
<Circle3 size="60" unit="px" duration="2s" />                                 
                                    {:else if prod.image4 != ""}
                                        <img
                                            src="{urlFiles}/images/products/M{prod.image4}"
                                            alt={prod.product}
                                        /> <br />
                                        <button
                                            class="btn-red flex"
                                            on:click={() => {
                                                prod.image4 = "";
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
                                            >
                                            Delete
                                        </button>
                                    {/if}
                                    Image JPG - PNG <br />
                                    <small>800 x 600 px</small>

                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        class="inputA"
                                        placeholder="Image 4"
                                        bind:files={fileImage}
                                        on:change={() => {
                                            prod.image4='load';
                                            upload(4);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:px-8">
                    <div
                        class="mt-16 lg:flex justify-between border-b border-silver pb-4"
                    >
                        <div class="w-80">
                            <div class="flex items-center">
                                <h1
                                    tabindex="0"
                                    class="focus:outline-none text-xl font-medium pr-2 leading-5 text-gray-800"
                                >
                                    Basic
                                </h1>
                            </div>
                            <p
                                tabindex="0"
                                class="focus:outline-none mt-4 text-sm leading-5 text-gray-600"
                            >
                                Product, reference and others
                            </p>
                        </div>
                        <div>
                            <div class="md:flex items-center lg:ml-24">
                                <div class="md:w-64 mx-2">
                                    Product <br />

                                    <input
                                        type="text"
                                        class="inputA"
                                        placeholder="Product"
                                        bind:value={prod.product}
                                    />
                                </div>

                                <div class="md:w-64 mx-2">
                                    Ref <br />

                                    <input
                                        type="text"
                                        class="inputA"
                                        placeholder="Ref"
                                        bind:value={prod.ref}
                                    />
                                </div>
                            </div>
                            <div class="md:flex items-center lg:ml-24">
                                <div class="md:w-64 mx-2">
                                    Size<br />
                                    <input
                                        type="text"
                                        class="inputA"
                                        placeholder="Size"
                                        bind:value={prod.size}
                                    />
                                </div>

                                <div class="md:w-64 mx-2">
                                    Color<br />
                                    <input
                                        type="text"
                                        class="inputA"
                                        placeholder="Color"
                                        bind:value={prod.color}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:px-8">
                    <div
                        class="mt-16 lg:flex justify-between border-b border-silver pb-4"
                    >
                        <div class="w-80">
                            <div class="flex items-center">
                                <h1
                                    tabindex="0"
                                    class="focus:outline-none text-xl font-medium pr-2 leading-5 text-gray-800"
                                >
                                    Description
                                </h1>
                            </div>
                            <p
                                tabindex="0"
                                class="focus:outline-none mt-4 text-sm leading-5 text-gray-600"
                            >
                                Blocks of text
                            </p>
                        </div>
                        <div>
                            <div class="md:flex items-center lg:ml-24">
                                <div class="md:w-64 mx-2">
                                    Small Description<br />
                                    <textarea
                                        class="inputA"
                                        rows="10"
                                        placeholder="Description 1"
                                        bind:value={prod.description}
                                    />
                                </div>

                                <div class="md:w-64 mx-2">
                                    Full Description<br />
                                    <textarea
                                        class="inputA"
                                        rows="10"
                                        placeholder="Description 2"
                                        bind:value={prod.description2}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:px-8">
                    <div
                        class="mt-16 lg:flex justify-between border-b border-silver pb-4"
                    >
                        <div class="w-80">
                            <div class="flex items-center">
                                <h1
                                    tabindex="0"
                                    class="focus:outline-none text-xl font-medium pr-2 leading-5 text-gray-800"
                                >
                                    Price
                                </h1>
                            </div>
                        </div>
                        <div>
                            <div class="md:flex items-center lg:ml-24">
                                <div class="md:w-64 mx-2">
                                    Price<br />
                                    <input
                                        type="number"
                                        class="inputA"
                                        placeholder="Price"
                                        bind:value={prod.price}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex mt-3 bg-aliceblue p-3 rounded-lg">
                <button
                    class="btn-green flex"
                    on:click={() => {
                        show_product = false;
                        saveProd();
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
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Save</button
                >
                <button
                    class="ml-4 flex btn-red"
                    on:click={() => {
                        show_product = false;
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
                    Close</button
                >
            </div>
        </div>
    </div>


<Messages bind:m_show={m_show} bind:message={message} />