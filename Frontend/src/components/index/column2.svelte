<script lang="typescript">
  import girl from "../../../public/images/people/undraw_Mobile_messages_re_yx8w.svg";

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

<column2 class="item">
  <div
    class="box"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <div class="image">
      <img src={girl} alt="" />
    </div>
    <div class="title">
      <span>쓰기, 오늘의 나</span>
    </div>
    <div class="text">
      <span>기억은 영원하지 않지만, 기록은 영원합니다.</span><br />
      <span>오늘의 나를 기록하세요. </span>
    </div>
  </div>
</column2>
