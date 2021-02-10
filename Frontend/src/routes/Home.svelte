<script lang="typescript">
  import Column1 from "../components/Home/columnUser.svelte";
  import Column from "../components/Home/columnMenu.svelte";
</script>

<div class="container">
  <Column1 />
  <Column />
</div>

<style type="text/scss">
  .container {
    display: grid;
    gap: 2vh 2.5vw;
    padding: 0 8vw 0 8vw;
    grid-template-rows: 2fr 10fr;
    grid-template-columns: 5fr 0.5fr 5fr 5fr 5fr;
    grid-template-areas:
      ". . . . ."
      "column1 . column2 column3 column4";
  }
</style>
