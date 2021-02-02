<script lang="typescript">
  import girl2 from "../../../public/images/people/undraw_Mobile_messages_re_yx8w.svg";
  import girl3 from "../../../public/images/people/undraw_Followers_re_6k3g.svg";
  import girl4 from "../../../public/images/people/undraw_home_screen_4n7s.svg";
  import Box from "./objects/box.svelte";

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
</script>

{#each columnContent as innerArr}
  <column class={innerArr.columnName}>
    <Box
      src={innerArr.src}
      title={innerArr.title}
      text1={innerArr.text1}
      text2={innerArr.text2}
    />
  </column>
{/each}
