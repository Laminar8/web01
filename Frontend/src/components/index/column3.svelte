<script lang="typescript">
  import girl from "../../../public/images/people/undraw_Followers_re_6k3g.svg";

  // Find div.box
  let count = 0;

  // Mouse Event
  function handleMouseEnter(event) {
    // Hover Effect
    if (event.path[count].className != "box") {
      count += 1;
    } else {
      event.path[count].classList.add("box-grow");
      event.path[count].style.background = "rgba(240, 222, 255, 0.6)";
    }
  }
  function handleMouseLeave(event) {
    // Hover Effect
    event.path[count].classList.remove("box-grow");
    event.path[count].style.background = "rgba(255, 196, 196, 0.6)";
    count = 0;
  }
</script>

<column3 class="item">
  <div
    class="box"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <div class="image">
      <img src={girl} alt="" />
    </div>
    <div class="title">
      <span>더하기, 또 다른 나</span>
    </div>
    <div class="text">
      <span>어제와 나와 오늘의 나는 똑같지 않습니다.</span><br />
      <span>다른 나의 모습을 기억하세요. </span>
    </div>
  </div>
</column3>
