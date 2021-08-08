import TablePagination from "@material-ui/core/TablePagination";
import { useDispatch } from "react-redux";

const OnetoonePagination = ({ totalElements, page, size }) => {
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    dispatch({
      type: "FETCH_ONETOONELIST_PAGING",
      payload: { page: newPage, size },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value);
    dispatch({
      type: "FETCH_ONETOONELIST_PAGING",
      payload: { page: 0, size: newSize },
    });
  };

  return (
    <TablePagination
      component="div"
      count={totalElements}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={size}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default OnetoonePagination;
