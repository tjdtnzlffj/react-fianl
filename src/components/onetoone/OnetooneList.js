import {
  makeStyles,
  TableHead,
  TableRow,
  TableContainer,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { useEffect, useState } from "react";
import OnetooneItem from "./OnetooneItem";

// import OnetoonePagination from "./OnetoonePagination";

const OnetooneList = () => {
  const useStyles = makeStyles({
    container: {
      maxHeight: 520,
    },
  });
  const classes = useStyles();

  const [onetoone, setOnetoone] = useState([]);

  // 함수 실행시 최초 한번만 실행되는 것
  // 상태값이 변경될때마다 실행, 고로 한번만 실행하려면 의존성쪽에 빈배열 써줘야함
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/onetoone`)
      .then((response) => response.json())
      .then((response) => {
        console.log(1, response);
        setOnetoone(response);
      }); // 비동기함수
  }, []);

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
            {onetoone.map((onetoone) => (
              <OnetooneItem key={onetoone.id} onetoone={onetoone} />
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
