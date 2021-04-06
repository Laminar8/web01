<script lang="typescript">
  import { tagArray } from "../../stores";

  export let postChat: Function;
  export let tagValue = "";

  function sendTag() {
    if (!tagValue) return;
    if (tagValue.substr(0, 1) != "#") {
      tagValue = `#${tagValue}`;
    }

    $tagArray = $tagArray.concat({
      text: tagValue,
    });
    console.log(tagValue);

    postChat();
    tagValue = "";
  }

  function removeSpace(event) {
    event.preventDefault();
  }
</script>

<div class="tag-add-wrap">
  <div class="tag-add-name">
    <i class="fas fa-hashtag" />
    <input
      type="text"
      placeholder=" "
      class="tag-add-name-form"
      bind:value={tagValue}
      on:keydown={(e) => e.key === "Enter" && sendTag()}
      on:keydown={(e) => e.key === " " && removeSpace(e)}
    />
    <label for="name" class="form-label">태그</label>
    <i class="fas fa-plus" on:click={sendTag} />
  </div>
</div>
<div class="tag-wrap">
  <div class="tag-inner-wrap">
    {#each $tagArray as tag}
      <span>{tag.text}</span>
    {/each}
  </div>
</div>

<style lang="scss">
  $color1: rgb(231, 231, 231);
  $color1_02: rgba(231, 231, 231, 0.2);
  $color1_04: rgba(231, 231, 231, 0.4);
  $color1_06: rgba(231, 231, 231, 0.6);
  $color1_08: rgba(231, 231, 231, 0.8);
  $color2: #6470ec;
  $font_size1: 15px;

  //
  // TAG
  //
  .tag-add-wrap {
    grid-area: tagAdd;
    background-color: $color1_02;
    margin: 5px 5px 0;
    border-radius: 15px 15px 0 0;

    .tag-add-name {
      padding-top: 15px;
      height: 100%;

      position: relative;

      &-form {
        border-radius: 0;
      }

      &-form:not(:placeholder-shown),
      &-form:focus {
        ~ .form-label {
          color: transparent;
          transition: 0.2s;
        }
      }
    }

    .form-label {
      position: absolute;
      left: 0;
      margin: 9px 0 0 55px;
      font-size: $font_size1;
      color: $color1;
      transition: 0.2s;
      cursor: none;
    }

    input {
      font-size: $font_size1;
      margin: 10px 10px 10px 0;
      border: 0;
      width: 120px;
      color: $color1;
      background-color: transparent;
      padding: 0 10px;
      cursor: none;
      vertical-align: middle;
    }

    input:focus {
      outline: none;
    }
    input::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: $color1;
      opacity: 1; /* Firefox */
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 50000s;
      -webkit-text-fill-color: $color1 !important;
      -webkit-background-clip: text;
      background-clip: text;
    }
    /*Change text in autofill textbox*/
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-text-fill-color: $color1 !important;
    }

    i {
      color: $color1;
      font-size: $font_size1;
    }
    i:nth-child(1) {
      margin-left: 30px;
    }
  }

  .tag-wrap {
    grid-area: tagLis;
    background-color: $color1_02;
    margin: 0 5px;
    padding: 0 25px;

    .tag-inner-wrap {
      height: 100%;
      overflow-y: scroll;
    }

    .tag-inner-wrap::-webkit-scrollbar {
      display: none;
    }

    span {
      display: inline-block;
      margin: 3px;
      padding: 8px;
      background-color: $color2;
      color: $color1;
      font-size: 13px;
      border-radius: 5px;
    }
  }
</style>
