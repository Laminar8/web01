<script lang="typescript">
  import Column1 from "../components/Home/column1.svelte";
  import Column from "../components/Home/column.svelte";
</script>

<div class="container">
  <Column1 />
  <Column />
</div>

<style type="text/scss">
  .container {
    display: grid;
    gap: 2vh 3vw;
    padding: 0 5vw 0 5vw;
    grid-template-rows: 2fr 10fr;
    grid-template-columns: 5fr 1.5fr 5fr 5fr 5fr;
    grid-template-areas:
      ". . . . ."
      "column1 . column2 column3 column4";
  }
</style>
