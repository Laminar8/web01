<script lang="typescript">
  import { link } from "svelte-spa-router";
  import { beforeUpdate, afterUpdate, onMount } from "svelte";

  //
  // Modal
  //
  import TagModalApp from "./Modal/app.svelte";
  import { tagsArray } from "../../stores";

  //
  // Moment Settings
  //
  import moment from "moment";
  import "moment/locale/ko";
  moment.locale("ko");

  // Common Variables
  const backendServerUrl = "http://localhost:4000/v1";
  const frontendServerUrl = "http://localhost:5000/#";
  const menu = [
    {
      class: "chatting-btn-wrap",
      i: "fas fa-comment-dots",
      a: "/chat",
      text: "채팅",
    },
    {
      class: "schedule-btn-wrap",
      i: "fas fa-calendar",
      a: "/chat",
      text: "달력",
    },
    {
      class: "schedule-btn-wrap",
      i: "fas fa-chart-area",
      a: "/chat",
      text: "기념일",
    },
    {
      class: "schedule-btn-wrap",
      i: "fas fa-palette",
      a: "/chat",
      text: "통계",
    },
    {
      class: "schedule-btn-wrap",
      i: "fas fa-cog",
      a: "/chat",
      text: "설정",
    },
  ];

  //
  // Left Box
  //

  let posts = { user: { _id: false } };
  let userId: string | boolean;
  let comments = [];

  // Feching
  onMount(async () => {
    const getUserId = await fetch(`${backendServerUrl}/users`, {
      credentials: "include",
    });
    posts = await getUserId.json();
    if (posts.user._id == false) {
      window.location.href = `${frontendServerUrl}/signin`;
    } else {
      userId = posts.user._id;
    }
    const getChat = await fetch(
      `${backendServerUrl}/chat/?userId=${userId}&author=user&date=${thisDay}`
    );
    try {
      comments = await getChat.json();
    } catch (e) {
      console.log("Comments is undefined!");
      comments = [];
    }
  });

  //
  // Right Box
  //
  const thisDay = window.location.href.split("/")[5];
  if (!moment(thisDay, "YYYYMMDD").isValid()) {
    window.location.href = `${frontendServerUrl}/chat/${moment().format(
      "YYYYMMDD"
    )}`;
  }
  const today = moment(thisDay).format("YYYY년 MM월");
  const todayFull = moment(thisDay).format("YYYY년 MM월 DD일");
  const dayArray = [];
  for (let i = -3; i < 2; i++) {
    dayArray.push([
      moment(thisDay).add(i, "days").format("YYYYMMDD"),
      moment(thisDay).add(i, "days").format("DD"),
      moment(thisDay).add(i, "days").format("ddd"),
    ]);
  }

  //
  // Mid Box
  //

  async function postChat() {
    const postBody = {
      userId: userId,
      author: "user",
      comments: comments,
      date: thisDay,
    };
    console.log(postBody);
    const res = await fetch(`${backendServerUrl}/chat`, {
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
      const text = event.target.value;
      if (!text) return;

      comments = comments.concat({
        text,
      });
      postChat();
      event.target.value = "";
    }
  }
</script>

<container>
  <div class="header-wrap">
    <div class="header-tag-wrap">
      {#each $tagsArray as tags}
        <span>{tags.tag}</span>
      {/each}
    </div>
    <div class="header-button-wrap">
      <!-- <i class="fas fa-plus" /> -->
      <TagModalApp />
      <i class="fas fa-search" />
      <i class="fas fa-bell" />
      <i class="fas fa-heart" />
      <i class="fas fa-bars" />
    </div>
  </div>
  <div class="menu-wrap">
    {#each menu as chatObject}
      <div class={chatObject.class}>
        <i class={chatObject.i} />
        <a href={chatObject.a} use:link>{chatObject.text}</a>
      </div>
    {/each}
    {#if posts.user._id != false}
      <div>
        <i class="fas fa-sign-out-alt" />
        <a href="{backendServerUrl}/signout"> 로그아웃 </a>
      </div>
    {/if}
  </div>
  <div class="user-wrap">
    <p>hi</p>
  </div>
  <div class="chat-wrap">
    <div class="today">{todayFull}</div>
    <div class="chat">
      <div class="scrollable" bind:this={div}>
        {#each comments as comment}
          <article>
            <span>{comment.text}</span>
          </article>
        {/each}
      </div>
    </div>
    <div class="input-box">
      <textarea on:keydown={handleKeydown} />
      <div class="icon-box">
        <i class="fas fa-images" />
        <i class="fas fa-video" />
      </div>
    </div>
  </div>
</container>

<style lang="scss">
  container {
    /* Default Font & Grid */
    font-family: "Jua";
    color: #1e1e22d7;
    grid-area: chat-center;
    height: 70vh;
    width: 60vw;
    margin: {
      top: 5vh;
      left: 5vw;
    }

    /* Default Box */
    background-color: rgba(238, 138, 138, 0.85);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    -webkit-backdrop-filter: blur(2.5px);
    backdrop-filter: blur(2.5px);
    border-radius: 15px;

    /* Grid Settings */
    display: grid;
    grid-template-rows: 1fr 14fr;
    grid-template-columns: 1fr 7fr 10fr;
    grid-template-areas:
      ". header header"
      "menu user chat";
  }

  //
  // Top-side Header
  //

  .header-wrap {
    grid-area: header;
    /* Default Box */
    background-color: rgba(255, 255, 255, 0.8);
    // border-bottom: 0.05vh solid rgba(255, 255, 255, 0.7);

    /* Grid Settings */
    display: grid;
    grid-template-columns: 6fr 1.5fr;
    grid-template-areas: "tag button";
    .header-tag-wrap {
      grid-area: tag;
      margin: 2.5vh 0 0 1vw;

      span {
        background-color: rgb(238, 138, 138);
        color: rgb(243, 238, 245);
        border-radius: 1em;
        word-break: break-all;
        font-size: 0.7vw;
        padding: 0.5vh 0.7vw;
      }
    }
    .header-button-wrap {
      grid-area: button;
      margin-top: 2.5vh;

      i {
        font-size: 1vw;
        color: rgb(161, 131, 185);
        margin-left: 0.85vw;
      }
    }
  }

  //
  // Left-side Menu
  //

  .menu-wrap {
    grid-area: menu;
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
      padding-top: 2.1vh;
    }
    a {
      color: rgba(229, 224, 231, 0.85);
      height: 5.2vh;
      width: 8vw;
      padding-top: 1.8vh;
      margin-left: 1.5vw;
      appearance: button;
      cursor: none;
      position: absolute;
      // display: none;
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
  // Center-side Users
  //

  .user-wrap {
    grid-area: user;
    background-color: rgba(255, 255, 255, 0.8);
    // border-right: 0.05vh solid rgba(255, 255, 255, 0.7);
    // background-color: violet;
  }

  //
  // Right-side Chat
  //

  .chat-wrap {
    grid-area: chat;

    /* Grid Settings */
    display: grid;
    grid-template-rows: 0.1fr 3fr 1fr;
    grid-template-areas:
      "today"
      "chat"
      "inputBox";

    /* Default Box */
    background-color: rgba(255, 255, 255, 0.8);
    .today {
      grid-area: today;
      margin-top: 2vh;
      text-align: center;
    }
    .chat {
      display: flex;
      flex-direction: column;
      margin: 0.5vh 1vw 0 1vw;
      grid-area: chat;
    }
    .scrollable {
      max-height: 42vh;
      flex: 1 1 auto;
      margin: 1vh 0.2vw 0;
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
          background-color: rgb(161, 131, 185);
          color: rgb(243, 238, 245);
          border-radius: 1em 1em 0 1em;
          word-break: break-all;
        }
      }
    }
    .scrollable::-webkit-scrollbar {
      padding-left: 2vw;
      width: 0.3vw;
    }
    .scrollable::-webkit-scrollbar-thumb {
      background-color: rgba(238, 138, 138, 0.85);
    }
    .scrollable::-webkit-scrollbar-track {
      background-color: rgb(161, 131, 185);
    }

    .input-box {
      grid-area: inputBox;
      background-color: rgba(255, 255, 255, 0.7);
      margin: 0 1vw;
      height: 12.5vh;
      .icon-box {
        width: 95%;
        margin: {
          top: 1.2vh;
          left: 1vw;
        }
        font-size: 0.8vw;
        color: rgb(138, 134, 139);
        i {
          margin-right: 0.5vw;
        }
      }
    }
    textarea {
      font-family: "Jua";
      border: 0;
      width: 95%;
      height: 5vh;
      background-color: transparent;
      color: rgb(78, 77, 78);
      cursor: none;
      resize: none;
      overflow: hidden;
      margin: {
        top: 2vh;
        left: 1vw;
      }
    }
  }
</style>
