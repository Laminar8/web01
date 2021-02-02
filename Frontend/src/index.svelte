<script lang="typescript">
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import Cursor from "./components/cursor.svelte";
</script>

<Cursor />
<Router {routes} />
