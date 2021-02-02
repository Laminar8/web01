<script lang="typescript">
  const headerLink: Array<{
    name: string;
    link: string;
    iconClass: string;
  }> = [
    {
      name: "언어",
      link: "Language.com",
      iconClass: "fas fa-language",
    },
    { name: "메뉴", link: "Menu.com", iconClass: "fas fa-bars" },
  ];

  let count = 0;

  function handleMouseOver(event) {
    // Cursor Effect
    const mouseCursor: HTMLDivElement = document.querySelector(".cursor");
    mouseCursor.classList.add("cursor-grow");

    // Hover Effect
    while (event.path[count].tagName != "BUTTON") {
      count += 1;
    }
    event.path[count].style.color = "#4e6ab8";
    event.path[count].style.background = "rgba(255, 255, 255, 0.6)";
    if (event.path[count].children.length == 2) {
      event.path[count].children[1].style.transform = "rotate(180deg)";
    }
  }
  function handleMouseOut(event) {
    // Cursor Effect
    const mouseCursor: HTMLDivElement = document.querySelector(".cursor");
    mouseCursor.classList.remove("cursor-grow");

    // Hover Effect
    event.path[count].style.color = "#1e1e22d7";
    event.path[count].style.background = "rgba(255, 196, 196, 0.6)";
    if (event.path[count].children.length == 2) {
      event.path[count].children[1].style.transform = "";
    }
    count = 0;
  }
</script>

<header class="item">
  <div class="header">
    {#each headerLink as { name, link, iconClass }}
      <div class="headerIcon">
        <button on:mouseover={handleMouseOver} on:mouseout={handleMouseOut}
          ><span class="iconClass"
            ><i class={iconClass} />
            {name}</span
          >
          {#if name === "메뉴"}
            <span class="arrow"><i class="fas fa-angle-up" /></span>
          {/if}
        </button>
      </div>
    {/each}
  </div>
</header>
