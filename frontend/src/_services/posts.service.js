import axios from "axios";

export const postService = {
  getNewPosts,
  getTopPosts,
  CreateNewPost,
};

function getTopPosts() {
  return axios.get(`http://localhost:3000/v1/popular_stories`);
}

function getNewPosts() {
  return axios.get(`http://localhost:3000/v1/new_stories`);
}

async function CreateNewPost(formdata, token) {
  try {
    let res = await axios.post("http://localhost:3000/v1/stories", formdata, {
      headers: {
        Authorization: token,
      },
    });

    let data = res.data;
    return data;
  } catch (error) {
    return error.response;
  }
}
