<script lang="typescript">
  import Signin from "../../components/Sign/signin.svelte";
</script>

<div class="container">
  <Signin />
</div>

<style type="text/scss">
  .container {
    display: grid;
    grid-template-rows: 1fr 8fr 1fr;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-areas:
      ". . ."
      ". signin-center ."
      ". . .";
  }
</style>
