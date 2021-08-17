const initialState = { modalState: false, renderingComponent: '' }

const etc = (state = initialState, action) => {
	switch (action.type) {
		case "CLOSE_MODAL":
			return action.payload;
		case "OPEN_MODAL":
			return action.payload;
		default:
			return state;
	}
}

export default etc;