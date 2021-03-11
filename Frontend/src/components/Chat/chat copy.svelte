<script lang="typescript">
  import { link } from "svelte-spa-router";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { onMount } from "svelte";

  // Moment Settings
  import moment from "moment";
  import "moment/locale/ko";
  moment.locale("ko");

  // Common Variables
  const backendServerUrl = "http://localhost:4000/v1";
  const frontendServerUrl = "http://localhost:5000/#";

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
    comments = await getChat.json();
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
  function taghandleKeydown(event) {
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
        <a href="{backendServerUrl}/signout"> 로그아웃 </a>
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
      <div class="day-array">
        <p>{today}</p>
        {#each dayArray as day}
          <a
            class="days"
            href="{backendServerUrl}/chat/change/?thisDay={day[0]}">{day[2]}</a
          >
        {/each}
        {#each dayArray as day}
          <a href="{backendServerUrl}/chat/change/?thisDay={day[0]}">{day[1]}</a
          >
        {/each}
      </div>
    </div>
    <div class="tag-box">
      <div class="tag-array">
        <div class="tag-box">
          {#each comments as comment}
            {#if comment.text.length >= 8}
              <article>
                <span>{comment.text}</span>
              </article>
            {:else}
              <span>{comment.text}</span>
            {/if}
          {/each}
        </div>
        <div class="tag-text-box">
          <textarea on:keydown={taghandleKeydown} />
        </div>
      </div>
    </div>
  </div>
</right>

<style lang="scss">
  left {
    /* Default Font & Grid */
    font-family: "Jua";
    color: rgba(229, 224, 231, 0.85);
    grid-area: left;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    /* Default Box */
    background-color: rgba(238, 138, 138, 0.8);

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
        color: rgba(229, 224, 231, 0.85);
        font-size: 1.2vw;
      }
      a {
        color: rgba(229, 224, 231, 0.85);
        font-size: 1.4vw;
        margin-left: 0.7vw;
        appearance: button;
        cursor: none;
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
    background-color: rgba(252, 234, 234, 0.97);

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
          background-color: rgba(195, 163, 221, 0.95);
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
      background-color: rgba(238, 138, 138, 0.75);
    }
    .scrollable::-webkit-scrollbar-track {
      background-color: rgba(195, 163, 221, 0.75);
    }

    .input-box {
      grid-area: inputBox;
      background-color: rgba(255, 255, 255, 0.7);
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
    background-color: rgba(207, 192, 219, 0.8);

    .quick-access-wrap {
      margin: 1vh 1vw;
      height: auto;
      /* Grid Settings */
      display: grid;
      grid-template-rows: 2fr 3fr 2fr;
      grid-template-areas:
        "date"
        "tag"
        "menu2";

      .day-box {
        grid-area: date;
        margin-top: 3vh;
      }
      .day-array {
        background-color: rgba(229, 224, 231, 0.85);
        height: 15vh;
        border-radius: 15px;
        margin: 0 1vw;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(5, 1fr);
        grid-auto-flow: dense;
        text-align: center;
        p:nth-child(1) {
          grid-column: span 5;
          margin-top: 2.5vh;
          color: rgba(104, 99, 104, 0.85);
          font-weight: 600;
          font-size: 1vw;
        }
        .days {
          margin-top: 1.4vh;
        }
        a {
          color: rgba(104, 99, 104, 0.85);
          font-size: 0.75vw;
          appearance: button;
          cursor: none;
        }
        a:visited {
          color: rgba(104, 99, 104, 0.85);
          text-decoration: none;
        }
        a:hover {
          color: rgba(104, 99, 104, 0.85);
          text-decoration: none;
        }
        a:nth-child(10) {
          background-color: rgba(238, 138, 138, 0.75);
          color: rgb(243, 238, 245);
          height: fit-content;
          width: 55%;
          margin-left: 0.67vw;
          border-radius: 5px;
        }
      }
      .tag-box {
        grid-area: tag;
        margin-top: 3vh;
      }
      .tag-array {
        background-color: rgba(229, 224, 231, 0.85);
        height: 20vh;
        border-radius: 15px;
        margin: 0 1vw;
        display: grid;
        grid-template-rows: 5fr 1fr;
        grid-template-areas:
          "tags"
          "taginput";
        .tag-box {
          grid-area: tags;
          margin: 1.5vh 2vw 0 2vw;
          overflow: hidden;
        }
        article {
          margin-top: 2vh;
          span {
            padding: 1vh 0.5vw;
            margin: 1vh 0.2vw 2vh 0;
          }
        }
        span {
          padding: 1vh 0.5vw;
          margin: 1vh 0.2vw 2vh 0;
          background-color: rgba(195, 163, 221, 0.95);
          color: rgb(243, 238, 245);
          border-radius: 0.5em;
          word-break: break-all;
        }
        .tag-text-box {
          grid-area: taginput;
          background-color: rgba(255, 255, 255, 0.7);
          margin: 2vh 2vw;
          textarea {
            font-family: "Jua";
            border: 0;
            background-color: transparent;
            color: rgb(78, 77, 78);
            cursor: none;
            resize: none;
            overflow: hidden;
            height: 2vh;
            margin: {
              top: 0.5vh;
              left: 1vw;
            }
          }
        }
      }
    }
  }
</style>
