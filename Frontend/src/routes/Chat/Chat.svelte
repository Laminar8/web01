<script lang="typescript">
  import Chat from "../../components/Chat/chat.svelte";
</script>

<div class="container">
  <Chat />
</div>

<style type="text/scss">
  .container {
    display: grid;
    grid-template-rows: 1fr 8fr 1fr;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-areas:
      ". . ."
      ". chat-center ."
      ". . .";
  }
</style>
