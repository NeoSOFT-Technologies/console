import mockApi from "../../../../resources/testconfig";
import store from "../../../index";
import { getTenantList } from "./slice";

const response = {
  data: [
    {
      id: 1,
      tenantName: "",
      email: "",
      password: "",
      description: "",
      databaseName: "",
      databaseDescription: "",
      createdDateTime: "",
      isDeleted: "",
      clientId: "",
      clientSecret: "",
    },
  ],
  count: 1,
};

test("calling the state of tenant-list", async () => {
  mockApi.onGet("/api/tenants?page=2").reply(200, {});
  await store.dispatch(getTenantList({ currentPage: 2 }));
});

test("calling the state of tenant-list", async () => {
  mockApi.onGet("/api/tenants?page=2").reply(404, response);
  await store.dispatch(getTenantList({ currentPage: 2 }));
});
