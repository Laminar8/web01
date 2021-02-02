<script lang="typescript">
  import { link } from "svelte-spa-router";
</script>

<column1 class="item">
  <div class="box">
    <a href="/" use:link>Home </a>
  </div>
  <div class="test">
    <form>
      <label for="fname">First name:</label>
      <input type="text" id="fname" name="fname" /><br /><br />
      <label for="lname">Last name:</label>
      <input type="text" id="lname" name="lname" /><br /><br />
      <input type="submit" id="login" name="login" value="로그인" />
    </form>
  </div>
</column1>
