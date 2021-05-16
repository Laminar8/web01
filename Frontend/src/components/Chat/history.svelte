<script lang="typescript">
  import Amybig from "../../../public/images/history/amybig.jpg";
  import { historyArray } from "../../stores";

  let historyFull: { _id: string; date: string; tags: { text: string }[] }[];
  $: historyFull = $historyArray;
</script>

<div class="history-wrap">
  <div class="history-title">최근 기록</div>
  <div class="history-big-wrap">
    {#each historyFull as history}
      <div class="history-big-wrap-border">
        <div class="history-big-photo">
          <img src={Amybig} alt="History" />
        </div>
        <div class="history-big-day">
          <span>
            {`${history.date.slice(0, 4)}년 
            ${history.date.slice(4, 6)}월 
            ${history.date.slice(6, 8)}일`}
          </span>
        </div>
        <div class="history-big-tag">
          {#each history.tags as tag}
            <span>
              {tag.text}
            </span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  $color1: rgb(231, 231, 231);
  $color1_02: rgba(231, 231, 231, 0.2);
  $color1_04: rgba(231, 231, 231, 0.4);
  $color1_06: rgba(231, 231, 231, 0.6);
  $color1_08: rgba(231, 231, 231, 0.8);
  $color2: #6470ec;
  $color3: #f17ed5;
  $color3_02: #f0c1e4;
  $font_size1: 15px;

  //
  // History
  //

  .history-wrap {
    grid-area: history;
    background-color: $color1_04;
    margin: 5px;
    border-radius: 15px;

    /* Grid Settings */
    display: grid;
    grid-template-rows: 1fr 20fr;
    grid-template-areas:
      "title"
      "list-big";

    .history-title {
      grid-area: title;
      margin-top: 15px;
      text-align: center;
      color: $color1;
      font-size: 15px;
    }

    .history-big-wrap {
      grid-area: list-big;
      margin: 20px 15px 15px 15px;
      color: $color1_08;
      overflow-y: scroll;

      .history-big-wrap-border {
        border: $color1_02 1px solid;
        border-radius: 15px;
        margin: 10px 0;
      }

      img {
        border-radius: 15px;
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: 100% 0;
      }

      .history-big-day {
        margin: 10px 0 0 25px;
      }

      .history-big-tag {
        margin: 15px;

        span {
          display: inline-block;
          margin: 3px;
          padding: 8px;
          background-color: $color2;
          color: $color1;
          font-size: 13px;
          border-radius: 5px;
        }
      }
    }

    .history-big-wrap::-webkit-scrollbar {
      display: none;
    }
  }
</style>
