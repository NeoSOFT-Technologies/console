import store from "../index";
import { checkLoginType } from "./slice";

test("calling the state of login-type", async () => {
  await store.dispatch(checkLoginType("admin"));
});
