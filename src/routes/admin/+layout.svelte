<script lang="ts">
    import "../../app.css";
  import MenuAdmin from "$lib/components/MenuAdmin.svelte";
  import {userNow } from '../../store';
	
	
  </script>
 

    <div class="flex -mt-12 ">
      {#if $userNow.id>0}
      <MenuAdmin/>
      {/if}

<slot/>
    </div>
 
  