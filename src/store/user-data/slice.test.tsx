import mockApi from "../../resources/tenant/testconfig";
import store from "../index";
import { getUserData } from "./slice";

test("should fetch the detail of admin", async () => {
  mockApi.onGet("/api/admin").reply(200, {
    username: "",
    createdTimestamp: "",
    count: 1,
    roles: [""],
  });
  const result = await store.dispatch(
    getUserData({
      userName: "",
      tenantName: "",
      type: "admin",
    })
  );
  expect(result.type).toBe("user/data/fulfilled");
});

test("calling the state of user-data", async () => {
  await store.dispatch(
    getUserData({
      userName: "deepthi",
      tenantName: "paras",
      type: "tenant",
    })
  );
});

test("should fetch the detail of user", async () => {
  mockApi
    .onGet("/api/user-info?tenantName=Tenant2&userName=tenantadmin")
    .reply(200, {
      username: "",
      createdTimestamp: "",
      count: 1,
      roles: [""],
    });
  const result = await store.dispatch(
    getUserData({
      userName: "tenantadmin",
      tenantName: "Tenant2",
      type: "user",
    })
  );
  expect(result.type).toBe("user/data/fulfilled");
});

test("should give error while fetching the detail of admin", async () => {
  mockApi.onGet("/api/admin").reply(404);
  const result = await store.dispatch(
    getUserData({
      userName: "",
      tenantName: "",
      type: "admin",
    })
  );
  expect(result.type).toBe("user/data/rejected");
});
