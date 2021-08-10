import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useHistory } from "react-router-dom";

const CommunityDetail = (props) => {
  const history = useHistory();
  console.log(1, props);
  const id = props.match.params.id;

  const [board, setBoard] = useState({
    id: "",
    postTitle: "",
    postContent: "",
    postPwd: "",
    postDate: "",
    postAuthor: "",
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/board/` + id)
      .then((res) => res.json())
      .then((res) => {
        setBoard(res);
      });
  }, [id]);

  const removeBoard = () => {
    const InputpwdTest = prompt("비밀번호를 입력하세요");
    if (parseInt(InputpwdTest) === parseInt(board.postPwd)) {
      fetch(`${process.env.REACT_APP_API_BASE}/board/` + id, {
        method: "DELETE",
      })
        .then((res) => res.text())
        .then((res) => {
          props.history.push("/board");
        });
      alert("삭제되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const updateBoard = () => {
    const InputpwdTest = prompt("비밀번호를 입력하세요");
    if (parseInt(InputpwdTest) === parseInt(board.postPwd)) {
      props.history.push("/CommunityUpdateForm/" + id);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div>
      <h1>게시물{id}</h1>
      <Button
        variant="outlined"
        onClick={updateBoard}
        style={{ marginRight: "10px" }}
      >
        수정
      </Button>
      <Button variant="outlined" onClick={removeBoard}>
        삭제
      </Button>
      <hr />
      <h2>{board.postTitle}</h2>
      <h2>
        {board.postDate}
        <br /> {board.postAuthor}
      </h2>
      <h4>{ReactHtmlParser(board.postContent)}</h4>
      <div>
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
