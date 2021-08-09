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
  const { id, postTitle, postContent, postDate, postAuthor } = props.board;

  const regex = /(<([^>]+)>)/gi;

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
        <h3 style={{ textAlign: "center" }}>{postTitle}</h3>
        <h3 style={{ textAlign: "right" }}>
          {postAuthor}
          <br />
          {postDate}
        </h3>
        <hr />
        <div style={{ marginLeft: "10px" }}>
          {postContent.replace(regex, "")}
        </div>
      </Paper>
    </div>
  );
};

export default CommunityItem;
