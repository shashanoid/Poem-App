export default testReducer = (state = {}, action) => {
    switch (action.type) {
      case "TEST_ACTION":
        return { ...state, token: action.payload };
      default:
        return state;
    }
  };
  