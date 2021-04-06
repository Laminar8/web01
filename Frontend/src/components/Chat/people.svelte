<script lang="typescript">
  import { peopleArray } from "../../stores";

  export let postChat: Function;

  let people = {
    name: "",
    birth: "",
    image: "",
    group: "",
    notes: "",
    favorite: false,
  };
  let peopleKorean = {
    birth: "생일",
    group: "조직/팀/그룹",
    notes: "메모",
  };

  function sendPeople() {
    if (!people.name) return;
    $peopleArray = $peopleArray.concat({ people });
    console.log(people);
    console.log(people.name);

    postChat();

    // people 초기화
    for (let key in people) {
      if (key === "favorite") {
        people[key] = false;
      } else {
        people[key] = "";
      }
    }
  }
</script>

<div class="people-add-wrap">
  <div class="people-add-name">
    <i class="fas fa-user" />
    <input
      type="text"
      id="name"
      class="people-add-name-form"
      placeholder=" "
      bind:value={people.name}
      on:keydown={(e) => e.key === "Enter" && sendPeople()}
    />
    <label for="name" class="form-label">이름</label>
    <i class="fas fa-plus" on:click={sendPeople} />
  </div>
</div>
<div class="people-wrap">
  <div class="people-add-etc">
    {#each Object.keys(people) as key}
      {#if !["name", "image", "favorite"].includes(key)}
        <div class="people-add-etc-wrap">
          <input
            class="people-add-etc-form"
            type="text"
            id={key}
            placeholder=" "
            bind:value={people[key]}
          />
          <label for={key} class="form-label">{peopleKorean[key]}</label>
        </div>
      {/if}
    {/each}
  </div>
</div>

<!-- <div class="tag-wrap">
  <div class="tag-inner-wrap">
    {#each $tagArray as tag}
      <span>{tag.text}</span>
    {/each}
  </div>
</div> -->
<style lang="scss">
  $color1: rgb(231, 231, 231);
  $color1_02: rgba(231, 231, 231, 0.2);
  $color1_04: rgba(231, 231, 231, 0.4);
  $color1_06: rgba(231, 231, 231, 0.6);
  $color1_08: rgba(231, 231, 231, 0.8);
  $color2: #6470ec;
  $font_size1: 15px;

  //
  // PEOPLE
  //
  .people-add-wrap {
    grid-area: pplAdd;
    background-color: $color1_02;
    margin: 0 5px;

    .people-add-name {
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
      font-size: 15px;
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
      border-radius: 5px;
      padding: 0 10px;
      cursor: none;
      vertical-align: middle;

      border-radius: 0;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
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

  .people-wrap {
    grid-area: pplLis;
    background-color: $color1_02;
    margin: 0 5px 5px;
    border-radius: 0 0 15px 15px;

    .people-add-etc {
      height: 100%;
      margin-left: 50px;
      position: relative;

      &-form {
        border-radius: 0;
        border-left: $color1 7px solid;
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
      margin: 21px 0 0 16px;
      font-size: 15px;
      color: $color1;
      transition: 0.2s;
      cursor: none;
    }

    input {
      font-size: 15px;
      margin: 20px 10px 0 0;
      border: 0;
      width: 120px;
      color: $color1;
      background-color: transparent;
      border-radius: 5px;
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
  }
</style>
