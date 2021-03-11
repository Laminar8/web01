<script>
  import Content from "./Content.svelte";
  import Modal from "./modal.svelte";
  import { modal } from "../../../stores";
</script>

<Modal show={$modal}>
  <Content />
</Modal>
