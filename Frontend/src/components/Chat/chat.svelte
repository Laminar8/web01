<script lang="typescript">
  import { beforeUpdate, afterUpdate, onMount } from "svelte";

  //
  // Modal
  //
  import PeopleModalApp from "./PeopleModal/app.svelte";
  import {
    tagsArray,
    comments,
    userId,
    author,
    thisDay,
    backendServerUrl,
    frontendServerUrl,
  } from "../../stores";

  //
  // Moment Settings
  //
  import moment from "moment";
  import "moment/locale/ko";
  import App from "./PeopleAddModal/app.svelte";
  import Chat from "../../routes/Chat/Chat.svelte";
  import ColumnMenu from "../Home/columnMenu.svelte";
  moment.locale("ko");

  // Common Variables
  const menu = [
    {
      class: "chatting-btn-wrap",
      i: "fas fa-comment-dots",
      a: `${$backendServerUrl}/chat/change/?thisDay=${moment().format(
        "YYYYMMDD"
      )}`,
      text: "채팅",
    },
    {
      class: "schedule-btn-wrap",
      i: "fas fa-calendar",
      a: "/#/chat",
      text: "달력",
    },
    {
      class: "schedule-btn-wrap",
      i: "fas fa-chart-area",
      a: "/#/chat",
      text: "기념일",
    },
    {
      class: "schedule-btn-wrap",
      i: "fas fa-palette",
      a: "/#/chat",
      text: "통계",
    },
    {
      class: "schedule-btn-wrap",
      i: "fas fa-cog",
      a: "/#/chat",
      text: "설정",
    },
  ];

  //
  // Left Box
  //

  let posts = { user: { _id: false } };
  let chatFull = { comments: [], tags: [] };
  // let tagsList = [];
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
    const getChat = await fetch(
      `${$backendServerUrl}/chat/?userId=${$userId}&author=user&date=${$thisDay}`
    );
    try {
      chatFull = await getChat.json();
      console.log(chatFull);
      comments.set(chatFull.comments);
      tagsArray.set(chatFull.tags);
    } catch (e) {
      console.log("Comments is undefined!");
      comments.set([]);
    }
  });

  function MouseLeaveMenu(event) {
    event.target.lastChild.style.display = "none";
  }

  function MouseOnMenu(event) {
    event.target.lastChild.style.display = "inline";
  }

  function MouseClickMenu(event) {
    if (event.path[0].tagName == "I") {
      window.location.href = event.path[1].lastChild.href;
    } else {
      window.location.href = event.path[0].lastChild.href;
    }
  }
  //
  // Date Calculator
  //
  $thisDay = window.location.href.split("/")[5];
  if (!moment($thisDay, "YYYYMMDD").isValid()) {
    window.location.href = `${$frontendServerUrl}/chat/${moment().format(
      "YYYYMMDD"
    )}`;
  }
  const today = moment($thisDay).format("YYYY년 MM월");
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

  let div;
  let autoscroll;
  let text = "";
  let tagValue = "";

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 50;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  function handleKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!text) return;
      $comments = $comments.concat({
        text,
      });
      postChat();
      text = "";
    }
  }
  function sendChat() {
    if (!text) return;
    $comments = $comments.concat({
      text,
    });
    postChat();
    text = "";
  }
  function sendTag() {
    if (!tagValue) return;
    if (tagValue.substr(0, 1) != "#") {
      tagValue = `#${tagValue}`;
    }
    $tagsArray = $tagsArray.concat({
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

<div class="menu-wrap">
  {#each menu as chatObject}
    <div
      class={chatObject.class}
      on:mouseenter={MouseOnMenu}
      on:mouseleave={MouseLeaveMenu}
      on:mousedown={MouseClickMenu}
    >
      <i class={chatObject.i} />
      <a href={chatObject.a}>{chatObject.text}</a>
    </div>
  {/each}
  {#if posts.user._id != false}
    <div
      on:mouseenter={MouseOnMenu}
      on:mouseleave={MouseLeaveMenu}
      on:mousedown={MouseClickMenu}
    >
      <i class="fas fa-sign-out-alt" />
      <a href="{$backendServerUrl}/signout"> 로그아웃 </a>
    </div>
  {/if}
</div>
<div class="tag-add-wrap">
  <div class="tag-add-name">
    <i class="fas fa-hashtag" />
    <input
      type="text"
      placeholder="태그입력"
      bind:value={tagValue}
      on:keydown={(e) => e.key === "Enter" && sendTag()}
      on:keydown={(e) => e.key === " " && removeSpace(e)}
    />
    <i class="fas fa-plus" />
  </div>
</div>
<div class="tag-wrap">
  <div class="tag-inner-wrap">
    {#each [...$tagsArray].reverse() as tag}
      <span>{tag.text}</span>
    {/each}
  </div>
</div>
<div class="people-add-wrap">
  <div class="people-add-name">
    <i class="fas fa-user" />
    <input
      type="text"
      placeholder="친구추가"
      bind:value={tagValue}
      on:keydown={(e) => e.key === "Enter" && sendTag()}
      on:keydown={(e) => e.key === " " && removeSpace(e)}
    />
    <i class="fas fa-plus" />
  </div>
</div>
<div class="people-wrap">
  <!-- <p>haha</p> -->
</div>
<!-- <div class="header-wrap">
  <div class="header-tag-wrap">
    {#each $tagsArray as tags}
      <span>{tags.tag}</span>
    {/each}
  </div>
  <div class="header-button-wrap">
    <TagModalApp />
    <PeopleModalApp />
    <i class="fas fa-bell" />
    <i class="fas fa-heart" />
    <i class="fas fa-bars" />
  </div>
</div> -->

<div class="user-wrap">
  <p>hi</p>
</div>

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
      placeholder="메세지를 입력하세요."
      autocomplete="off"
      bind:value={text}
      on:keydown={handleKeydown}
    />
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
  // TAG
  //
  .tag-add-wrap {
    grid-area: tagAdd;
    background-color: $color1_02;
    margin: 5px 5px 0;
    border-radius: 15px 15px 0 0;

    .tag-add-name {
      height: 100%;
    }

    input {
      font-size: 15px;
      margin: 10px 10px 10px 0;
      border: 0;
      width: 120px;
      height: 45px;
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
      font-size: 15px;
    }
    i:nth-child(1) {
      margin-left: 30px;
    }
  }

  .tag-wrap {
    grid-area: tagLis;
    background-color: $color1_02;
    margin: 0 5px;
    padding: 0 15px;

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

  //
  // PEOPLE
  //
  .people-add-wrap {
    grid-area: pplAdd;
    background-color: $color1_02;
    margin: 0 5px;

    .people-add-name {
      height: 100%;
    }

    input {
      font-size: 15px;
      margin: 10px 10px 10px 0;
      border: 0;
      width: 120px;
      height: 45px;
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

    i {
      color: $color1;
      font-size: 15px;
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

    display: grid;
    grid-template-rows: 1fr 4fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "tag-header1 tag-name tag-header2"
      "tag-body tag-body tag-body";
  }

  //
  // Left-side Menu
  //

  .menu-wrap {
    grid-area: quick;

    background-color: $color1_04;
    border-radius: 15px;

    padding: {
      top: 4vh;
    }
    div {
      margin-top: 2vh;
      padding-left: 1.1vw;
      height: 7vh;
      color: rgba(229, 224, 231, 0.85);
      font-size: 1.2vw;
    }
    i {
      height: 5.2vh;
      width: 27px;
      padding-top: 2.1vh;
    }
    a {
      color: rgba(229, 224, 231, 0.85);
      background-color: rgb(238, 138, 138);
      height: 5.2vh;
      width: 8vw;
      padding: 1.8vh 0 0 1.5vw;
      margin-left: 0.81vw;
      appearance: button;
      cursor: none;
      position: absolute;
      display: none;
    }
    a:visited {
      color: rgba(229, 224, 231, 0.85);
      text-decoration: none;
    }
    a:hover {
      color: rgba(229, 224, 231, 0.85);
      text-decoration: none;
    }
  }

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
    input::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: $color1;
      opacity: 1; /* Firefox */
    }
  }

  // //
  // // Top-side Header
  // //

  // .header-wrap {
  //   grid-area: header;
  //   /* Default Box */
  //   background-color: rgba(255, 255, 255, 0.8);
  //   border-top-right-radius: 15px;

  //   /* Grid Settings */
  //   display: grid;
  //   grid-template-columns: 6fr 1.5fr;
  //   grid-template-areas: "tag button";
  //   .header-tag-wrap {
  //     grid-area: tag;
  //     margin: 2.5vh 0 0 1vw;

  //     span {
  //       background-color: rgb(238, 138, 138);
  //       color: rgb(243, 238, 245);
  //       border-radius: 1em;
  //       word-break: break-all;
  //       font-size: 0.7vw;
  //       padding: 0.5vh 0.7vw;
  //       margin-right: 0.5vw;
  //     }
  //   }
  //   .header-button-wrap {
  //     grid-area: button;
  //     margin-top: 2.5vh;

  //     i {
  //       font-size: 1vw;
  //       color: rgb(161, 131, 185);
  //       margin-left: 0.85vw;
  //     }
  //   }
  // }

  //
  // Center-side Users
  //

  .user-wrap {
    grid-area: user;
    background-color: rgba(255, 255, 255, 0.8);
    // border-right: 0.05vh solid rgba(255, 255, 255, 0.7);
    // background-color: violet;
  }
</style>
