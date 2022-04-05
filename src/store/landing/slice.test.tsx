import store from "../../store/index";
import { getLandingPageDetails } from "./slice";

test("calling the state of landing", async () => {
  let state = store.getState().landing;

  expect(state.loading).toBeFalsy();

  await store.dispatch(getLandingPageDetails());

  state = store.getState().landing;
});
