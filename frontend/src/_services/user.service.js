import axios from "axios";

export const userService = {
  SignUp,
  SignIn,
  getUserInfo,
};

async function getUserInfo(token) {
  try {
    let res = await axios.get(`http://localhost:3000/v1/user_info`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    let data = res.data.user;
    return data;
  } catch (error) {
    return error.response;
  }
}

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
    return error.response;
  }
}

async function SignIn(email, password) {
  try {
    let res = await axios.post("http://localhost:3000/v1/login", {
      email: email,
      password: password,
    });
    let data = res.data;
    return data;
  } catch (error) {
    return error.response;
  }
}
