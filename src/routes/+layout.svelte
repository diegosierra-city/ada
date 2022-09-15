<script lang="ts">
  import { page } from '$app/stores';
    import "../app.css";
    import Header from "$lib/components/Header.svelte";
    import Footer from '$lib/components/Footer.svelte';
    

  </script>
  <!--
 {$page.url.pathname}   
  -->


  {#if $page.url.pathname!=='/admin' && $page.url.pathname!=='/admin/'}
    <Header />
  {/if}
  
  <main>
 <slot />
  </main>
  
  {#if $page.url.pathname!=='/admin' && $page.url.pathname!=='/admin/'}
  <Footer/>
{/if}