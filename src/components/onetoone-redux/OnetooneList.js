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
// import { useState } from "react";

// import OnetoonePagination from "./OnetoonePagination";

const OnetooneList = () => {
  const useStyles = makeStyles({
    container: {
      maxHeight: 520,
    },
  });

  const classes = useStyles();

  // useSelect : redux store의 state를 선택(select)
  const data = useSelector((state) => state.onetoone);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ONETOONELIST" });
  }, [dispatch]);

  return (
    <>
      <TableContainer className={classes.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>닉네임</TableCell>
              <TableCell>작성날짜</TableCell>
              <TableCell>진행상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((onetoone) => (
              <OnetooneItem key={onetoone.qnaNum} onetoone={onetoone} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <OnetoonePagination
        totalElements={data.totalElements}
        page={data.page}
        size={data.size}
      /> */}
    </>
  );
};

export default OnetooneList;
