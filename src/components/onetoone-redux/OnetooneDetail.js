import React, { useEffect, useState } from "react";
import {
  Grid,
  Hidden,
  Paper,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const useStyels = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
    marginTop: "20px",
  },

  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "20px",
    },
  },
  btn: {
    marginLeft: "5px",
  },
}));

const OnetooneDetail = (props) => {
  const classes = useStyels();

  const history = useHistory();
  const dispatch = useDispatch();

  const remove = () => {
    const InputpwdTest = prompt("비밀번호를 입력하세요");
    if (parseInt(InputpwdTest) === parseInt(onetoone.qnaPwd)) {
      dispatch(
        { type: "REMOVE_ONETOONE", payload: id },
        history.push("/onetoone")
      );
      alert("삭제되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const id = props.match.params.id;

  const [onetoone, setOnetoone] = useState({
    id: "",
    qnaTitle: "",
    qnaAuthor: "",
    qnaContent: "",
    qnaDate: "",
    qnaState: "",
    qnaPic: "",
    answerPwd: "",
    answer: [
      { answerContent: "", answerTitle: "", answerPic: "", answerDate: "" },
      {},
    ],
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/onetoone/` + id)
      .then((res) => res.json())
      .then((res) => {
        setOnetoone(res);
      });
  }, [id]);

  console.log("--onetoone data-");
  console.log(onetoone);

  // const [answer, setAnswer] = useState({
  //   answer: [{answerContent:"", answerTitle: "", answerPic: "", boardId: ""}, {}],
  // });

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_BASE}/onetoone/` + answer.boardId + `/answer`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setAnswer(res);
  //     });
  // }, [id]);

  const updateOne = () => {
    const InputpwdTest = prompt("비밀번호를 입력하세요");
    if (parseInt(InputpwdTest) === parseInt(onetoone.qnaPwd)) {
      props.history.push("/updateForm/" + id);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const answerOne = () => {
    const InputPwdTest = prompt("관리자 번호를 입력하세요");
    if (parseInt(InputPwdTest) === parseInt(onetoone.answerPwd)) {
      history.push("/answerForm/" + id);
    } else {
      alert("관리자 번호가 일치하지 않습니다.");
    }
  };

  function AnswerTitle() {
    return onetoone.answer[0] === undefined || null ? (
      <h3>답변 대기중</h3>
    ) : (
      <h1 style={{ textAlign: "center" }}>{onetoone.answer[0].answerTitle}</h1>
    );
  }

  function AnswerContent() {
    return onetoone.answer[0] === undefined || null ? (
      <br />
    ) : (
      <h1>{onetoone.answer[0].answerContent}</h1>
    );
  }

  function AnswerDate() {
    return onetoone.answer[0] === undefined || null ? (
      <br />
    ) : (
      <h3 style={{ textAlign: "right" }}>{onetoone.answer[0].answerDate}</h3>
    );
  }

  function AnswerPic() {
    return onetoone.answer[0] === undefined || null || "" ? (
      <br />
    ) : (
      <img
        src={onetoone.answer[0].answerPic}
        style={{
          objectFit: "scale-down",
          width: "400px",
          height: "400px",
        }}
        alt="answerPic"
      />
    );
  }

  function QnaPic() {
    return onetoone.qnaPic === "" ? (
      <br />
    ) : (
      <img
        style={{
          objectFit: "scale-down",
          width: "400px",
          height: "400px",
        }}
        src={onetoone.qnaPic}
        alt="qnaPic"
      />
    );
  }

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
            <h1 style={{ textAlign: "center" }}>{onetoone.qnaTitle}</h1>
            <h3 style={{ textAlign: "right" }}>
              {onetoone.qnaAuthor} <br /> {onetoone.qnaDate}
            </h3>
            <h3>{onetoone.qnaContent}</h3>
            <QnaPic />
            <div style={{ paddingLeft: "30%" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={updateOne}
                style={{ marginRight: "5px" }}
              >
                수정하기
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: "5px" }}
                onClick={remove}
              >
                삭제하기
              </Button>
              <Button variant="contained" color="secondary" onClick={answerOne}>
                답변하기
              </Button>
            </div>
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
        <Grid item xs={12} sm={10} md={8} lg={10}>
          <Paper className={classes.paper}>
            <Typography variant="h5">답변</Typography>
            <Divider style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <AnswerTitle />
            <AnswerDate />
            <AnswerContent />
            <AnswerPic />
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
      </Grid>
    </>
  );
};

export default OnetooneDetail;
