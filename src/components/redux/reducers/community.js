const initialState = [
	{
		id: '',
		postAuthor: '',
		postContent: '',
		postDate: '',
		postImage: '',
		postPwd: '',
		postTitle: '',
		postLike: '',
	},
];

const community = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_SUCCEEDED_BOARDLIST":
			return action.payload;
		case "FIND_SUCCEEDED_POST":
			return action.payload;
		default:
			return state;
	}
}

export default community;