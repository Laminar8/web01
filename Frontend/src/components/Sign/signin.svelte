<script lang="typescript">
  import { link } from "svelte-spa-router";
  let name: string;
  let email: string;
  let password: string;

  function signinHandleSubmit(event) {
    console.log(email, password);
    if (!email || !password) {
      event.preventDefault();
      alert("이메일 또는 비밀번호를 입력해주세요.");
    }
  }

  function signupHandleSubmit(event) {
    console.log(name, email, password);
    if (!name || !email || !password) {
      event.preventDefault();
      alert("이메일 또는 비밀번호를 입력해주세요.");
    }
  }
  // 회원가입&로그인 탭 구분
  let signin = 1;
  let signinBOXDivClass = "signin-box";
  let signupBOXDivClass = "signin-box not-active-box-div";
  let signinDivClass = "signin-text active-div";
  let signupDivClass = "signup-text not-active-div";
  let signinSpanClass = "signup-text-span active-span";
  let signupSpanClass = "signup-text-span";
  function changeSignin() {
    if (!signin) {
      signin = 1;
      signinBOXDivClass = signinBOXDivClass.split(" ")[0];
      signupBOXDivClass =
        signupBOXDivClass.split(" ")[0] + " not-active-box-div";
      signinDivClass = signinDivClass.split(" ")[0] + " active-div";
      signupDivClass = signupDivClass.split(" ")[0] + " not-active-div";
      signinSpanClass = signinSpanClass.split(" ")[0] + " active-span";
      signupSpanClass = signupSpanClass.split(" ")[0];
    }
  }
  function changeSignup() {
    if (signin) {
      signin = 0;
      signinBOXDivClass =
        signinBOXDivClass.split(" ")[0] + " not-active-box-div";
      signupBOXDivClass = signupBOXDivClass.split(" ")[0];
      signinDivClass = signinDivClass.split(" ")[0] + " not-active-div";
      signupDivClass = signupDivClass.split(" ")[0] + " active-div";
      signinSpanClass = signinSpanClass.split(" ")[0];
      signupSpanClass = signupSpanClass.split(" ")[0] + " active-span";
    }
  }
</script>

<div class="signup-box">
  <div class={signupDivClass} on:click={changeSignup}>
    <span class={signupSpanClass}>회원가입</span>
  </div>
  <div class={signinDivClass} on:click={changeSignin}>
    <span class={signinSpanClass}>로그인</span>
  </div>
</div>

<div class={signinBOXDivClass}>
  <div class="signin-input-container">
    <form
      action="http://localhost:4000/v1/signin"
      name="loginForm"
      method="POST"
      on:submit={signinHandleSubmit}
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
<div class={signupBOXDivClass}>
  <div class="signin-input-container">
    <form
      action="http://localhost:4000/v1/signup"
      name="loginForm"
      method="POST"
      on:submit={signupHandleSubmit}
    >
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
        <button class="signin-btn">회원가입</button>
      </div>
    </form>
  </div>
</div>

<style lang="scss">
  $color1: rgb(231, 231, 231);
  $color1_02: rgba(231, 231, 231, 0.2);
  $color1_04: rgba(231, 231, 231, 0.4);
  $color1_06: rgba(231, 231, 231, 0.6);
  $color1_08: rgba(231, 231, 231, 0.8);
  $color2: #6470ec;

  .signup-box {
    grid-area: signup;
    display: inline-flex;
    text-align: center;

    .signup-text {
      width: 50%;
      padding-top: 16px;
      border-top-left-radius: 15px;
    }

    .signin-text {
      width: 50%;
      padding-top: 16px;
      border-top-right-radius: 15px;
    }
  }

  .signup-text-span {
    font-size: 20px;
    color: $color1;
  }
  .not-active-box-div {
    display: none;
  }
  .active-div {
    background-color: $color1_04;
  }
  .not-active-div {
    background-color: $color1_06;
  }
  .active-span {
    border-bottom: 5px $color1 solid;
  }

  .signin-box {
    grid-area: signin;
    background-color: $color1_04;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    .signin-input-container {
      margin: {
        top: 85px;
        left: 55px;
      }
      .signin-input-wrap {
        width: 85%;
        height: 45px;
        margin-top: 20px;
        border-radius: 2px;
        border-bottom: solid 2px $color1;
        font-size: 20px;
        display: inline-flex;

        i {
          color: $color1;
          margin: {
            top: 20px;
            left: 10px;
          }
        }
        input {
          border: 0;
          width: 85%;
          color: $color1;
          background-color: transparent;
          cursor: none;
          margin: {
            top: 20px;
            left: 15px;
          }
        }
        input:focus {
          outline: none;
        }
        input::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: $color1;
          opacity: 1; /* Firefox */
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          transition: background-color 50000s;
          -webkit-text-fill-color: $color1 !important;
          -webkit-background-clip: text;
          background-clip: text;
        }
        /*Change text in autofill textbox*/
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-text-fill-color: $color1 !important;
        }
      }
      .signin-btn-wrap {
        margin: {
          top: 60px;
          left: 60px;
        }
        width: 80%;
        display: flex;
        flex-direction: column;
        button {
          -webkit-border-radius: 45px;
          -moz-border-radius: 45px;
          border-radius: 45px;
          border: 1px solid $color1;
          height: 45px;
          width: 160px;
          background-color: $color1;
          cursor: none;
          color: $color2;
          font-size: 17px;
          outline: none;
        }
      }
      .findpassword-btn-wrap {
        margin: {
          top: 5px;
          left: 10px;
        }
        width: 80%;
        display: flex;
        flex-direction: column;
        button {
          border: 0;
          padding-top: 10px;
          background-color: transparent;
          cursor: none;
          color: $color1;
          font-size: 15px;
        }
      }
    }
  }
</style>
