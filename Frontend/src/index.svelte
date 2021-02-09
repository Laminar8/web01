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
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;

    /* 시스템 커서 안 보이게 숨기기 */
    cursor: none;

    background: url("../../images/background.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    /* Remove Scroll */
    -ms-overflow-style: none;
  }

  /* Remove Scroll */
  ::-webkit-scrollbar {
    display: none;
  }
</style>
