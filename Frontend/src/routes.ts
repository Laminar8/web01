// Import the wrap method
import { wrap } from "svelte-spa-router/wrap";
import Error from "./routes/Error.svelte";
import Signin from "./routes/Sign/Signin.svelte";

const routes = {
  "/": Signin,
  "/signin": Signin,
  "/chat/:day": wrap({
    asyncComponent: () => import("./routes/Chat/Chat.svelte"),
  }),

  // Catch-all
  // This is optional, but if present it must be the last
  "*": Error,
};

export default routes;
