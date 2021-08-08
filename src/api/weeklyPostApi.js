import axios from "axios";

const weeklyPostApi = {
	fetchWeeklyBest: () => axios.get(`${process.env.REACT_APP_API_BASE}/home`),
}

export default weeklyPostApi;