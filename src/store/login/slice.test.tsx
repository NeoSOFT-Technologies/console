import store from "../../store/index";
import { commonLogin } from "./slice";

test("calling the state of login", async () => {
  let state = store.getState().loginAccessToken;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    commonLogin({
      userName: "deepthi",
      password: "deepti@1",
      tenantName: "paras",
    })
  );

  state = store.getState().loginAccessToken;
});
