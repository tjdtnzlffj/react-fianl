import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { useHistory } from "react-router";

const OnetooneItem = (props) => {
  const { id, qnaTitle, qnaAuthor, qnaDate, qnaState } = props.onetoone;

  const history = useHistory();

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/onetoone/" + id);
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

// git test
