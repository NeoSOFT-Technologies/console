import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../../store/index";
import { addCertificate } from "./slice";

test("calling the state of create certificate", async () => {
  mockApi.onPost("/Certificate/AddCertificate").reply(200, {});

  const result = await store.dispatch(
    addCertificate({
      name: "cert1",
    })
  );
  expect(result.type).toBe("add/certificate/fulfilled");
});

test("calling the state of create certificate", async () => {
  mockApi.onPost("/Certificate/AddCertificate").reply(404);

  const result = await store.dispatch(
    addCertificate({
      name: "cert1",
    })
  );
  expect(result.type).toBe("add/certificate/rejected");
});
