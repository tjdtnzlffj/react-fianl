import {
  makeStyles,
  TableHead,
  TableRow,
  TableContainer,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OnetooneItem from "./OnetooneItem";
import OnetoonePagination from "./OnetoonePagination";

const OnetooneList = () => {
  const useStyles = makeStyles({
    container: {
      maxHeight: 600,
    },
    cell: {
      fontWeight: "lighter",
      fontSize: "12pt",
    },
  });
  const classes = useStyles();

  const data = useSelector((state) => state.onetoone);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ONETOONELIST_PAGING" });
  }, [dispatch]);

  console.log("--fetch data--");
  console.log(data);

  return (
    <>
      <TableContainer className={classes.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>번호</TableCell>
              <TableCell className={classes.cell}>제목</TableCell>
              <TableCell className={classes.cell}>닉네임</TableCell>
              <TableCell className={classes.cell}>작성날짜</TableCell>
              <TableCell className={classes.cell}>진행상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.content.map((onetoone) => (
              <OnetooneItem key={onetoone.id} onetoone={onetoone} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OnetoonePagination
        totalElements={data.totalElements}
        page={data.page}
        size={data.size}
      />
    </>
  );
};

export default OnetooneList;
