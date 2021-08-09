import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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

const CommunityForm = (props) => {
  const [board, setBoard] = useState({
    postTitle: "",
    postContent: "",
    postDate: "",
    postPwd: "",
    postAuthor: "",
  });

  const changeValue = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  const addBoard = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE}/board/`, {
      method: "POST",
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
          props.history.push("/board");
        } else {
          alert("게시물 작성에 실패하였습니다");
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
          게시
        </Button>
      </Box>

      <Box className={classes.formwrapper}>
        <CKEditor
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

export default CommunityForm;
