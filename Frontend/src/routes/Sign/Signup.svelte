<script lang="typescript">
  import Signup from "../../components/Sign/signup.svelte";
</script>

<div class="container">
  <Signup />
</div>

<style type="text/scss">
  .container {
    display: grid;
    grid-template-rows: 1fr 8fr 1fr;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-areas:
      ". . ."
      ". signup-center ."
      ". . .";
  }
</style>
