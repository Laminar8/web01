<script lang="typescript">
    import cannondale from '../../public/images/cannondale.jpg'
    let headerMenu: { link: string }[] = [
        { link: 'Find a bike shop near me' },
        { link: 'Language(KR)' },
    ]
    let src = cannondale
</script>

<!-- Header -->
<header id="header">
    <div class="row1">
        <div class="row2">
            <div class="header_menu">
                {#each headerMenu as { link }}
                    <a href="#">{link}</a>
                {/each}
            </div>
            <!-- //header_menu -->
        </div>
        <div class="row3">
            <div class="container">
                <div class="header">
                    <div class="header_tit">
                        <section class="blank-section" />
                        <section class="title-section">
                            <a class="button-title" href="https://www.naver.com">cannondale</a>
                        </section>
                        <section class="message-section">
                            <h1>See you at the Top</h1>
                            <h2>
                                Colombian Dani Martinez conquers the climbs
                                <br />
                                to win Stage 13
                            </h2>
                        </section>
                        <br />
                        <section class="button-section">
                            <a class="button" href="https://www.naver.com">See the bikes</a>
                            <a class="button-secondary" href="https://www.naver.com">
                                Read the story
                            </a>
                        </section>
                    </div>
                    <!-- //header_tit -->
                </div>
            </div>
            <div class="header_image">
                <img {src} alt="cyclist" />
            </div>
            <!-- //header_image -->
        </div>
    </div>
</header>
