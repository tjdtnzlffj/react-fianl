import { useEffect, useState } from "react";
import BreadItem from "./CommunityItem";
import { Box } from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  starttext: {
    width: "56%",
    margin: "0 auto",
    marginTop: "5px",
    marginBottom: "50px",
    cursor: "pointer",
  },
}));

const Community = () => {
  const history = useHistory();

  const [boards, setBoards] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/board")
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setBoards(res);
      });
  }, []);

  const classes = useStyles();
  return (
    <div>
      <Box
        className={classes.starttext}
        onClick={() => {
          history.push("/communityForm");
        }}
      >
        <CKEditor editor={ClassicEditor} />
      </Box>
      {boards.map((board) => (
        <BreadItem key={board.id} board={board} />
      ))}
    </div>
  );
};

export default Community;
