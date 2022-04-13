import mockApi from "../../../../resources/testconfig";
import store from "../../../index";
import { getTenantUserList } from "./slice";

const response = {};

test("calling the state of tenant-user-list", async () => {
  mockApi
    .onGet("/api/user?tenantName=deepthi&page=2&userName=deepthi")
    .reply(200, {});
  await store.dispatch(
    getTenantUserList({
      tenantName: "deepthi",
      userName: "deepthi",
      currentPage: 2,
    })
  );
});

test("calling the state of tenant-user-list", async () => {
  mockApi
    .onGet("/api/user?tenantName=deepthi&page=2&userName=deepthi")
    .reply(404, response);
  await store.dispatch(
    getTenantUserList({
      tenantName: "deepthi",
      userName: "deepthi",
      currentPage: 2,
    })
  );
});
