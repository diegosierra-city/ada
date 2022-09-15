<script>
    import { page } from '$app/stores';
  </script>
  
  <div class="w-8/12 mx-auto mb-4">
  <h1 class="text-primary">Error {$page.status}</h1> 
  <div class="w-full p-4 bg-silver">{$page.error.message}</div>
</div>