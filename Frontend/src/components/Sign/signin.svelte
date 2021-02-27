<script lang="typescript">
  import { link } from "svelte-spa-router";
  let email: string;
  let password: string;

  function handleSubmit(event) {
    console.log(email, password);
    if (!email || !password) {
      event.preventDefault();
      alert("이메일 또는 비밀번호를 입력해주세요.");
    }
  }
</script>

<container>
  <div class="right-header">
    <div class="signin-top-wrap">
      <p>들어가기</p>
    </div>
  </div>
  <div class="left-box">
    <div class="signup-content-container">
      <div class="signup-content-header">
        <p>우리, 처음인가요?</p>
      </div>
      <div class="signup-content-body">
        <p>당신과 오늘부터 함께하고 싶어요</p>
        <p>오늘의 기억은 나에게 맡겨요</p>
        <a href="/signup" use:link> 회원가입 </a>
      </div>
    </div>
  </div>
  <div class="right-box">
    <div class="signin-input-container">
      <form
        action="http://localhost:4000/v1/signin"
        name="loginForm"
        method="POST"
        on:submit={handleSubmit}
      >
        <div class="signin-input-wrap input-id">
          <i class="far fa-envelope" />
          <input
            placeholder="이메일"
            type="text"
            name="email"
            bind:value={email}
          />
        </div>
        <div class="signin-input-wrap input-password">
          <i class="fas fa-key" />
          <input
            placeholder="비밀번호"
            type="password"
            name="password"
            bind:value={password}
          />
        </div>
        <div class="signin-btn-wrap">
          <button class="signin-btn">로그인</button>
        </div>
      </form>
      <div class="findpassword-btn-wrap">
        <button class="findpassword-btn">비밀번호를 잊으셨나요?</button>
      </div>
    </div>
  </div>
</container>

<style lang="scss">
  container {
    /* Default Font & Grid */
    font-family: "Jua";
    color: #1e1e22d7;
    grid-area: signin-center;
    height: 70vh;
    width: 60vw;
    margin: {
      top: 5vh;
      left: 5vw;
    }

    /* Default Box */
    background-color: rgba(238, 138, 138, 0.85);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    -webkit-backdrop-filter: blur(2.5px);
    backdrop-filter: blur(2.5px);
    border-radius: 15px;

    /* Animation Settings */
    transition: all 1s ease;

    /* Grid Settings */
    display: grid;
    grid-template-rows: 1fr 5fr;
    grid-template-columns: 1fr 1.5fr;
    grid-template-areas:
      ". signin-header"
      "signin-left signin-right";
  }
  .left-box {
    grid-area: signin-left;
    text-align: center;
    color: rgba(229, 224, 231, 0.856);
    .signup-content-container {
      margin-top: 8vh;
      .signup-content-header {
        font: {
          size: 2vw;
        }
        letter-spacing: 0.2vw;
      }
      .signup-content-body {
        margin-top: 3vh;
        font: {
          size: 1vw;
        }
        letter-spacing: 0.05vw;
      }
      p {
        margin-top: 1vh;
      }
      a {
        margin-top: 8vh;
        padding-top: 1.6vh;
        cursor: none;
        -webkit-border-radius: 45px;
        -moz-border-radius: 45px;
        border-radius: 45px;
        border: 0.15vw solid rgba(229, 224, 231, 0.856);
        width: 10vw;
        height: 4vh;
        appearance: button;
        color: rgba(229, 224, 231, 0.856);
      }

      a:visited {
        color: rgba(229, 224, 231, 0.856);
        text-decoration: none;
      }
      a:hover {
        color: rgba(229, 224, 231, 0.856);
        text-decoration: none;
      }
    }
  }
  .right-box {
    grid-area: signin-right;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0 0 15px 0;
    .signin-input-container {
      padding: {
        top: 15vh;
        left: 15%;
      }
      .signin-input-wrap {
        width: 80%;
        height: 5vh;
        margin-top: 2vh;
        border-radius: 2px;
        border-bottom: solid 2px rgb(161, 131, 185);
        font-size: 1.2vw;
        display: inline-flex;
        i {
          color: rgb(161, 131, 185);
          margin: {
            top: 2vh;
            left: 0.4vw;
          }
        }
        input {
          border: 0;
          width: 85%;
          background-color: transparent;
          cursor: none;
          margin: {
            top: 2vh;
            left: 0.8vw;
          }
        }
        input:focus {
          outline: none;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          transition: background-color 50000s;
          -webkit-text-fill-color: #fff !important;
        }
        /*Change text in autofill textbox*/
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-text-fill-color: #1e1e22d7 !important;
        }
      }
      .signin-btn-wrap {
        margin: {
          top: 6vh;
          left: 28.5%;
        }
        width: 80%;
        display: flex;
        flex-direction: column;
        button {
          -webkit-border-radius: 45px;
          -moz-border-radius: 45px;
          border-radius: 45px;
          border: 0.15vw solid rgb(161, 131, 185);
          height: 5vh;
          width: 8vw;
          padding-top: 1vh;
          background-color: rgb(161, 131, 185);
          cursor: none;
          color: white;
          font-size: 0.9vw;
          outline: none;
        }
      }
      .findpassword-btn-wrap {
        margin: {
          top: 2vh;
          left: 29.2%;
        }
        width: 80%;
        display: flex;
        flex-direction: column;
        button {
          border: 0;
          height: 5vh;
          width: 8vw;
          padding-top: 1vh;
          background-color: transparent;
          cursor: none;
          color: rgb(161, 131, 185);
          font-size: 0.9vw;
          outline: none;
        }
      }
    }
  }

  .right-header {
    grid-area: signin-header;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0 15px 0 0;
    .signin-top-wrap {
      padding: {
        top: 5vh;
        right: 5vw;
      }
      float: right;
      p {
        border: 0;
        color: rgb(161, 131, 185);
        background-color: transparent;
        font: {
          weight: 600;
          size: 0.8vw;
        }
        cursor: none;
        letter-spacing: 0.25vw;
        margin-right: 0.8vw;
      }
    }
  }
</style>
