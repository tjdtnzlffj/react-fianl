import axios from "axios";

const managerApi = {
	fetchManagerInfo: () => axios.get(`${process.env.REACT_APP_API_BASE}/contact-us`),
}

export default managerApi;