// Import the wrap method
import { wrap } from "svelte-spa-router/wrap";
import Home from "./routes/Home.svelte";
import Error from "./routes/Error.svelte";
import Signin from "./routes/Sign/Signin.svelte";
import Signup from "./routes/Sign/Signup.svelte";
import Chat from "./routes/Chat/Chat.svelte";

const routes = {
  "/": Home,
  "/signin": Signin,
  "/signup": Signup,
  "/chat/:date": Chat,

  // Catch-all
  // This is optional, but if present it must be the last
  "*": Error,
};

export default routes;
