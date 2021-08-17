import axios from "axios";

const community = {
  fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/board`),
  add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/board`, data),
  findKeywordData: (keyword) =>
    axios.get(
      `${process.env.REACT_APP_API_BASE}/board/search?keyword=${keyword}`
    ),

  remove: (id) => axios.delete(`${process.env.REACT_APP_API_BASE}/board/${id}`),
  modify: (data) =>
    axios.put(`${process.env.REACT_APP_API_BASE}/board/${data.id}`, data),
};

export default community;
