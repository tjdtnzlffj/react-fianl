import { useEffect, useState } from "react";
import BreadItem from "./CommunityItem";
import { Box, Button } from "@material-ui/core";
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
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: "40px", marginLeft: "85%" }}
        >
          Write
        </Button>
      </Box>
      {boards.map((board) => (
        <BreadItem key={board.id} board={board} />
      ))}
    </div>
  );
};

export default Community;
