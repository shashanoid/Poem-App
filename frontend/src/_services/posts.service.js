import axios from "axios";

export const postService = {
  getNewPosts,
  getTopPosts
};

function getTopPosts() {
  return axios.get(`http://localhost:3000/v1/popular_stories`);
}

function getNewPosts() {
  return axios.get(`http://localhost:3000/v1/new_stories`);
}
