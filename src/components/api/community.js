import axios from "axios";

const community = {
	fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/board`),
	getMatchedBoard: (id) => axios.get(`${process.env.REACT_APP_API_BASE}/board/${id}`),
	add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/board`, data),
	remove: (id) => axios.delete(`${process.env.REACT_APP_API_BASE}/board/${id}`),
	modify: (data) =>
		axios.put(`${process.env.REACT_APP_API_BASE}/board/${data.id}`, data),
	increaseLike: (data) => axios.put(`${process.env.REACT_APP_API_BASE}/like/${data.id}`, data),
};

export default community;
