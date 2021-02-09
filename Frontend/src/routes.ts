import Home from "./routes/Home.svelte";
import Signin from "./routes/Sign/Signin.svelte";

const routes = {
  "/": Home,
  "/signin": Signin,
};

export default routes;
