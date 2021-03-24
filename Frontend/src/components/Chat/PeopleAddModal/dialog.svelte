<script lang="typescript">
  import { getContext } from "svelte";

  const { close } = getContext("simple-modal");
  let name: string;
  let gender: string;
  let birth: string;
  let image: string;

  function _onCancel() {
    close();
  }

  function handleSubmit(event) {
    // console.log(name, email, password);
    // if (!name || !email || !password) {
    //   event.preventDefault();
    //   alert("이메일 또는 비밀번호를 입력해주세요.");
    // }
    console.log("Hi");
  }
</script>

<button class="close" on:click={_onCancel}><i class="fas fa-times" /> </button>

<div class="people-wrap">
  <div class="people-header-wrap">
    <h4>새로운 사람과<br /> 오늘을 함께하셨나요?</h4>
    <h1>나의 사람<i class="fas fa-heart" /></h1>
  </div>

  <div class="people-image-wrap">
    <h4>사진을 업로드해주세요!</h4>
    <div class="people-image"><i class="fas fa-cloud-upload-alt" /></div>
  </div>
  <div class="people-form-wrap">
    <!-- <i class="fas fa-tags" />
      <input
        type="text"
        placeholder="#태그입력"
        bind:value
        on:keydown={(e) => e.key === "Enter" && _onOkay()}
      /> -->
    <div class="signin-input-wrap input-id">
      <i class="fas fa-user" />
      <input
        placeholder="사용자 이름"
        type="text"
        name="username"
        bind:value={name}
      />
    </div>
    <div class="signin-input-wrap input-id">
      <i class="far fa-envelope" />
      <input
        placeholder="이메일"
        type="text"
        name="email"
        bind:value={gender}
      />
    </div>
    <div class="signin-input-wrap input-password">
      <i class="fas fa-key" />
      <input
        placeholder="비밀번호"
        type="password"
        name="password"
        bind:value={birth}
      />
    </div>
  </div>
</div>
<!-- <div class="input-wrap">
    <i class="fas fa-tags" />
    <input
      type="text"
      placeholder="#태그입력"
      bind:value
      on:keydown={(e) => e.key === "Enter" && _onOkay()}
    />
  </div> -->

<!-- <div class="buttons">
  <button on:click={_onOkay}> 추가 </button>
</div> -->
<style lang="scss">
  .close {
    position: absolute;
    right: 0;
    margin-right: 1vw;
    background: transparent;
    cursor: none;
    color: rgb(161, 131, 185);
    border: none;
    font-size: 1vw;
  }

  .close:before,
  .close:after {
    cursor: none;
    color: rgb(161, 131, 185);
  }

  .people-wrap {
    margin: 4vh 5% 0 5%;
    display: grid;
    grid-template-rows: 1fr 3fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "header form"
      "image form"
      "add .";
  }
  .people-header-wrap {
    grid-area: header;
    color: rgb(161, 131, 185);
    h4 {
      color: rgba(238, 138, 138, 1);
    }
    h1 {
      font-size: 1.5vw;
    }
    i {
      margin-left: 0.4vw;
    }
  }
  .people-image-wrap {
    grid-area: image;
    margin-top: 3vh;

    .people-image {
      margin: 2vh 1vw 0 0;
      border: 2px solid #1e1e22d7;
      height: 20vh;
      text-align: center;
      i {
        position: relative;
        top: 50%;
        font-size: 2.5vw;
        transform: translate(0, -50%);
      }
    }
  }

  .people-form-wrap {
    grid-area: form;
  }
</style>
