import { combineReducers } from "redux";
import testReducer from "./testReducer";
import signInReducer from "./signInReducer";
import signUpReducer from "./signUpReducer";

export default combineReducers({
  test: testReducer,
  signUp: signUpReducer,
  signIn: signInReducer,

});
