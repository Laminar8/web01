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
        while (event.path[count].tagName != "BUTTON") {
            count += 1;
            console.log(count);
        }
        event.path[count].style.color = "#4e6ab8";
        if (event.path[count].children.length == 2) {
            console.log(event.path[count].children[1].style);
            event.path[count].children[1].style.transform = "rotate(180deg)";
        }
        console.log(event);
    }
    function handleMouseOut(event) {
        event.path[count].style.color = "#bdbdc4";
        if (event.path[count].children.length == 2) {
            console.log(event.path[count].children[1].style);
            event.path[count].children[1].style.transform = "";
        }
        count = 0;
    }
</script>

<header class="item">
    <div class="header">
        {#each headerLink as { name, link, iconClass }}
            <div class="headerIcon">
                <button
                    on:mouseover={handleMouseOver}
                    on:mouseout={handleMouseOut}><span class="iconClass"><i
                            class={iconClass} />
                        {name}</span>
                    {#if name === '메뉴'}
                        <span class="arrow"><i class="fas fa-angle-up" /></span>
                    {/if}
                </button>
            </div>
        {/each}
    </div>
</header>
