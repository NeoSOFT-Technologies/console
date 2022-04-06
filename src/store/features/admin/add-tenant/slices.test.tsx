import MockAdapter from "axios-mock-adapter";

import store from "../../../../store/index";
import ApiFactory from "../../../../utils/api";
import { addNewTenant } from "./slice";
const getListResponse = {
  tenantName: "deepthi",
  email: "d@gmail.com",
  password: "deepthi@1",
  description: "sdfgh",
  databaseName: "xdcfvg",
  databaseDescription: "dcfvgh",
  createdDateTime: "rty",
  isDeleted: false,
  roles: ["d", "e"],
  permissions: ["d", "y"],
  id: 1,
  type: "admin",
};
const mock = new MockAdapter(ApiFactory());
const mockNetworkResponse = () => {
  mock.onGet("/registertenant").reply(200, getListResponse);
};

describe("Games redux state tests", () => {
  beforeAll(() => {
    mockNetworkResponse();
  });
  test("calling the state of add-tenant", () => {
    let state = store.getState().addNewTenant;

    expect(state.loading).toBeFalsy();

    store.dispatch(addNewTenant(getListResponse));

    state = store.getState().addNewTenant;
    if (state.loading === false) {
      expect(state.tenantAdded).toBeTruthy();
    }
  });
});
