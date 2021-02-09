<script lang="typescript">
  let mouseCursor: HTMLDivElement;
  //window 객체에 scroll & mouse 이벤트를 추가하고 cursor함수 실행되도록 함
  window.addEventListener("scroll", cursor);
  window.addEventListener("mousemove", cursor);
  //커스텀 커서의 left값과 top값을 커서의 XY좌표값과 일치시킴
  function cursor(event: MouseEvent) {
    mouseCursor.style.left = event.pageX + "px";
    mouseCursor.style.top = event.pageY + "px";
  }
</script>

<div bind:this={mouseCursor} class="cursor" />

<style lang="scss">
  /* 커스텀 커서 스타일 정의해주기 */
  .cursor {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    position: absolute;
    z-index: 1000;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: all 0.3s ease;
    transition-property: background, transform;
    transform-origin: 100% 100%;
    background-color: #c5dadf;
    opacity: 75%;
    background-size: cover;
  }
</style>
