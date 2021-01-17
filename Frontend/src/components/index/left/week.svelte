<script lang="typescript">
  // Import Modules
  import { onMount } from "svelte";
  import Arrow from "../../../../public/images/week/right-arrow.svg";

  // Initializing
  let weekNumber = 0;
  let posts: {
    weekArr: string[];
    changeDayArr: number[];
  };
  let weekArr: string[];
  let changeDayArr: number[];

  // Feching
  const baseUrl = "http://localhost:4000/v1/week/";
  onMount(async () => {
    const res = await fetch(baseUrl + String(weekNumber));
    posts = await res.json();
    weekArr = posts.weekArr;
    changeDayArr = posts.changeDayArr;
  });

  function beforeClick() {
    weekNumber -= 1;
  }

  function afterClick() {
    weekNumber += 1;
  }
</script>

<div class="weekContent">
  <div class="weekTitle">
    <div class="weekText">
      <span>Weekly</span>
    </div>
    <div class="weekButton">
      <button
        ><img
          src={Arrow}
          alt="Arrow-right"
          style="transform: rotate(180deg)"
        /></button
      >
      <button><img src={Arrow} alt="Arrow-right" /></button>
    </div>
  </div>
</div>
