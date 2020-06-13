export default userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DATA":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
