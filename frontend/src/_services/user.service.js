import axios from "axios";

export const userService = {
  SignUp,
  SignIn,
};

async function SignUp(username, email, password) {
  try {
    let res = await axios.post("http://localhost:3000/v1/users", {
      user: {
        username: username,
        email: email,
        password: password,
        password_confirmation: password,
      },
    });
    let data = res.data;
    return data;
  } catch (error) {
    let data = error.response.data;
    console.log(error.response); // this is the main part. Use the response property from the error object
    return error.response;
  }
}

async function SignIn(email, password) {
  // sing in
  try {
    let res = await axios.post("http://localhost:3000/v1/login", {
      email: email,
      password: password
    });
    let data = res.data;
    return data;
  } catch (error) {
    let data = error.response.data;
    console.log(error.response); // this is the main part. Use the response property from the error object
    return error.response;
  }
}
