<script lang="typescript">
  import Chat from "../../components/Chat/chat.svelte";

  // svelte was created with unknown prop 'params'
  export const params = {};
</script>

<div class="container">
  <Chat />
</div>

<style type="text/scss">
  .container {
    height: 100%;
    display: grid;
    grid-template-rows: repeat(15, 1fr);
    grid-template-columns: repeat(15, 1fr);
    grid-template-areas: ". . . . . . . . . . . . . . ." //1
      ". . . . . . . . . . . . . . ." //2
      ". . quick . history history history chat chat chat chat tagAdd tagAdd . ." //3
      ". . quick . history history history chat chat chat chat tagLis tagLis . ." //4
      ". . quick . history history history chat chat chat chat tagLis tagLis . ." //5
      ". . quick . history history history chat chat chat chat tagLis tagLis  . ." //6
      ". . quick . history history history chat chat chat chat tagLis tagLis . ." //7
      ". . quick . history history history chat chat chat chat pplAdd pplAdd . ." //8
      ". . quick . history history history chat chat chat chat pplLis pplLis . ." //9
      ". . quick . history history history chat chat chat chat pplLis pplLis . ." //10
      ". . quick . history history history chat chat chat chat pplLis pplLis . ." //11
      ". . quick . history history history chat chat chat chat pplLis pplLis . ." //12
      ". . quick . history history history chat chat chat chat pplLis pplLis . ." //13
      ". . . . . . . . . . . . . . ." //14
      ". . . . . . . . . . . . . . ."; //15
  }
</style>
