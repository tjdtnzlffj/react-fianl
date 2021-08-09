import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  formwrapper: {
    width: "56%",
    margin: "0 auto",
    marginTop: "5px",
  },
  inputtextbox: {
    textAlign: "center",
  },
}));

const UpdateForm = (props) => {
  const id = props.match.params.id;

  const [board, setBoard] = useState({
    postTitle: "",
    postContent: "",
    postDate: "",
    postPwd: "",
    postAuthor: "",
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/board/` + id)
      .then((res) => res.json())
      .then((res) => {
        setBoard(res);
      });
  }, []);

  const changeValue = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  const addBoard = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE}/board/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(board),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        console.log(res);
        if (res !== null) {
          props.history.push("/board/");
        } else {
          alert("게시물 수정에 실패하였습니다");
        }
      });
  };
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.inputtextbox}>
        <TextField
          type="text"
          label="제목을 입력해주세요."
          onChange={changeValue}
          name="postTitle"
          size="small"
          variant="outlined"
          style={{
            marginBottom: "15px",
            marginRight: "310px",
            marginTop: "20px",
            width: "25%",
          }}
        />
        <TextField
          type="text"
          label="비밀번호를 입력해주세요."
          onChange={changeValue}
          name="postPwd"
          size="small"
          variant="outlined"
          style={{
            marginBottom: "15px",
            marginRight: "310px",
            marginTop: "20px",
            width: "25%",
          }}
        />
        <TextField
          type="text"
          label="닉네임을 입력해주세요."
          onChange={changeValue}
          name="postAuthor"
          size="small"
          variant="outlined"
          style={{
            marginBottom: "15px",
            marginRight: "310px",
            marginTop: "20px",
            width: "25%",
          }}
        />
        <Button
          style={{ width: "7%", marginTop: "20px" }}
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
          onClick={addBoard}
        >
          저장
        </Button>
      </Box>

      <Box className={classes.formwrapper}>
        <CKEditor
          defaultValue={board.content}
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            setBoard({
              ...board,

              postContent: data,
            });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </Box>
    </div>
  );
};

export default UpdateForm;
