import { Paper, TablePagination } from "@material-ui/core";
import { useEffect, useState } from "react";
import EmptyComponent from "../../../component/EmptyComponent";
import LoadingProgress from "../../../component/LoadingProccess";
import { useAppDispatch } from "../../../hooks";
import { getOrderInfo, OrderDto } from "../slice/OrderSlice";
import ItemOrderComponent from "./ItemOrderComponent";
interface Props {
  data: OrderDto[];
  status: number;
  loading?: boolean;
  value: number;
}
const ListOrderComponent = (props: Props) => {
  const { data, status, loading, value } = props;
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, status, page, rowsPerPage]);

  const getData = async () => {
    try {
      await dispatch(getOrderInfo({ status: status }));
    } catch (e) {}
  };

  return (
    <div style={{ position: "relative" }}>
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
        <EmptyComponent />
      )}
      {loading && <LoadingProgress />}
    </div>
  );
};
export default ListOrderComponent;
