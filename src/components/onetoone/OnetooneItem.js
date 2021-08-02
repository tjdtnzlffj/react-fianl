import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

// import { useState } from "react";
import { useHistory } from "react-router";
// import { useDispatch } from "react-redux";

const OnetooneItem = (props) => {
  const { qnaNum, qnaTitle, qnaAuthor, qnaDate, qnaState } = props.onetoone;

  const history = useHistory();

  return (
    <TableRow>
      <TableCell>{qnaNum}</TableCell>
      <TableCell
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/onetoone/" + qnaNum);
        }}
      >
        {qnaTitle}
      </TableCell>
      <TableCell>{qnaAuthor}</TableCell>
      <TableCell>{qnaDate}</TableCell>
      <TableCell>{qnaState}</TableCell>
    </TableRow>
  );
};

export default OnetooneItem;
