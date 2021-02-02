<script lang="typescript">
  export let src: string;
  export let title: string;
  export let text1: string;
  export let text2: string;
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

<div
  class="box"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <div class="image">
    <img {src} alt="" />
  </div>
  <div class="title">
    <span>{title}</span>
  </div>
  <div class="text">
    <span>{text1}</span><br />
    <span>{text2}</span>
  </div>
</div>
