import store from "../../store/index";
import { checkLoginType } from "./slice";

test("calling the state of login-type", async () => {
  let state = store.getState().loginType;

  expect(state.loading).toBeFalsy();

  await store.dispatch(checkLoginType("admin"));

  state = store.getState().loginType;
});
