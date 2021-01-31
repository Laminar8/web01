<script lang="typescript">
  import girl from "../../../public/images/people/undraw_home_screen_4n7s.svg";

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

<column4 class="item">
  <div
    class="box"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <div class="image">
      <img src={girl} alt="" />
    </div>
    <div class="title">
      <span>보기, 모든 나</span>
    </div>
    <div class="text">
      <span>모든 나의 모습을 한 곳에서 보세요.</span><br />
      <span>내일은 어떤 '나' 일까요?</span>
    </div>
  </div>
</column4>
