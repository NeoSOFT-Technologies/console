import mockApi from "../../../../resources/testconfig";
import store from "../../../index";
import { createNewPolicy } from "./slice";

const response = {
  tenantName: "deepthi",
  policyType: "Role",
  clientName: "my-nest-application",
  policyDetails: { name: "default", description: "deafult-desc" },
};

// {tenantName:"deepthi",policyType:"Role",clientName:"my-nest-application",policyDetails:{name:"default",description:"deafult-desc"},}
test("calling the state of add-tenant", async () => {
  mockApi.onPost("/api/policy").reply(200, {});

  await store.dispatch(
    createNewPolicy({
      tenantName: "deepthi",
      policyName: "default",
      description: "deafult-desc",
      roles: ["user", "tenantadmin"],
    })
  );
});

test("calling the state of add-tenant", async () => {
  mockApi.onPost("/api/policy").reply(404, response);

  await store.dispatch(
    createNewPolicy({
      tenantName: "deepthi",
      policyName: "default",
      description: "deafult-desc",
      roles: ["user", "tenantadmin"],
    })
  );
});
