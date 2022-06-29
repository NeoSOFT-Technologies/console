import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../../store/index";
import { deleteApi } from "./slice";

test("calling the state of delete api", async () => {
  mockApi
    .onDelete("/ApplicationGateway/" + "f7764699-e83d-4971-aed3-3e508ac97d70")
    .reply(200, {});

  const result = await store.dispatch(
    deleteApi("f7764699-e83d-4971-aed3-3e508ac97d70")
  );
  expect(result.type).toBe("api/deleteapi/fulfilled");
});

test("calling the state of create api", async () => {
  mockApi
    .onDelete("/ApplicationGateway/" + "f7764699-e83d-4971-aed3-3e508ac97d70")
    .reply(404, {});

  const result = await store.dispatch(
    deleteApi("f7764699-e83d-4971-aed3-3e508ac97d70")
  );
  expect(result.type).toBe("api/deleteapi/rejected");
});
