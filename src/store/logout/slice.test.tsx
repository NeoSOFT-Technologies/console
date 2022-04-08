import store from "../../store/index";
import { commonLogout } from "./slice";

test("calling the state of logout", async () => {
  let state = store.getState().logoutState;

  expect(state.loading).toBeFalsy();

  await store.dispatch(commonLogout());

  state = store.getState().logoutState;
});
