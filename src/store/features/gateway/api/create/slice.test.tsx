import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../../store/index";
import { addNewApi } from "./slice";

test("calling the state of create api", async () => {
  mockApi.onPost("/ApplicationGateway/CreateApi").reply(200, {});

  const result = await store.dispatch(
    addNewApi({
      name: "api1",
      targetUrl: "https://httpbin.org",
      listenPath: "/get/",
      isActive: true,
    })
  );
  expect(result.type).toBe("api/createapi/fulfilled");
});

test("calling the state of create api", async () => {
  mockApi.onPost("/ApplicationGateway/CreateApi").reply(404);

  const result = await store.dispatch(
    addNewApi({
      name: "api1",
      targetUrl: "https://httpbin.org",
      listenPath: "/get",
      isActive: true,
    })
  );
  expect(result.type).toBe("api/createapi/rejected");
});
test("calling the state of create api-networkError", async () => {
  mockApi.onPost("/ApplicationGateway/CreateApi").networkError();

  const result = await store.dispatch(
    addNewApi({
      name: "api1",
      targetUrl: "https://httpbin.org",
      listenPath: "/get",
      isActive: true,
    })
  );
  expect(result.type).toBe("api/createapi/rejected");
});
