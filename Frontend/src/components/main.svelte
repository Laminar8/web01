<script lang="typescript">
    import item01 from '../../public/images/item01.jpg'
    import item02 from '../../public/images/item02.jpg'
    import item03 from '../../public/images/item03.jpg'
    import { onMount } from 'svelte'
    let src: { item: string; alt: string; text: string }[] = [
        { item: item01, alt: 'item01', text: 'Road' },
        { item: item02, alt: 'item02', text: 'Mountain' },
        { item: item03, alt: 'item03', text: 'Active' },
    ]

    let slideList: HTMLElement // Slide parent dom
    let slideBtnNext: HTMLElement // next button
    let slideBtnPrev: HTMLElement // prev button
    let curSlide: any
    const slideWidth = 638 // slide width
    const slideSpeed = 300 // slide speed
    const startNum = 0 // initial slide index (0 ~ 4)

    onMount(() => {
        const slideContents = slideList.querySelectorAll('.slide_content') // each slide dom
        const slideLen: number = slideContents.length // slide length

        slideList.style.width = slideWidth * (slideLen + 2) + 'px'

        // Copy first and last slide
        let firstChild: any = slideList.firstElementChild
        let lastChild: any = slideList.lastElementChild
        let clonedFirst: any = firstChild.cloneNode(true)
        let clonedLast: any = lastChild.cloneNode(true)

        // Add copied Slides
        slideList.appendChild(clonedFirst)
        slideList.insertBefore(clonedLast, slideList.firstElementChild)

        slideList.style.transform =
            'translate3d(-' + slideWidth * (startNum + 1) + 'px, 0px, 0px)'

        let curIndex: number = startNum // current slide index (except copied slide)
        let curSlide: any = slideContents[curIndex] // current slide dom
        curSlide.classList.add('slide_active')

        /** Next Button Event */
        slideBtnNext.addEventListener('click', function () {
            if (curIndex <= slideLen - 1) {
                slideList.style.transition = slideSpeed + 'ms'
                slideList.style.transform =
                    'translate3d(-' +
                    slideWidth * (curIndex + 2) +
                    'px, 0px, 0px)'
            }
            if (curIndex === slideLen - 1) {
                setTimeout(function () {
                    slideList.style.transition = '0ms'
                    slideList.style.transform =
                        'translate3d(-' + slideWidth + 'px, 0px, 0px)'
                }, slideSpeed)
                curIndex = -1
            }
            curSlide.classList.remove('slide_active')
            curSlide = slideContents[++curIndex]
            curSlide.classList.add('slide_active')
        })

        /** Prev Button Event */
        slideBtnPrev.addEventListener('click', function () {
            if (curIndex >= 0) {
                slideList.style.transition = slideSpeed + 'ms'
                slideList.style.transform =
                    'translate3d(-' + slideWidth * curIndex + 'px, 0px, 0px)'
            }
            if (curIndex === 0) {
                setTimeout(function () {
                    slideList.style.transition = '0ms'
                    slideList.style.transform =
                        'translate3d(-' +
                        slideWidth * slideLen +
                        'px, 0px, 0px)'
                }, slideSpeed)
                curIndex = slideLen
            }
            curSlide.classList.remove('slide_active')
            curSlide = slideContents[--curIndex]
            curSlide.classList.add('slide_active')
        })
    })
</script>

<!-- Main -->
<main>
    <div class="main">
        <secion class="blank-item" />
        <section class="image-itme">
            <div class="image-itme-title">
                <h2>EXPLORE BIKES</h2>
            </div>
        </section>
        <!-- Image-Item Section End -->

        <section class="intro-itme">
            <div class="slide_wrap">
                <div class="slide_box">
                    <div class="slide_list" bind:this={slideList}>
                        {#each src as { item, alt, text }}
                            <div class="slide_content">
                                <!-- <div class="image-text">
                                <h2>{text}</h2>
                            </div> -->
                                <img src={item} {alt} />
                            </div>
                            <!-- // slide_content -->
                        {/each}
                    </div>
                    <!-- // slide_list -->
                </div>
                <!-- // slide_box -->
            </div>
            <!-- // slide_wrap -->

            <div class="slide_btn_box">
                <button
                    type="button"
                    class="slide_btn_prev"
                    bind:this={slideBtnPrev}
                >
                    Prev
                </button>
                <button
                    type="button"
                    class="slide_btn_next"
                    bind:this={slideBtnNext}
                >
                    Next
                </button>
            </div>
            <!-- // .slide_btn_box -->

        </section>
        <!-- Intro-Item Section End -->
    </div>

</main>
