<script lang="typescript">
  import Chat from "../../components/Chat/chat.svelte";
</script>

<div class="container">
  <Chat />
</div>

<style type="text/scss">
  .container {
    display: grid;
    grid-template-rows: 0.5fr 10fr 0.5fr;
    grid-template-columns: 0.25fr 2fr 6fr 2fr 0.25fr;
    grid-template-areas:
      ". . . . ."
      ". left mid right ."
      ". . . . . ";
    height: 100%;
  }
</style>
