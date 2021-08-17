const initialState = [{
	no: '',
	content: '',
	pwd: '',
	postNo: '',
}];
//"commentNum":17,"postNum":0,"commentContent":"덧글 입력 체크","commentAuthor":null,"commentPwd":"12345"
const comment = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_COMMENTLIST_SUCCEEDED":
			return [...action.payload];
		case "ADD_COMMENT_SUCCEEDED":
			return [action.payload, ...state];
		case "MODIFY_SUCCEDED_COMMENT":
			return state.map(comment => comment.no === action.payload.no ? action.payload : comment);
		case "DELETE_SUCCEEDED_COMMENT":
			return state.filter(comment => comment.no !== action.payload);
		default:
			return state;
	}
}
export default comment;