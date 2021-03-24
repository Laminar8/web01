<script>
  import { getContext } from "svelte";
  import PeopleAddApp from "../PeopleAddModal/app.svelte";
  export let hasForm = false;
  export let onCancel = () => {};
  export let onOkay = () => {};

  const { close } = getContext("simple-modal");

  let value;
  let onChange = () => {};

  function _onCancel() {
    onCancel();
    close();
  }

  function _onOkay() {
    onOkay(value);
    value = "";
  }

  $: onChange(value);
</script>

<div class="button-wrap">
  <PeopleAddApp />
  <button class="close" on:click={_onCancel}
    ><i class="fas fa-times" />
  </button>
</div>
{#if hasForm}
  <div class="people-wrap">
    <div class="favorite people-list-wrap">
      <p>haha</p>
    </div>
    <div class="special people-list-wrap">
      <p>haha</p>
    </div>
  </div>
  <!-- <div class="input-wrap">
    <i class="fas fa-tags" />
    <input
      type="text"
      placeholder="#태그입력"
      bind:value
      on:keydown={(e) => e.key === "Enter" && _onOkay()}
    />
  </div> -->
{/if}

<!-- <div class="buttons">
  <button on:click={_onOkay}> 추가 </button>
</div> -->
<style lang="scss">
  .button-wrap {
    position: absolute;
    right: 0;
    margin-right: 1vw;
    .close {
      margin-left: 1vw;
      background: transparent;
      cursor: none;
      color: rgb(161, 131, 185);
      border: none;
      font-size: 1vw;
    }

    .close:before,
    .close:after {
      cursor: none;
      color: rgb(161, 131, 185);
    }
  }

  .people-wrap {
    margin: 8vh 5% 0 5%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "favorite special";
  }

  .people-list-wrap {
    // background-color: yellow;
  }

  .favorite {
    grid-area: favorite;
    background-color: red;
  }

  .special {
    grid-area: special;
    background-color: yellow;
  }
</style>
