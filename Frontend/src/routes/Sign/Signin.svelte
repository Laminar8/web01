<script lang="typescript">
  import Signin from "../../components/Sign/signin.svelte";
</script>

<div id="oneContainer">
  <Signin />
</div>

<style type="text/scss">
  #oneContainer {
    display: grid;
    /* gap: 2vh 3vw; */
    /* padding: 0 5vw 0 5vw; */
    grid-template-rows: 1fr 8fr 1fr;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas:
      ". . ."
      ". centerContainer ."
      ". . .";
  }

  centerContainer {
    grid-area: centerContainer;
    height: 80vh;
    /* background-color: brown; */
  }
</style>
