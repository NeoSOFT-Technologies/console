import store from "../../../../store/index";
import { getUserDetails } from "./slice";

test("calling the state of user-details", async () => {
  let state = store.getState().userDetails;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    getUserDetails({ tenantName: "deepthi", userName: "deepthi" })
  );

  state = store.getState().userDetails;
});
