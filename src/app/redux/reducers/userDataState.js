const setUserData = (state = [], action) => {
  switch (action.type) {
    case "setUser":
      return action.payload;
    case "clearUser":
      return [];
    default:
      return state;
  }
};
export default setUserData;
