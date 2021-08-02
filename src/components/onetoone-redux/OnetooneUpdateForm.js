import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";

import { Button, Divider, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";

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

const UpdateForm = (props) => {
  const id = props.match.params.id;

  const classes = useStyles();

  const [onetoone, setOnetoone] = useState({
    qnaTitle: "",
    qnaContent: "",
    qnaPwd: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/onetoone/" + id)
      .then((res) => res.json())
      .then((res) => {
        setOnetoone(res);
      });
  }, []);

  const changeValue = (e) => {
    setOnetoone({
      ...onetoone,
      [e.target.name]: e.target.value,
    });
  };

  const submitOnetoone = (e) => {
    e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.
    fetch("http://localhost:8080/onetoone/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(onetoone),
    })
      .then((res) => {
        console.log(1, res);
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          props.history.push("/onetoone");
        } else {
          alert("게시글 등록에 실패했습니다.");
        }
      });
  };

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
                variant="outlined"
                fullWidth
                required
                onChange={changeValue}
                name="qnaTitle"
                value={onetoone.qnaTitle}
              />
              <h3>글쓴이</h3>
              <TextField
                className={classes.field}
                variant="outlined"
                fullWidth
                required
                onChange={changeValue}
                name="qnaAuthor"
                value={onetoone.qnaAuthor}
              />
              <h3>내용</h3>
              <TextField
                className={classes.field}
                variant="outlined"
                multiline
                rows={16}
                fullWidth
                required
                onChange={changeValue}
                name="qnaContent"
                value={onetoone.qnaContent}
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
                variant="outlined"
                required
                onChange={changeValue}
                name="qnaPwd"
              />
            </form>
            <Divider style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "90%" }}
              onClick={submitOnetoone}
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
export default UpdateForm;
