<script lang="typescript">
  import Column1 from "./index/column1.svelte";
  import Column2 from "./index/column2.svelte";
  import Column3 from "./index/column3.svelte";
  import Column4 from "./index/column4.svelte";
  import Cursor from "./index/cursor.svelte";
  import Header from "./index/header.svelte";
</script>

<body>
  <Cursor />
</body>
<div id="container">
  <Header />
  <Column1 />
  <Column2 />
  <Column3 />
  <Column4 />
</div>
