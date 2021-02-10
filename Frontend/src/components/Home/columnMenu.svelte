<script lang="typescript">
  import girl2 from "../../../public/images/people/undraw_Mobile_messages_re_yx8w.svg";
  import girl3 from "../../../public/images/people/undraw_Followers_re_6k3g.svg";
  import girl4 from "../../../public/images/people/undraw_home_screen_4n7s.svg";

  const columnContent = [
    {
      columnName: "column2 item",
      src: girl2,
      title: "쓰기, 오늘의 나",
      text1: "기억은 영원하지 않지만, 기록은 영원합니다.",
      text2: "오늘의 나를 기록하세요.",
    },
    {
      columnName: "column3 item",
      src: girl3,
      title: "더하기, 또 다른 나",
      text1: "어제와 나와 오늘의 나는 똑같지 않습니다.",
      text2: "다른 나의 모습을 기억하세요. ",
    },
    {
      columnName: "column4 item",
      src: girl4,
      title: "보기, 모든 나",
      text1: "모든 나의 모습을 한 곳에서 보세요.",
      text2: "내일은 어떤 '나' 일까요?",
    },
  ];
  // Find div.box
  let count = 0;

  // Mouse Event
  function handleMouseEnter(event) {
    for (let step = 0; step < event.path.length; step++) {
      // Hover Effect
      if (event.path[count].classList[0].indexOf("box") == -1) {
        count += 1;
      } else {
        event.path[count].classList.add("box-grow");
        event.path[count].style.backgroundColor = "rgba(240, 222, 255, 0.6)";
        break;
      }
    }
  }

  function handleMouseLeave(event) {
    // Hover Effect
    event.path[count].classList.remove("box-grow");
    event.path[count].style.backgroundColor = "rgba(255, 196, 196, 0.6)";
    count = 0;
  }
</script>

{#each columnContent as innerArr}
  <column class={innerArr.columnName}>
    <div
      class="box"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
    >
      <div class="image">
        <img src={innerArr.src} alt="" />
      </div>
      <div class="title">
        <span>{innerArr.title}</span>
      </div>
      <div class="text">
        <span>{innerArr.text1}</span><br />
        <span>{innerArr.text2}</span>
      </div>
    </div>
  </column>
{/each}

<style type="text/scss">
  column {
    height: 70vh;
    width: 100%;
    font-family: "Jua";
    color: #1e1e22d7;
  }
  .box {
    /* Default Box */
    background-color: rgba(255, 196, 196, 0.6);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    -webkit-backdrop-filter: blur(2.5px);
    backdrop-filter: blur(2.5px);
    border-radius: 15px;
    height: 100%;

    /* Animation Settings */
    transition: all 1s ease;

    /* Grid Settings */
    display: grid;
    grid-template-rows: 4fr 0.2fr 1.3fr 2fr;
    grid-template-columns: 1fr 8fr 1fr;
    grid-template-areas:
      "image image image"
      ". . ."
      ". title ."
      ". text .";
    .image {
      grid-area: image;
      img {
        padding: 10.5vh 20% 0 20%;
        max-width: 60%;
        max-height: 60%;
      }
    }
    .title {
      grid-area: title;
      text-align: center;
      font-size: 4vh;
      font-weight: 900;
    }
    .text {
      grid-area: text;
      text-align: center;
      font-size: 1.75vh;
      font-weight: 600;
    }
  }

  .column2.item {
    grid-area: column2;
  }

  .column3.item {
    grid-area: column3;
    .box .image img {
      padding: 12.7vh 20% 0 20%;
    }
  }

  .column4.item {
    grid-area: column4;
    .box .image img {
      padding: 7.5vh 13% 0 27%;
      max-width: 60%;
      max-height: 60%;
    }
  }
  .box-grow {
    transform: scale(1.05);
  }
</style>
