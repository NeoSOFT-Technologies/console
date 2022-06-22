import mockApi from "../../../../../resources/gateway/testconfig";
import store from "../../../../index";
import { getApiList } from "./slice";

test("calling the state of api list", async () => {
  mockApi.onGet("/ApplicationGateway?pageNum=1&pageSize=1").reply(200, {
    Data: {
      Apis: {
        Name: "api1",
        TargetUrl: "https://httpbin.org",
        IsActive: true,
      },
    },
  });

  const result = await store.dispatch(
    getApiList({ currentPage: 1, pageSize: 1 })
  );
  expect(result.type).toBe("api/list/fulfilled");
});

test("calling the state of api list", async () => {
  mockApi.onGet("/ApplicationGateway?pageNum=1&pageSize=1").reply(400);

  const result = await store.dispatch(
    getApiList({ currentPage: 1, pageSize: 1 })
  );
  expect(result.type).toBe("api/list/rejected");
});
