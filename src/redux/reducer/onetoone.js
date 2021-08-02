// 리듀서는 state와 action이라는 매개변수를 받아서 state를 변경해줌
// state는 이전 state의 값(이전 상태의 값, 객체)
// action은 컴포넌트 -> 디스패처로부터 전달받은 액션 객체
// redux를 적용할 때 가장 먼저 리듀서부터 만듦

const initialState = [];

const onetoone = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ONETOONE_SUCCEEDED":
      return [{ ...action.payload }, ...state];

    case "REMOVE_ONETOONE_SUCCEEDED":
      return state.filter((onetoone) => onetoone.qnaNum !== action.payload);

    case "MODIFY_ONETOONE_SUCCEEDED":
      return state.map((onetoone) =>
        onetoone.qnaNum === action.payload.qnaNum
          ? { ...action.payload }
          : onetoone
      );

    case "FETCH_ONETOONELIST_SUCCEEDED":
      return [...action.payload];

    default:
      return state;
  }
};

export default onetoone;
