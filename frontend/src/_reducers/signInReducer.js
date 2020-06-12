export default signInReducer = (state = {}, action) => {
    switch (action.type) {
      case "SIGN_IN":
        return { ...state, token: action.payload };
      default:
        return state;
    }
  };
  