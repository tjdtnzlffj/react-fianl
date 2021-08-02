import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";

import { Button, Divider, Typography } from "@material-ui/core";

import OnetooneList from "./OnetooneList";
import { Link } from "react-router-dom";

const useStyels = makeStyles((theme) => ({
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
}));

const Onetoone = () => {
  const classes = useStyels();

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
            <Link
              to="/saveForm"
              style={{ textDecoration: "none", marginLeft: "90%" }}
            >
              <Button variant="contained" color="secondary">
                글쓰기
              </Button>
            </Link>
            <OnetooneList />
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
      </Grid>
    </>
  );
};

export default Onetoone;
