<script>
  import Content from "./content.svelte";
  import Modal from "./modal.svelte";
  import { modal } from "../../../stores";
</script>

<Modal show={$modal}>
  <Content />
</Modal>
