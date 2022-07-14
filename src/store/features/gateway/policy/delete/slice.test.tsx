import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../../store/index";
import { deletePolicy } from "./slice";

test("calling the state of delete policy", async () => {
  mockApi
    .onDelete("/Policy/" + "f7764699-e83d-4971-aed3-3e508ac97d70")
    .reply(200, {});

  const result = await store.dispatch(
    deletePolicy("f7764699-e83d-4971-aed3-3e508ac97d70")
  );
  expect(result.type).toBe("api/deletepolicy/fulfilled");
});

test("calling the state of delete policy", async () => {
  mockApi
    .onDelete("/Policy/" + "f7764699-e83d-4971-aed3-3e508ac97d70")
    .reply(404, {});

  const result = await store.dispatch(
    deletePolicy("f7764699-e83d-4971-aed3-3e508ac97d70")
  );
  expect(result.type).toBe("api/deletepolicy/rejected");
});
test("calling the state of delete policy-networkError", async () => {
  mockApi
    .onDelete("/Policy/" + "f7764699-e83d-4971-aed3-3e508ac97d70")
    .networkError();

  const result = await store.dispatch(
    deletePolicy("f7764699-e83d-4971-aed3-3e508ac97d70")
  );
  expect(result.type).toBe("api/deletepolicy/rejected");
});
