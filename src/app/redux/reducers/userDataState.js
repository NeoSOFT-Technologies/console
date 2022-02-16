const setUserData = (state = null, action) => {
  switch (action.type) {
    case "setUser":
      return action.payload;
    case "clearUser":
      return null;
    default:
      return state;
  }
};
export default setUserData;
