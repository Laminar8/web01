<script lang="typescript">
  import { beforeUpdate, afterUpdate, onMount } from "svelte";
  import {
    peopleNow,
    peopleArray,
    tagArray,
    historyArray,
    comments,
    userId,
    author,
    thisDay,
    backendServerUrl,
    frontendServerUrl,
  } from "../../stores";
  import Tag from "./tag.svelte";
  import People from "./people.svelte";
  import History from "./history.svelte";
  import Menu from "./menu.svelte";

  //
  // Moment Settings
  //

  import moment from "moment";
  import "moment/locale/ko";

  moment.locale("ko");

  //
  // Left Box
  //

  let posts = { user: { _id: false } };
  let chatFull = { comments: [], tags: [], people: [] };
  let peopleFull = { people: [] };
  let historyFull = { history: [] };

  // people.svelte
  export let personArrayIn = [];
  export let personArrayOut = [];
  let isLoading = true;

  // Show selected person on this day
  function updatePerson() {
    personArrayIn = [];
    personArrayOut = [];
    for (let i = 0; i < $peopleArray.length; i++) {
      if (
        JSON.stringify($peopleNow).includes(JSON.stringify($peopleArray[i]))
      ) {
        personArrayIn.push($peopleArray[i]);
      }
    }

    for (let i = 0; i < $peopleArray.length; i++) {
      if (
        !JSON.stringify($peopleNow).includes(JSON.stringify($peopleArray[i]))
      ) {
        personArrayOut.push($peopleArray[i]);
      }
    }

    isLoading = false;
  }

  // Feching
  onMount(async () => {
    const getUserId = await fetch(`${$backendServerUrl}/users`, {
      credentials: "include",
    });
    posts = await getUserId.json();

    if (posts.user._id == false) {
      window.location.href = `${$frontendServerUrl}/signin`;
    } else {
      userId.set(posts.user._id);
    }

    // router.route('/chat').get(getChat)
    const getChat = await fetch(
      `${$backendServerUrl}/chat/?userId=${$userId}&author=user&date=${$thisDay}`
    );
    chatFull = await getChat.json();
    comments.set(chatFull.comments);
    tagArray.set(chatFull.tags);
    peopleNow.set(chatFull.people);
    console.log(chatFull);

    // router.route('/chat/people').get(getPeople)
    const getPeople = await fetch(
      `${$backendServerUrl}/chat/people/?userId=${$userId}`
    );
    peopleFull = await getPeople.json();
    peopleArray.set(peopleFull.people);
    console.log(peopleFull);

    updatePerson();

    // router.route('/chat/history').get(getHistory)
    const getHistory = await fetch(
      `${$backendServerUrl}/chat/history/?userId=${$userId}`
    );
    historyFull = await getHistory.json();
    historyArray.set(historyFull.history);
    console.log(historyFull);
  });

  //
  // Date Calculator
  //

  $thisDay = window.location.href.split("/")[5];
  if (!moment($thisDay, "YYYYMMDD").isValid()) {
    window.location.href = `${$frontendServerUrl}/chat/${moment().format(
      "YYYYMMDD"
    )}`;
  }
  // const today = moment($thisDay).format("YYYY년 MM월");
  const todayFull = moment($thisDay).format("YYYY년 MM월 DD일 dddd");
  const dayArray = [];
  for (let i = -3; i < 2; i++) {
    dayArray.push([
      moment($thisDay).add(i, "days").format("YYYYMMDD"),
      moment($thisDay).add(i, "days").format("MM월 DD일 dddd"),
      moment($thisDay).add(i, "days").format("ddd"),
    ]);
  }

  //
  // Mid Box
  //

  export async function postChat() {
    const postBody = {
      userId: $userId,
      author: $author,
      comments: $comments,
      date: $thisDay,
      tags: $tagArray,
      people: $peopleNow,
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

  let div: HTMLDivElement;
  let autoscroll: Boolean;
  let text = "";

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 50;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  function sendChat() {
    if (!text) return;
    $comments = $comments.concat({
      text,
    });

    postChat();
    text = "";
  }
</script>

<Menu />
<Tag {postChat} />
<People
  {postChat}
  {updatePerson}
  {personArrayIn}
  {personArrayOut}
  {isLoading}
/>
<History />

<div class="chat-wrap">
  <div class="today">{todayFull}</div>
  <div class="chat">
    <div class="scrollable" bind:this={div}>
      {#each $comments as comment}
        <article>
          <span>{comment.text}</span>
        </article>
      {/each}
    </div>
  </div>
  <div class="input-box">
    <input
      type="text"
      id="chat"
      placeholder=" "
      class="input-box-form"
      autocomplete="off"
      bind:value={text}
      on:keydown={(e) => e.key === "Enter" && sendChat()}
    />
    <label for="chat" class="form-label">메세지를 입력하세요.</label>
    <div class="icon-box">
      <i class="fas fa-paperclip" />
      <i class="fas fa-paper-plane" on:click={sendChat} />
    </div>
  </div>
</div>

<style lang="scss">
  $color1: rgb(231, 231, 231);
  $color1_02: rgba(231, 231, 231, 0.2);
  $color1_04: rgba(231, 231, 231, 0.4);
  $color1_06: rgba(231, 231, 231, 0.6);
  $color1_08: rgba(231, 231, 231, 0.8);
  $color2: #6470ec;
  $color3: #7f5ddf;
  $color4: #f02a9b;
  $color5: #dd36b0;
  $color6: #1fded1;
  $color7: #a652d3;
  $font_size1: 15px;

  //
  // Right-side Chat
  //

  .chat-wrap {
    grid-area: chat;
    margin: 5px;

    /* Grid Settings */
    display: grid;
    grid-template-rows: 1fr 20fr 3fr;
    grid-template-areas:
      "today"
      "chat"
      "inputBox";

    /* Default Box */
    background-color: $color1_04;
    border-radius: 15px;

    .today {
      grid-area: today;
      margin-top: 15px;
      text-align: center;
      color: $color1;
      font-size: 15px;
    }
    .chat {
      display: flex;
      flex-direction: column;
      margin: 10px 10px 0 10px;
      max-height: 95%;
      grid-area: chat;
    }
    .scrollable {
      flex: 1 1 auto;
      overflow-y: scroll;
      article {
        margin: 0.5em 1em;
        span {
          padding: 0.5em 1em;
          display: inline-block;
        }
      }
      article {
        text-align: right;
        span {
          background-color: $color1_08;
          color: $color2;
          font-size: $font_size1;
          border-radius: 1em 1em 0 1em;
          word-break: break-all;
        }
      }
    }
    .scrollable::-webkit-scrollbar {
      display: none;
    }

    .input-box {
      grid-area: inputBox;
      margin: 0 25px;
      padding-top: 20px;
      height: 100%;
      border-top: solid 2px $color1;
      display: inline-flex;
      .icon-box {
        display: inline-flex;
        font-size: 15px;
        color: $color1;
        i {
          margin-right: 10px;
        }
      }

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
      margin: -4px 0 0 5px;
      font-size: 15px;
      color: $color1;
      transition: 0.2s;
      cursor: none;
    }

    input {
      border: 0;
      height: 15px;
      width: 85%;
      background-color: transparent;
      color: $color1;
      font-size: $font_size1;
      cursor: none;
      margin: {
        left: 5px;
        right: 10px;
      }
    }
  }
</style>
