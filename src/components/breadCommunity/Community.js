import { useEffect } from "react";
import BreadItem from "./CommunityItem";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Community = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const commentDispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_BOARDLSIT" });
    commentDispatch({ type: "FETCH_COMMENTLIST" });
  }, [dispatch, commentDispatch]);

  const data = useSelector((state) => state.community);
  const commentList = useSelector((state) => state.comment);

  console.log("-=--data---");
  console.log(data);
  return (
    <>
      <div>
        <Button
          variant="outlined"
          color="primary"
          style={{
            marginTop: "40px",
            marginLeft: "31.5%",
            marginBottom: "2px",
            cursor: "pointer",
          }}
          onClick={() => {
            history.push("/communityForm");
          }}
        >
          글 작성
        </Button>

        {data.map((board) => {
          const matchedCommentList = commentList.filter(
            (comment) => Number(comment.postNo) === board.id
          );
          // const matchedCommentList = getMatchedCommentList(commentList, board.id);
          return (
            <BreadItem
              key={board.id}
              board={board}
              commentList={matchedCommentList}
            />
          );
        })}
      </div>
    </>
  );
};

export default Community;
