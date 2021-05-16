<script lang="typescript">
  import { backendServerUrl, userId } from "../../stores";

  //
  // Moment Settings
  //

  import moment from "moment";
  import "moment/locale/ko";

  moment.locale("ko");

  // Common Variables
  const menu = [
    {
      class: "chatting-btn-wrap",
      i: "fas fa-comment-dots",
      a: `${$backendServerUrl}/chat/change/?thisDay=${moment().format(
        "YYYYMMDD"
      )}`,
      text: "일기",
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
  {#if $userId != false}
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

<style lang="scss">
  $color1: rgb(231, 231, 231);
  $color1_02: rgba(231, 231, 231, 0.2);
  $color1_04: rgba(231, 231, 231, 0.4);
  $color1_06: rgba(231, 231, 231, 0.6);
  $color1_08: rgba(231, 231, 231, 0.8);
  $color2: #6470ec;
  $color3: #f17ed5;
  $color3_02: #f0c1e4;
  $font_size1: 15px;

  //
  // Menu
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
</style>
