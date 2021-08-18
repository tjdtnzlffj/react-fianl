import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import CommentList from "../comment/CommentList";
import CommunityDetail from "./CommunityDetail";
// import ReactHtmlParser from 'react-html-parser';
const useStyles = makeStyles((theme) => ({
  breadcontainer: {
    margin: "0 auto",
    width: "37%",
    marginBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  boardItem: {
    border: "1px solid #333",
    marginTop: "13px",
  },
  imgContainer: {
    cursor: "pointer",
    textAlign: "center",
    backgroundColor: "black",
    height: "50vh",
    [theme.breakpoints.down("md")]: {
      height: "32vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "44vh",
    },
  },
  contentContainer: {
    padding: "5px 10px 10px ",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CommunityItem = ({ board, commentList }) => {
  // const { id } = board;
  // console.log("--id 확인--");
  // console.log(id);
  // console.log(board);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.breadcontainer}>
      <Paper elevation={2} className={classes.boardItem}>
        {/* 게시글 title */}
        <h3 style={{ textAlign: "center" }}>{board.postTitle}</h3>
        <hr />
        {/* 게시글 이미지 */}
        <div
          className={classes.imgContainer}
          onClick={() => {
            history.push("/board/" + board.id);
            // dispatch({
            //   type: "OPEN_MODAL",
            //   payload: {
            //     modalState: true,
            //     renderingComponent: <CommunityDetail />,
            //   },
            // });
          }}
        >
          <img
            src={board.postImage}
            alt="bread"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div className={classes.contentContainer}>
          {/* 게시글 content */}
          <div>{board.postContent}</div>

          {/* 게시글 좋아요수 + 작성자수 */}
          <CommentList
            like={board.postLike}
            postNo={board.id}
            commentList={commentList}
          />
        </div>
      </Paper>
    </div>
  );
};

export default CommunityItem;
