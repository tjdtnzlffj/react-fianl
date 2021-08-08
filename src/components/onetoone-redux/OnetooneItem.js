import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { useHistory } from "react-router";

const OnetooneItem = ({ onetoone }) => {
  const history = useHistory();

  return (
    <TableRow>
      <TableCell>{onetoone.id}</TableCell>
      <TableCell
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/onetoone/" + onetoone.id);
        }}
      >
        {onetoone.qnaTitle}
      </TableCell>
      <TableCell>{onetoone.qnaAuthor}</TableCell>
      <TableCell>{onetoone.qnaDate}</TableCell>
      <TableCell>{onetoone.qnaState}</TableCell>
    </TableRow>
  );
};

export default OnetooneItem;
