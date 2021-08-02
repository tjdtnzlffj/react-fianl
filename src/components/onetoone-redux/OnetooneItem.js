import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { useHistory } from "react-router";

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
