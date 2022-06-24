import mockApi from "../../../../../resources/gateway/testconfig";
import store from "../../../../index";
import { getAllCertificate } from "./slice";

test("calling the state of certificate list", async () => {
  mockApi.onGet("/Certificate/GetAllCertificates").reply(200, {
    Data: {
      Name: "cert1",
    },
  });

  const result = await store.dispatch(getAllCertificate());
  expect(result.type).toBe("get/certificate/fulfilled");
});

test("calling the state of certificate list", async () => {
  mockApi.onGet("/Certificate/GetAllCertificates").reply(404, {
    Data: {
      Name: "cert1",
    },
  });
  const result = await store.dispatch(getAllCertificate());
  expect(result.type).toBe("get/certificate/rejected");
});
