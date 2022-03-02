const setTenantUserList = (state = { list: [], count: 0 }, action) => {
  switch (action.type) {
    case "getTenantUser":
      return action.payload;
    default:
      return state;
  }
};
export default setTenantUserList;
