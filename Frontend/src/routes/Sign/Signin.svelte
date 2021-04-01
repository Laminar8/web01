<script lang="typescript">
  import Signin from "../../components/Sign/signin.svelte";
</script>

<div class="container">
  <Signin />
</div>

<style type="text/scss">
  .container {
    height: 100%;
    display: grid;
    grid-template-rows: repeat(15, 1fr);
    grid-template-columns: repeat(15, 1fr);
    grid-template-areas: ". . . . . . . . . . . . . . ." //1
      ". . . . . . . . . . . . . . ." //2
      ". . . . . . . . . . . . . . ." //3
      ". . . . . . . . . signup signup signup . . ." //4
      ". . . . . . . . . signin signin signin . . ." //5
      ". . . . . . . . . signin signin signin . . ." //6
      ". . . . . . . . . signin signin signin . . ." //7
      ". . . . . . . . . signin signin signin . . ." //8
      ". . . . . . . . . signin signin signin . . ." //9
      ". . . . . . . . . signin signin signin . . ." //10
      ". . . . . . . . . signin signin signin . . ." //11
      ". . . . . . . . . signin signin signin . . ." //12
      ". . . . . . . . . . . . . . ." //13
      ". . . . . . . . . . . . . . ." //14
      ". . . . . . . . . . . . . . ."; //15
  }
</style>
