import React, { useEffect, useState } from "react";
import {
  Grid,
  Hidden,
  Paper,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyels = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
  },

  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "20px",
    },
  },
}));

const Detail = (props) => {
  const classes = useStyels();

  const id = props.match.params.id;

  const [onetoone, setOnetoone] = useState({
    id: "",
    qnaTitle: "",
    qnaAuthor: "",
    qnaContent: "",
    qnaDate: "",
    qnaState: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/onetoone/" + id)
      .then((res) => res.json())
      .then((res) => {
        setOnetoone(res);
      });
  }, []);

  const deleteOne = () => {
    fetch("http://localhost:8080/onetoone/" + id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "ok") {
          props.history.push("/onetoone");
        } else {
          alert("삭제 실패했습니다.");
        }
      });
  };

  const updateOne = () => {
    props.history.push("/updateForm/" + id);
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
            <h1>{onetoone.qnaTitle}</h1>
            <h3>{onetoone.qnaAuthor}</h3>
            <h3>{onetoone.qnaDate}</h3>
            <h3>{onetoone.qnaState}</h3>
            <h3>{onetoone.qnaContent}</h3>
            <Button
              variant="contained"
              color="secondary"
              onClick={updateOne}
              style={{ textDecoration: "none", marginLeft: "90%" }}
            >
              수정하기
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "5px", marginLeft: "90%" }}
              onClick={deleteOne}
            >
              삭제하기
            </Button>
            <Link to="/" style={{ textDecoration: "none", marginLeft: "90%" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: "5px", marginLeft: "90%" }}
              >
                답변하기
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
      </Grid>
    </>
  );
};

export default Detail;
