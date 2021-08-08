import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
// import ReactHtmlParser from 'react-html-parser';
const useStyles = makeStyles((theme) => ({
  breadcontainer: {
    margin: "0 auto",
    width: "50%",
    // border: '3px solid #333',
    // padding: '10px 0 10px 0',
    marginBottom: "5px",
  },
}));

const CommunityItem = (props) => {
  const { id, title, content } = props.board;

  const history = useHistory();

  const classes = useStyles();
  return (
    <div className={classes.breadcontainer}>
      <Paper
        elevation={2}
        onClick={() => {
          history.push("/board/" + id);
        }}
        style={{
          cursor: "pointer",
          border: "1px solid #333",
          marginTop: "13px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>{title}</h3>
        <hr />
        <div style={{ marginLeft: "10px" }}>{content}</div>
      </Paper>
    </div>
  );
};

export default CommunityItem;
