<script lang="typescript">
  import { link } from "svelte-spa-router";
  import { onMount } from "svelte";

  let posts = { user: false };
  // Feching
  const baseUrl = "http://localhost:4000/v1/users";
  onMount(async () => {
    const res = await fetch(baseUrl, { credentials: "include" });
    posts = await res.json();
    if (posts.user == false) {
      console.log(posts);
    } else {
      console.log(posts);
    }
  });
</script>

<column class="column1 item">
  <div class="box">
    {#if posts.user == false}
      <a href="/signin" use:link> login </a>
    {:else}
      <a href="http://localhost:4000/v1/signout"> logout </a>
    {/if}
  </div>
</column>

<style lang="scss">
  column {
    height: 70vh;
    width: 100%;
    font-family: "Jua";
    color: #1e1e22d7;
  }
  .box {
    /* Default Box */
    background-color: rgba(255, 196, 196, 0.6);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    -webkit-backdrop-filter: blur(2.5px);
    backdrop-filter: blur(2.5px);
    border-radius: 15px;
    height: 100%;

    /* Animation Settings */
    transition: all 1s ease;

    /* Grid Settings */
    display: grid;
    grid-template-rows: 5fr 0.5fr 1.3fr 2fr;
    grid-template-columns: 1fr 8fr 1fr;
    grid-template-areas:
      "image image image"
      ". . ."
      ". title ."
      ". text .";
  }
  .column1.item {
    grid-area: column1;
    .box {
      background-color: rgba(238, 138, 138, 0.85);
    }
  }
</style>
