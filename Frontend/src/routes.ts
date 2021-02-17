import Home from "./routes/Home.svelte";
import Signin from "./routes/Sign/Signin.svelte";
import Signup from "./routes/Sign/Signup.svelte";

const routes = {
  "/": Home,
  "/signin": Signin,
  "/signup": Signup,
};

export default routes;
