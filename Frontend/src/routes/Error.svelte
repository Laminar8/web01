<script lang="typescript">
  let messages;
</script>

<div class="container">
  <div class="error-container" />
</div>

<style type="text/scss">
  .container {
    display: grid;
    grid-template-rows: 1fr 8fr 1fr;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-areas:
      ". . ."
      ". error-center ."
      ". . .";
  }
  .error-container {
    grid-area: error-center;

    /* Default Font & Grid */
    font-family: "Jua";
    color: #1e1e22d7;
    height: 70vh;
    width: 60vw;
    margin: {
      top: 5vh;
      left: 5vw;
    }
    /* Default Box */
    background-color: rgba(238, 138, 138, 0.85);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    -webkit-backdrop-filter: blur(2.5px);
    backdrop-filter: blur(2.5px);
    border-radius: 15px;
  }
</style>
