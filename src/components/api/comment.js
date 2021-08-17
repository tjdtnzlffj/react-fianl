import axios from "axios";
//{ postNo, content: commentRef.current.value, pwd: pwdInput }
const comment = {
	fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/comment`),
	add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/comment/${data.postNo}`, data),
	modify: (data) => axios.put(`${process.env.REACT_APP_API_BASE}/comment/${data.no}`, data),
	delete: (commentNo) => axios.delete(`${process.env.REACT_APP_API_BASE}/comment/${commentNo}`),
}
export default comment;