<script>
  import { onMount } from "svelte";
  const baseUrl = "http://localhost:4000";
  let posts = [];
  onMount(async () => {
    let res = await fetch(baseUrl);
    posts = await res.json();
    console.log(posts);
  });
</script>

<div class="card-header">{posts}</div>