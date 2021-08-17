import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
// import ReactHtmlParser from "react-html-parser";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const CommunityDetail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = props.match && props.match.params.id;
  console.log(id);

  const [board, setBoard] = useState({
    id: "",
    postTitle: "",
    postContent: "",
    postDate: "",
    postImage: "",
    postLike: "",
    postPwd: "",
  });

  const remove = () => {
    const InputpwdTest = prompt("비밀번호를 입력하세요");
    if (parseInt(InputpwdTest) === parseInt(board.postPwd)) {
      dispatch({ type: "REMOVE_BOARD", payload: id }, history.push("/board"));
      alert("삭제되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/board/` + id)
      .then((res) => res.json())
      .then((res) => {
        setBoard(res);
      });
  }, []);

  const updateBoard = () => {
    props.history.push("/CommunityUpdateForm/" + id);
  };

  return (
    <div>
      <hr />
      <h2>{board.postTitle}</h2>
      <h4>{board.postContent}</h4>
      <div>
        <Button
          variant="outlined"
          onClick={updateBoard}
          style={{ marginRight: "10px" }}
        >
          수정
        </Button>
        <Button variant="outlined" onClick={remove}>
          삭제
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            history.push("/board");
          }}
          style={{ marginLeft: "1230px" }}
        >
          목록
        </Button>
      </div>
    </div>
  );
};

export default CommunityDetail;
