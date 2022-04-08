import mockApi from "../../../../resources/testconfig";
import store from "../../../index";
import { getUserDetails } from "./slice";

test("calling the state of user-details", async () => {
  mockApi
    .onGet("/api/user-info?tenantName=deepthi&userName=deepthi")
    .reply(200, {});

  await store.dispatch(
    getUserDetails({ tenantName: "deepthi", userName: "deepthi" })
  );
});

test("calling the state of user-details", async () => {
  mockApi
    .onGet("/api/user-info?tenantName=deepthi&userName=deepthi")
    .reply(404);

  await store.dispatch(
    getUserDetails({ tenantName: "deepthi", userName: "deepthi" })
  );
});
