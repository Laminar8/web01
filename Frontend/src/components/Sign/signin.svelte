<script lang="typescript">
  // import { link } from "svelte-spa-router";
</script>

<centerContainer class="item">
  <!-- <div class="box">
    <a href="/" use:link>Home </a>
  </div> -->
  <div class="test">
    <form action="http://localhost:4000/v1/signin" method="POST">
      <div>
        <label>Username:</label>
        <input type="text" name="username" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
  </div>
</centerContainer>
