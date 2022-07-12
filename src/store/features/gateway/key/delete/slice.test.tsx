import mockApi from "../../../../../resources/gateway/testconfig";
import store from "../../../../../store/index";
import { deleteKey } from "./slice";
test("calling the state of delete key", async () => {
  mockApi
    .onDelete("Key/DeleteKey?keyId=" + "9dd100136a6a4e00af04bcece0eb1c8a")
    .reply(200, {});

  const result = await store.dispatch(
    deleteKey("9dd100136a6a4e00af04bcece0eb1c8a")
  );
  expect(result.type).toBe("api/deletekey/fulfilled");
});

test("calling the state of delete key", async () => {
  mockApi
    .onDelete("Key/DeleteKey?keyId=" + "9dd100136a6a4e00af04bcece0eb1c8a")
    .reply(404, "Entity (9dd100136a6a4e00af04bcece0eb1c8a) is not found");

  const result = await store.dispatch(
    deleteKey("9dd100136a6a4e00af04bcece0eb1c8a")
  );
  expect(result.type).toBe("api/deletekey/rejected");
});
test("calling the state of delete key- internal server error", async () => {
  mockApi.onDelete("Key/DeleteKey?keyId=").networkError();
  const result = await store.dispatch(deleteKey(""));
  expect(result.type).toBe("api/deletekey/rejected");
});
