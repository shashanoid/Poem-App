export default testReducer = (state = {}, action) => {
    switch (action.type) {
      case "TEST_ACTION":
        debugger
        return { ...state, token: action.payload };
      default:
        return state;
    }
  };
  