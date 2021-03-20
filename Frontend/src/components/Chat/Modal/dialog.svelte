<script>
  import { getContext } from "svelte";
  import {
    tagsArray,
    comments,
    userId,
    author,
    thisDay,
    backendServerUrl,
  } from "../../../stores";
  export let hasForm = false;
  export let onCancel = () => {};
  export let onOkay = () => {};

  const { close } = getContext("simple-modal");

  let value;
  let onChange = () => {};

  async function postChat() {
    const postBody = {
      userId: $userId,
      author: $author,
      comments: $comments,
      date: $thisDay,
      tags: $tagsArray,
    };
    console.log(postBody);
    const res = await fetch(`${$backendServerUrl}/chat`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    });
  }

  function _onCancel() {
    onCancel();
    close();
  }

  function _onOkay() {
    onOkay(value);
    postChat();
    value = "";
  }

  $: onChange(value);
</script>

<button class="close" on:click={_onCancel}> Close </button>

{#if hasForm}
  <div class="input-wrap">
    <i class="fas fa-tags" />
    <input
      type="text"
      placeholder="#태그입력"
      bind:value
      on:keydown={(e) => e.key === "Enter" && _onOkay()}
    />
  </div>
{/if}

<div class="buttons">
  <button on:click={_onOkay}> 추가 </button>
</div>

<style lang="scss">
  .buttons {
    height: 7vh;
    margin: 4vh 0 0 35%;
    button {
      -webkit-border-radius: 45px;
      -moz-border-radius: 45px;
      border-radius: 45px;
      border: 0.15vw solid rgb(161, 131, 185);
      height: 5vh;
      width: 8vw;
      padding-top: 1vh;
      background-color: rgb(161, 131, 185);
      cursor: none;
      color: white;
      font-size: 0.9vw;
      outline: none;
    }
  }

  .close {
    position: absolute;
    top: -2rem;
    right: 0;
    background: black;
  }

  .input-wrap {
    width: 80%;
    height: 7vh;
    margin: 2vh 0 0 10%;
    border-radius: 2px;
    border-bottom: solid 2px rgb(161, 131, 185);
    font-size: 1vw;

    i {
      color: rgb(161, 131, 185);
      margin: {
        top: 3vh;
        left: 0.4vw;
      }
    }
    input {
      border: 0;
      width: 85%;
      height: 5.1vh;
      background-color: transparent;
      cursor: none;

      margin: {
        top: 3vh;
        left: 0.8vw;
      }
    }
    input:focus {
      outline: none;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 50000s;
      -webkit-text-fill-color: #fff !important;
    }
    /*Change text in autofill textbox*/
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-text-fill-color: #1e1e22d7 !important;
    }
  }
</style>
