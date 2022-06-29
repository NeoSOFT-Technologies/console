import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../../store/index";
import { deleteKey } from "./slice";

test("calling the state of delete key", async () => {
  mockApi
    .onDelete("Key/DeleteKey?keyId= " + "f7764699-e83d-4971-aed3-3e508ac97d70")
    .reply(200, {});

  //   const result = await store.dispatch(
  //     deleteKey("f7764699-e83d-4971-aed3-3e508ac97d70")
  //   );
  //   expect(result.type).toBe("api/deletekey/fulfilled");
});

test("calling the state of delete key", async () => {
  mockApi
    .onDelete("Key/DeleteKey?keyId= " + "f7764699-e83d-4971-aed3-3e508ac97d70")
    .reply(404, {});

  const result = await store.dispatch(
    deleteKey("f7764699-e83d-4971-aed3-3e508ac97d70")
  );
  expect(result.type).toBe("api/deletekey/rejected");
});
