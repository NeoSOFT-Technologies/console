const setTenantLogin = (state = false, action) => {
  switch (action.type) {
    case "TenantLoginSuccess":
      return true;
    case "TenantLoginFailure":
      return false;
    default:
      return state;
  }
};
export default setTenantLogin;
