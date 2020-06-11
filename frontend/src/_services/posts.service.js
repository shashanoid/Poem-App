import axios from "axios";

export const postService = {
  getNewPosts,
};

function getNewPosts() {
  return axios.get(`http://localhost:3000/v1/popular_stories`);
}
