const setAdminLogin = (state = false, action) => {
  switch (action.type) {
    case "AdminLoginSuccess":
      return true;
    case "AdminLoginFailure":
      return false;
    default:
      return state;
  }
};
export default setAdminLogin;
