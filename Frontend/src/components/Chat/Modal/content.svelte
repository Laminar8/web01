<script lang="typescript">
  import { getContext } from "svelte";
  import Dialog from "./dialog.svelte";
  import { tagsArray } from "../../../stores";

  const { open } = getContext("simple-modal");

  const onOkay = (text) => {
    console.log(text);
    if (text.slice(0, 1) !== "#") {
      text = "#" + text;
    }
    $tagsArray = [...$tagsArray, { tag: text }];
  };

  const showDialog = () => {
    open(
      Dialog,
      {
        message: false,
        hasForm: true,
        onOkay,
      },
      {
        closeButton: true,
        closeOnEsc: true,
        closeOnOuterClick: true,
      }
    );
  };
</script>

<i class="fas fa-plus" on:click={showDialog} />

<style lang="scss">
  i {
    font-size: 1vw;
    color: rgb(161, 131, 185);
    margin-left: 0.85vw;
  }
</style>
