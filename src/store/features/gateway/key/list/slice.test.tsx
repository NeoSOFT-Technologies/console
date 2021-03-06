import mockApi from "../../../../../resources/gateway/testconfig";
import store from "../../../../index";
import { getKeyList } from "./slice";

const getAllKeysUrl = "/Key/GetAllKeys?pageNum1&pageSize=1";

test("calling the state of key list", async () => {
  mockApi.onGet(getAllKeysUrl).reply(200, {
    Data: {
      Keys: {
        KeyName: "key1",
        CreatedDate: "20/06/2022",
        IsActive: true,
        Id: "cafffebd-aee7-417a-a651-085f3cef622a",
      },
    },
  });
});

test("calling the state of api list", async () => {
  mockApi.onGet(getAllKeysUrl).reply(400);
  const result = await store.dispatch(
    getKeyList({ currentPage: 1, pageSize: 1 })
  );
  expect(result.type).toBe("key/list/rejected");
});

test("calling the state of api list-networkError", async () => {
  mockApi.onGet(getAllKeysUrl).networkError();
  const result = await store.dispatch(
    getKeyList({ currentPage: 1, pageSize: 1 })
  );
  expect(result.type).toBe("key/list/rejected");
});
