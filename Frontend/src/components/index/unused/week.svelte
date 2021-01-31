<script lang="typescript">
  // Import Modules
  import { onMount } from "svelte";
  import Arrow from "../../../../public/images/week/right-arrow.svg";

  // Button Object
  const weekButtonArr = [
    { src: Arrow, alt: "Arrow-left", style: "" },
    { src: Arrow, alt: "Arrow-right", style: "transform: rotate(180deg)" },
  ];

  // Initializing for Weeks
  const weekBackgroundArr = [
    { p: "월", style: "background-color: #f16a61d7" },
    { p: "화", style: "background-color: #ec9955d7" },
    { p: "수", style: "background-color: #fafd34b4" },
    { p: "목", style: "background-color: #93ec1e86" },
    { p: "금", style: "background-color: #38f3d4b4" },
    { p: "토", style: "background-color: #2c6af0b4" },
    { p: "일", style: "background-color: #edccf063" },
  ];
  let thisWeekNumber = 0;
  let posts: {
    weekArr: string[];
    changeDayArr: number[];
  };
  let weekArr: string[];
  let changeDayArr: number[];

  // Feching
  const baseUrl = "http://localhost:4000/v1/week/";
  onMount(async () => {
    const res = await fetch(baseUrl + String(thisWeekNumber));
    posts = await res.json();
    weekArr = posts.weekArr;
    changeDayArr = posts.changeDayArr;
  });

  function beforeClick() {
    thisWeekNumber -= 1;
  }

  function afterClick() {
    thisWeekNumber += 1;
  }

  // Hover Effect
  function handleMouseOver(event: MouseEvent) {
    // Cursor Effect
    const mouseCursor: HTMLDivElement = document.querySelector(".cursor");
    mouseCursor.classList.add("cursor-grow");
    mouseCursor.style.zIndex = "-1";
  }
  function handleMouseOut(event: MouseEvent) {
    // Cursor Effect
    const mouseCursor: HTMLDivElement = document.querySelector(".cursor");
    mouseCursor.classList.remove("cursor-grow");
    mouseCursor.style.zIndex = "1000";
  }
</script>

<div class="weekTitleContainer">
  <div class="weekTitle">
    <span>#</span><span>WeeklyHashtags</span>
  </div>
  <div class="weekButton">
    {#each weekButtonArr as weekButtonInfo}
      <button on:mouseover={handleMouseOver} on:mouseout={handleMouseOut}
        ><img
          src={weekButtonInfo.src}
          alt={weekButtonInfo.alt}
          style={weekButtonInfo.style}
        />
      </button>
    {/each}
  </div>
</div>

{#each weekBackgroundArr as weekBackgroundInfo}
  <div class="weekContent">
    <div class="weekNumber">
      <div class="weekBackground" style={weekBackgroundInfo.style}>
        <p>{weekBackgroundInfo.p}</p>
      </div>
    </div>
  </div>
{/each}
