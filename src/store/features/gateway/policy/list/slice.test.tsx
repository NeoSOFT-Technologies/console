import mockApi from "../../../../../resources/gateway/testconfig";
import store from "../../../../index";
import { getPolicyList } from "./slice";

test("calling the state of policy list", async () => {
  mockApi.onGet("/Policy?pageNum=1&pageSize=1").reply(200, {
    Data: {
      Policies: {
        Name: "Policy1",
        State: "Active",
        AuthType: "standard",
      },
    },
  });

  const result = await store.dispatch(
    getPolicyList({ currentPage: 1, pageSize: 1 })
  );
  expect(result.type).toBe("policy/list/fulfilled");
});

test("calling the state of policy list", async () => {
  mockApi.onGet("/Policy?pageNum=1&pageSize=1").reply(400);

  const result = await store.dispatch(
    getPolicyList({ currentPage: 1, pageSize: 1 })
  );
  expect(result.type).toBe("policy/list/rejected");
});
