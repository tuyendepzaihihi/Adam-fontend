import {
  Button,
  createStyles,
  makeStyles,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";
import {
  LIST_PRODUCT,
  LIST_PRODUCT_DETAIL,
  OPTIONS_DATA,
} from "../../../../contant/ContaintDataAdmin";
import FormEditProductDetail from "./components/FormEditProductDetail";

interface Props {}
const ListProductDetail = (props: Props) => {
  const classes = useStyles();
  const [listProductDetail, setListProductDetail] =
    useState(LIST_PRODUCT_DETAIL);
  return (
    <div className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={"medium"}
          aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">Tên sản phẩm</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Giá nhập(VNĐ)</TableCell>
              <TableCell align="right">Giá xuất(VNĐ)</TableCell>
              <TableCell align="right">Ảnh phân loại</TableCell>
              <TableCell align="right">Số lượng(Cái)</TableCell>
              <TableCell align="right">Ngưng hoạt động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProductDetail.length > 0 &&
              listProductDetail.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <FormEditProductDetail
                    labelId={labelId}
                    row={row}
                    listProductDetail={listProductDetail}
                    setListProductDetail={setListProductDetail}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("khanh");
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
export default ListProductDetail;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 20,
    },
    table: {
      minWidth: 750,
    },
  })
);
