<script lang="typescript">
  import { link } from "svelte-spa-router";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { onMount } from "svelte";
  import moment from "moment";

  //
  // Left Box
  //

  let posts = { user: { _id: false } };
  let userId: string | boolean;
  // Feching
  onMount(async () => {
    const res = await fetch("http://localhost:4000/v1/users", {
      credentials: "include",
    });
    posts = await res.json();
    if (posts.user._id == false) {
      window.location.href = "http://localhost:5000/#/signin";
    } else {
      userId = posts.user._id;
    }
  });
  //
  // Mid Box
  //

  let comments = [];
  async function postChat() {
    const postBody = { userId: userId, author: "user", comments: comments };
    console.log(postBody);
    const res = await fetch("http://localhost:4000/v1/chat", {
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

  //
  // Right Box
  //
  const thisDay = window.location.href.split("/")[5];
  console.log(thisDay);
  if (!moment(thisDay, "YYYYMMDD").isValid()) {
    window.location.href = `http://localhost:5000/#/chat/${moment().format(
      "YYYYMMDD"
    )}`;
  }
  const dayArray = [
    [
      moment(thisDay).subtract(2, "days").format("DD일"),
      moment(thisDay).subtract(2, "days").format("YYYYMMDD"),
    ],
    [
      moment(thisDay).subtract(1, "days").format("DD일"),
      moment(thisDay).subtract(1, "days").format("YYYYMMDD"),
    ],
    [moment(thisDay).format("MM월 DD일"), moment(thisDay).format("YYYYMMDD")],
    [
      moment(thisDay).add(1, "days").format("DD일"),
      moment(thisDay).add(1, "days").format("YYYYMMDD"),
    ],
    [
      moment(thisDay).add(2, "days").format("DD일"),
      moment(thisDay).add(2, "days").format("YYYYMMDD"),
    ],
  ];
  console.log(dayArray);
</script>

<left>
  <div class="top-menu-wrap">
    <div class="chatting-btn-wrap">
      <i class="fas fa-key" />
      <a href="/chat" use:link>채팅</a>
    </div>
    <div class="schedule-btn-wrap">
      <i class="fas fa-key" />
      <a href="/chat" use:link>달력</a>
    </div>
    <div class="schedule-btn-wrap">
      <i class="fas fa-key" />
      <a href="/chat" use:link>기념일</a>
    </div>
    <div class="schedule-btn-wrap">
      <i class="fas fa-key" />
      <a href="/chat" use:link>통계</a>
    </div>
    <div class="schedule-btn-wrap">
      <i class="fas fa-key" />
      <a href="/chat" use:link>설정</a>
    </div>
  </div>
  <div class="bottom-menu-wrap">
    <div class="schedule-btn-wrap">
      <i class="fas fa-key" />
      {#if posts.user._id == false}
        <a href="/signin" use:link> 로그인 </a>
      {:else}
        <a href="http://localhost:4000/v1/signout"> 로그아웃 </a>
      {/if}
    </div>
  </div>
</left>
<mid>
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
</mid>
<right>
  <div class="quick-access-wrap">
    <div class="day-box">
      <p class="day-box-head">일정 변경</p>
      <div class="day-array">
        {#each dayArray as day}
          <a href="/chat/{day[1]}" use:link>{day[0]}</a>
        {/each}
      </div>
    </div>
  </div>
</right>

<style lang="scss">
  left {
    /* Default Font & Grid */
    font-family: "Jua";
    color: rgba(229, 224, 231, 0.856);
    grid-area: left;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    /* Default Box */
    background-color: rgba(238, 138, 138, 0.95);

    /* Grid Settings */
    display: grid;
    grid-template-rows: 6fr 1fr;
    grid-template-areas:
      "menu"
      "sign";

    .top-menu-wrap {
      grid-area: menu;
      padding: {
        top: 10vh;
      }
      div {
        margin-top: 2vh;
        padding-left: 2.7vw;
        height: 7vh;
      }
      i {
        padding-top: 2.5vh;
        color: rgba(229, 224, 231, 0.856);
        font-size: 1.2vw;
      }
      a {
        color: rgba(229, 224, 231, 0.856);
        font-size: 1.4vw;
        margin-left: 0.7vw;
        appearance: button;
        cursor: none;
      }
      a:visited {
        color: rgba(229, 224, 231, 0.856);
        text-decoration: none;
      }
      a:hover {
        color: rgba(229, 224, 231, 0.856);
        text-decoration: none;
      }
    }
    .bottom-menu-wrap {
      grid-area: sign;
      div {
        margin-top: 2vh;
        padding-left: 2.7vw;
        height: 7vh;
        background-color: rgba(229, 224, 231, 0.95);
      }
      i {
        padding-top: 2.5vh;
        color: rgba(238, 138, 138, 0.85);
        font-size: 1.2vw;
      }
      a {
        color: rgba(238, 138, 138, 0.85);
        font-size: 1.4vw;
        margin-left: 0.7vw;
        appearance: button;
        cursor: none;
      }
      a:visited {
        color: rgba(238, 138, 138, 0.85);
        text-decoration: none;
      }
      a:hover {
        color: rgba(238, 138, 138, 0.85);
        text-decoration: none;
      }
    }
  }

  mid {
    /* Default Font & Grid */
    font-family: "Jua";
    color: #1e1e22d7;
    grid-area: mid;

    /* Grid Settings */
    display: grid;
    grid-template-rows: 6fr 1.5fr;
    grid-template-areas:
      "chat"
      "inputBox";

    /* Default Box */
    background-color: rgba(229, 224, 231, 0.75);

    .chat {
      display: flex;
      flex-direction: column;
      margin: 0.5vh 1vw 0 1vw;
      grid-area: chat;
    }

    .scrollable {
      max-height: 70vh;
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
          background-color: #0074d9c9;
          color: white;
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
      background-color: #93a5ccd3;
    }
    .scrollable::-webkit-scrollbar-track {
      background-color: rgba(238, 138, 138, 0.75);
    }

    .input-box {
      grid-area: inputBox;
      background-color: rgb(229, 224, 231);
      margin: 0 1vw;
      height: 14.5vh;
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
      height: 7vh;
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

  right {
    /* Default Font & Grid */
    font-family: "Jua";
    color: #1e1e22d7;
    grid-area: right;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    /* Default Box */
    background-color: rgba(207, 192, 219, 0.95);

    .quick-access-wrap {
      margin: 1vh 1vw;
      height: auto;
      /* Grid Settings */
      display: grid;
      grid-template-rows: 2fr 2fr 2fr;
      grid-template-areas:
        "date"
        "menu1"
        "menu2";

      .day-box {
        grid-area: date;

        .day-box-head {
          margin: 4vh 1vw 0.8vh;
          color: rgb(78, 77, 78);
          font-weight: 600;
          font-size: 0.8vw;
        }
      }
      .day-array {
        background-color: rgba(238, 138, 138, 0.75);
        height: 4vh;
        border-radius: 15px;
        margin: 0 1vw;
        padding-left: 0.7vw;
        justify-content: center;
        a {
          color: rgba(229, 224, 231, 0.856);
          font-size: 0.75vw;
          margin-left: 0.7vw;
          margin-top: 0.9vh;
          appearance: button;
          cursor: none;
        }
        a:visited {
          color: rgba(229, 224, 231, 0.856);
          text-decoration: none;
        }
        a:hover {
          color: rgba(229, 224, 231, 0.856);
          text-decoration: none;
        }
      }
    }
  }
</style>
