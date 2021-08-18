const initialState = [
	{
		id: "",
		postAuthor: "",
		postContent: "",
		postDate: "",
		postImage: "",
		postPwd: "",
		postTitle: "",
		postLike: "",
	},
];

const community = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_SUCCEEDED_BOARDLIST":
			return action.payload;
		case "ADD_BOARD_SUCCEEDED":
			return [action.payload, ...state];
		case "REMOVE_BOARD_SUCCEEDED":
			return state.filter((board) => board.id !== action.payload);
		case "MODIFY_BOARD_SUCCEEDED": {
			return state.map((board) =>
				board.id === action.payload.id ? action.payload : board
			);
		}
		default:
			return state;
	}
};

export default community;
