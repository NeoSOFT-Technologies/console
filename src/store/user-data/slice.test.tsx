import store from "../../store/index";
import { getUserData } from "./slice";

test("calling the state of user-data", async () => {
  let state = store.getState().userData;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    getUserData({
      userName: "deepthi",
      tenantName: "paras",
      type: "tenant",
    })
  );

  state = store.getState().userData;
});
