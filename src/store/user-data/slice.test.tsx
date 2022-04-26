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
  await store.dispatch(
    getUserData({
      userName: "",
      tenantName: "",
      type: "admin",
    })
  );
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
  mockApi.onGet("/api/user-info?tenantName=rohit&userName=rohit").reply(200, {
    username: "",
    createdTimestamp: "",
    count: 1,
    roles: [""],
  });
  await store.dispatch(
    getUserData({
      userName: "rohit",
      tenantName: "rohit",
      type: "user",
    })
  );
});

test("should give error while fetching the detail of admin", async () => {
  mockApi.onGet("/api/admin").reply(404);
  await store.dispatch(
    getUserData({
      userName: "",
      tenantName: "",
      type: "admin",
    })
  );
});
