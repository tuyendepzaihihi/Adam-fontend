import { Paper, TablePagination } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import { useState } from "react";
import { OrderDto } from "../slice/OrderSlice";
import ItemOrderComponent from "./ItemOrderComponent";
interface Props {
  data: OrderDto[];
}
const ListOrderComponent = (props: Props) => {
  const { data } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      {data.length > 0 ? (
        <Paper>
          {data.map((e, index) => {
            return <ItemOrderComponent key={index} item={e} />;
          })}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 300,
            flexDirection: "column",
          }}
        >
          <p>Danh sách rỗng</p>
          <ErrorOutline fontSize="large" style={{ width: 100, height: 100 }} />
        </div>
      )}
    </>
  );
};
export default ListOrderComponent;
