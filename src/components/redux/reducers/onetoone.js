const initialState = {
  content: [],
  page: 0,
  size: 10,
  totalElements: 0,
};

const onetoone = (state = initialState, action) => {
  switch (action.type) {
    case "MODIFY_ONETOONE_SUCCEEDED": {
      const newState = { ...state };
      newState.content = state.content.map((onetoone) =>
        onetoone.id === action.payload.id ? { ...action.payload } : onetoone
      );

      return newState;
    }

    case "FETCH_ONETOONELIST_PAGING_SUCCEEDED":
      return {
        content: action.payload.content,
        page: action.payload.number,
        size: action.payload.size,
        totalElements: action.payload.totalElements,
      };

    default:
      return state;
  }
};

export default onetoone;
