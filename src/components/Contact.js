import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "80px",
    },
  },
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.container}>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Grid item xs={12} sm={12} lg={10}>
        <Paper className={classes.paper} style={{ height: "80vh" }}>
          <br />
          <h2 style={{ textAlign: "center", marginLeft: "50px" }}>
            Contact Us
          </h2>
          <hr style={{ width: "70%" }} />
          <br />
          <div style={{ display: "inline-flex" }}>
            <img
              src="https://mblogthumb-phinf.pstatic.net/MjAxNzA4MjRfMSAg/MDAxNTAzNTQ2Nzk3NDY3.5LAXiI2IirsbVaZzXVgMaPNpUrzzJvs6hEF_5sGyW40g.6nBVZU0uEg6BQy_tL422oUqySjoaxwDijW6no8zbTXgg.JPEG.wizpet1756/%EB%A0%88%EC%84%9C%ED%8C%90%EB%8B%A45.jpg?type=w800"
              alt="smiling animal img"
              style={{
                height: "10vh",
                marginLeft: "25%",
                marginTop: "40px",
                width: "auto",
              }}
            />
            <h3 style={{ marginLeft: "40px", marginTop: "60px" }}>
              최서인 <br />
              jn02215@naver.com
            </h3>
          </div>
        </Paper>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
    </Grid>
  );
};
export default Contact;
