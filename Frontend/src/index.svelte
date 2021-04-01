<script lang="typescript">
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import Cursor from "./components/cursor.svelte";
</script>

<body>
  <Cursor />
  <Router {routes} />
</body>

<style type="text/scss">
  body {
    /* 시스템 커서 안 보이게 숨기기 */
    cursor: none;
    background-image: linear-gradient(
      to right top,
      #f02a9b,
      #dd36b0,
      #c544c3,
      #a652d3,
      #7f5ddf,
      #6470ec,
      #4280f5,
      #008ffa,
      #00a8ff,
      #00bdf6,
      #00cfe5,
      #1fded1
    );

    /* Remove Scroll */
    -ms-overflow-style: none;
  }

  /* Remove Scroll */
  ::-webkit-scrollbar {
    display: none;
  }
</style>
