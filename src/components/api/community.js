import axios from "axios";

const community = {
	fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/board`),
	findKeywordData: (keyword) => axios.get(`${process.env.REACT_APP_API_BASE}/board/search?keyword=${keyword}`),
}

export default community;