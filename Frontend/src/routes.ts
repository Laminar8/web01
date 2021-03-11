// Import the wrap method
import { wrap } from "svelte-spa-router/wrap";
import Home from "./routes/Home.svelte";
import Error from "./routes/Error.svelte";
import Signin from "./routes/Sign/Signin.svelte";
import Signup from "./routes/Sign/Signup.svelte";

const routes = {
  "/": Home,
  "/signin": Signin,
  "/signup": Signup,
  "/chat/:day": wrap({
    asyncComponent: () => import("./routes/Chat/Chat.svelte"),
  }),

  // Catch-all
  // This is optional, but if present it must be the last
  "*": Error,
};

export default routes;
