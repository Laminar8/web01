<script lang="typescript">
  import CloudyDay from "../../../../public/images/weather/animated/cloudy-day-1.svg";
  import Cloudy from "../../../../public/images/weather/animated/cloudy.svg";
  import Day from "../../../../public/images/weather/animated/day.svg";
  import Rainy from "../../../../public/images/weather/animated/rainy-4.svg";
  import Snowy from "../../../../public/images/weather/animated/snowy-4.svg";
  import { onMount } from "svelte";

  // 강수형태(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
  // 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
  const baseUrl = "http://localhost:4000/v1/weather";
  let posts: { weatherList: [] };
  let weatherList = [];
  const weatherInfo = {
    time: ["6:00 AM", "3:00 PM"],
    text: {
      textDay: ["내일은 날씨가 좋아요! 가볍게 옷을 입고 나가봐요."],
      textCloudy: ["내일은 흐릴거에요. 내 마음도 흐린 걸 :("],
      textCloudyday: ["내일은 구름이 날 반겨주겠어요. 구름에게 인사해요!"],
      textRainy: ["맙소사.. 비가 와요. 우산 잊지 않았죠?"],
      textSnowy: ["하늘에서 눈이 내려와요. 미끄러지지 않게 조심해요."],
    },
  };
  onMount(async () => {
    const res = await fetch(baseUrl);
    posts = await res.json();
    weatherList = posts.weatherList;
  });
</script>

{#each weatherList as outerArr, index}
  {#if outerArr[0] !== "0"}
    {#if ["1", "4", "5"].indexOf(outerArr[0]) !== -1}
      <div class="weatherContent">
        <div class="imageBox"><img src={Rainy} alt="Rainy" /></div>
        <div class="text">{weatherInfo.text.textRainy}</div>
        <div class="time">{weatherInfo.time[index]}</div>
        <div class="temp">{outerArr[2]} ℃</div>
      </div>
    {:else}
      <div class="weatherContent">
        <div class="imageBox"><img src={Snowy} alt="Snowy" /></div>
        <div class="text">{weatherInfo.text.textSnowy}</div>
        <div class="time">{weatherInfo.time[index]}</div>
        <div class="temp">{outerArr[2]} ℃</div>
      </div>
    {/if}
  {:else if outerArr[1] === "0"}
    <div class="weatherContent">
      <div class="imageBox"><img src={Day} alt="Day" /></div>
      <div class="text">{weatherInfo.text.textDay}</div>
      <div class="time">{weatherInfo.time[index]}</div>
      <div class="temp">{outerArr[2]} ℃</div>
    </div>
  {:else if outerArr[1] === "1"}
    <div class="weatherContent">
      <div class="imageBox"><img src={CloudyDay} alt="CloudyDay" /></div>
      <div class="text">{weatherInfo.text.textCloudyday}</div>
      <div class="time">{weatherInfo.time[index]}</div>
      <div class="temp">{outerArr[2]} ℃</div>
    </div>
  {:else}
    <div class="weatherContent">
      <div class="imageBox"><img src={Cloudy} alt="Cloudy" /></div>
      <div class="text">{weatherInfo.text.textCloudy}</div>
      <div class="time">{weatherInfo.time[index]}</div>
      <div class="temp">{outerArr[2]} ℃</div>
    </div>
  {/if}
{:else}
  <div class="weatherContent">
    <div class="imageBox"><img src={Day} alt="Day" /></div>
    <div class="text">Loading...</div>
  </div>
{/each}
