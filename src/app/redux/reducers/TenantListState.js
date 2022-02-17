const setTenantList = (state = [], action) => {
  switch (action.type) {
    case "getTenants":
      return [...action.payload];
    default:
      return state;
  }
};
export default setTenantList;
