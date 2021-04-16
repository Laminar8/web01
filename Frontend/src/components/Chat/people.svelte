<script lang="typescript">
  import {
    peopleNow,
    peopleArray,
    userId,
    backendServerUrl,
  } from "../../stores";
  import Amy from "../../../public/images/profile/amy.jpg";
  import { afterUpdate } from "svelte";

  export let postChat: Function;
  export let people = {
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

  async function postPeople() {
    const postBody = {
      userId: $userId,
      people: $peopleArray,
    };
    console.log(postBody);
    const res = await fetch(`${$backendServerUrl}/chat/people`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    });
  }

  let addClass = "people-add-etc no-display";
  let listClass = "people-list-wrap";

  function sendPeople() {
    if (!people.name) return;
    $peopleArray = $peopleArray.concat({
      name: people.name,
      birth: people.birth,
      image: people.image,
      group: people.group,
      notes: people.notes,
      favorite: people.favorite,
    });

    postPeople();

    // people 초기화
    for (let key in people) {
      if (key === "favorite") {
        people[key] = false;
      } else {
        people[key] = "";
      }
    }

    addClass = addClass + " no-display";
    listClass = listClass.split(" ")[0];
  }

  function changePeople(event: KeyboardEvent) {
    if (people.name) {
      addClass = addClass.split(" ")[0];
      listClass = listClass + " no-display";
    } else {
      addClass = addClass + " no-display";
      listClass = listClass.split(" ")[0];
    }
  }

  let personArrayIn = [];
  let personArrayOut = [];
  let isLoading = true;

  function updatePerson() {
    personArrayIn = $peopleArray.filter((person) =>
      $peopleNow.includes(person)
    );
    personArrayOut = $peopleArray.filter(
      (person) => !$peopleNow.includes(person)
    );

    isLoading = false;
    console.log($peopleNow);
    console.log(personArrayIn);
  }

  afterUpdate(() => updatePerson());

  function chatPeople(event) {
    const peopleName = event.path[0].textContent;
    for (let index in $peopleArray) {
      if ($peopleArray[index].name == peopleName) {
        const peopleNowIndex = $peopleNow.findIndex(
          (people) => people.name == peopleName
        );
        console.log(peopleNowIndex);

        if (peopleNowIndex == -1) {
          $peopleNow = $peopleNow.concat($peopleArray[index]);
        } else {
          $peopleNow.splice(peopleNowIndex, 1);
        }
        postChat();
        console.log($peopleNow);

        updatePerson();
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
      on:keyup={(e) => changePeople(e)}
    />
    <label for="name" class="form-label">이름</label>
    <i class="fas fa-plus" on:click={sendPeople} />
  </div>
</div>
<div class="people-wrap">
  <div class={addClass}>
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
  <div class={listClass}>
    {#if isLoading}
      <p>haha</p>
    {:else}
      {#each personArrayIn as person}
        <div class="people-list color" on:click={(e) => chatPeople(e)}>
          <div class="people-list-image">
            {#if person.image}
              <img src={person.image} alt="profile" />
            {:else}
              <img src={Amy} alt="profile" />
            {/if}
          </div>
          <div class="people-list-name">
            <span>{person.name}</span>
          </div>
          <div class="people-list-note">
            <span>{person.notes}</span>
          </div>
        </div>
      {/each}
      {#each personArrayOut as person}
        <div class="people-list" on:click={(e) => chatPeople(e)}>
          <div class="people-list-image">
            {#if person.image}
              <img src={person.image} alt="profile" />
            {:else}
              <img src={Amy} alt="profile" />
            {/if}
          </div>
          <div class="people-list-name">
            <span>{person.name}</span>
          </div>
          <div class="people-list-note">
            <span>{person.notes}</span>
          </div>
        </div>
      {/each}
    {/if}
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
      margin-left: 38px;
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

  .no-display {
    display: none;
  }

  .people-list-wrap {
    margin: 0 5px 5px;
    height: 90%;
    overflow-y: scroll;
    color: $color1;

    .people-list {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: repeat(2, 1fr);
      grid-template-areas:
        "image name name"
        "image notes notes";
      column-gap: 10px;
      margin: 5px 25px;
      padding: 5px 10px 0;
      height: 55px;
    }
    .color {
      background-color: yellow;
    }

    .people-list-image {
      grid-area: image;
    }

    img {
      margin: 8px 5px 5px 0px;
      width: 90%;
      border-radius: 5px;
    }

    .people-list-name {
      grid-area: name;
      margin: 5px 0 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // background-color: yellow;
    }

    .people-list-note {
      grid-area: notes;
      color: $color1_08;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .people-list-wrap::-webkit-scrollbar {
    display: none;
  }
</style>
