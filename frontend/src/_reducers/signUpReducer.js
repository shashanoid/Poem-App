export default signUpReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
