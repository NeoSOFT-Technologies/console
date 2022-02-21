const setTenantList = (state = { list: [], count: 0 }, action) => {
  switch (action.type) {
    case "getTenants":
      return action.payload;
    default:
      return state;
  }
};
export default setTenantList;
