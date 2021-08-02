import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";

import { Button, Divider, Typography } from "@material-ui/core";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

// import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formRoot: {
    display: "flex",
    height: theme.typography.fontSize * 2,
  },
  paper: {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
  },

  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "20px",
    },
  },

  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    width: "90%",
  },
}));

const SaveForm = () => {
  const classes = useStyles();

  const inputTitleRef = useRef();
  const inputContentRef = useRef();
  const inputPwdRef = useRef();
  const inputAuthorRef = useRef();

  const history = useHistory();

  const dispatch = useDispatch();

  const add = () => {
    const qnaTitle = inputTitleRef.current.value;
    const qnaContent = inputContentRef.current.value;
    const qnaPwd = inputPwdRef.current.value;
    const qnaAuthor = inputAuthorRef.current.value;

    dispatch({
      type: "ADD_ONETOONE",
      payload: {
        qnaTitle,
        qnaAuthor,
        qnaPwd,
        qnaContent,
      },
    });
    history.push("/onetoone");
  };

  // const [onetoone, setOnetoone] = useState({
  //   qnaTitle: "",
  //   qnaContent: "",
  //   qnaPwd: "",
  //   qnaAuthor: "",
  // });

  // const changeValue = (e) => {
  //   setOnetoone({
  //     ...onetoone,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const submitOnetoone = (e) => {
  //   e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.
  //   fetch("http://localhost:8080/onetoone", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify(onetoone),
  //   })
  //     .then((res) => {
  //       console.log(1, res);
  //       if (res.status === 200) {
  //         return res.json();
  //       } else {
  //         return null;
  //       }
  //     })
  //     .then((res) => {
  //       if (res !== null) {
  //         props.history.push("/onetoone");
  //       } else {
  //         alert("게시글 등록에 실패했습니다.");
  //       }
  //     });
  // };

  return (
    <>
      <Grid container spacing={1} className={classes.container}>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
        <Grid item xs={12} sm={10} md={8} lg={10}>
          <Paper className={classes.paper}>
            <Typography variant="h5">1:1 QnA</Typography>
            <Divider style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <form className={classes.root} noValidate autoComplete="off">
              <h3>제목</h3>
              <TextField
                className={classes.field}
                label="제목을 입력하세요."
                variant="outlined"
                fullWidth
                required
                inputRef={inputTitleRef}
                name="qnaTitle"
              />
              <h3>글쓴이</h3>
              <TextField
                className={classes.field}
                label="닉네임을 입력하세요."
                variant="outlined"
                fullWidth
                required
                inputRef={inputAuthorRef}
                name="qnaAuthor"
              />
              <h3>내용</h3>
              <TextField
                className={classes.field}
                label="내용을 입력하세요."
                variant="outlined"
                multiline
                rows={16}
                fullWidth
                required
                inputRef={inputContentRef}
                name="qnaContent"
              />
              <h3>사진</h3>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: "10%" }}
              >
                찾기
              </Button>
              <h3>비밀번호</h3>
              <TextField
                className={classes.field}
                label="비밀번호를 입력하세요."
                variant="outlined"
                required
                inputRef={inputPwdRef}
                name="qnaPwd"
              />
            </form>
            <Divider style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "90%" }}
              onClick={add}
            >
              저장
            </Button>
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
      </Grid>
    </>
  );
};

export default SaveForm;
