import {
  Button,
  createStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { LIST_PRODUCT_DETAIL } from "../../../../contant/ContaintDataAdmin";
import {
  DetailProductAdmin,
  ResultApi,
} from "../../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../../hooks";
import { formatPrice, FunctionUtil } from "../../../../utils/function";
import {
  requestPutUpdateDetailProductList,
  UpdateListDetailProductDto,
} from "../../ProductAdminApi";
import { changeLoading } from "../../slice/ProductAdminSlice";
import FormEditProductDetail from "./components/FormEditProductDetail";

interface Props {
  onSubmit: Function;
  listDetail?: DetailProductAdmin[];
}
const ListProductDetail = (props: Props) => {
  const { onSubmit, listDetail } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [listProductDetail, setListProductDetail] = useState(
    listDetail ? listDetail : LIST_PRODUCT_DETAIL
  );
  const [priceExportTotal, setPriceExportTotal] = useState(0);
  const [priceImportTotal, setPriceImportTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0);

  const handleChangePrice = (params: {
    keyString: "priceImport" | "priceExport" | "quantity";
    value: number;
  }) => {
    const { keyString, value } = params;
    if (!FunctionUtil.checkIsNumber(value)) return;

    const oldArray = listProductDetail;
    const newProductDetail = oldArray?.map((e) => {
      let newItem = e;
      newItem[keyString] = value;
      return newItem;
    });
    setListProductDetail(newProductDetail);
  };

  const handleChane = (params: { oldValue: any; text: any }) => {
    const { oldValue, text } = params;
    let newText = `${text}`.replace(",", "").replace(",", "").replace(",", "");
    if (!FunctionUtil.checkIsNumber(newText)) return oldValue;
    let value = oldValue;
    if (newText) value = Number(newText);
    else value = 0;
    return value;
  };

  const handleSubmit = async () => {
    try {
      dispatch(changeLoading(true));
      const listPayload = listProductDetail.map((e) => {
        let res: UpdateListDetailProductDto = {
          id: e.id,
          image: e.productImage,
          isActive: e.isActive ?? false,
          priceExport: e.priceExport,
          priceImport: e.priceImport,
          quantity: e.quantity,
        };
        return res;
      });
      await requestPutUpdateDetailProductList({
        newDetailProductDTOList: listPayload,
      });
      onSubmit();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.totalFilter}>
        <div className={classes.itemAddAll}>
          <TextField
            value={`${formatPrice(priceImportTotal)}`}
            onChange={(event) => {
              const value = handleChane({
                oldValue: priceImportTotal,
                text: event.target.value,
              });
              setPriceImportTotal(value);
            }}
            variant="standard"
            label="Price import(VNĐ)"
          />
          <Button
            variant="contained"
            style={{ marginLeft: 5 }}
            onClick={() => {
              handleChangePrice({
                keyString: "priceImport",
                value: priceImportTotal,
              });
            }}
          >
            Apply all
          </Button>
        </div>
        <div className={classes.itemAddAll}>
          <TextField
            value={`${formatPrice(priceExportTotal)}`}
            onChange={(event) => {
              const value = handleChane({
                oldValue: priceExportTotal,
                text: event.target.value,
              });
              setPriceExportTotal(value);
            }}
            variant="standard"
            label="Price export(VNĐ)"
          />
          <Button
            variant="contained"
            style={{ marginLeft: 5 }}
            onClick={() => {
              handleChangePrice({
                keyString: "priceExport",
                value: priceExportTotal,
              });
            }}
          >
            Apply all
          </Button>
        </div>
        <div className={classes.itemAddAll}>
          <TextField
            value={`${formatPrice(quantityTotal)}`}
            onChange={(event) => {
              const value = handleChane({
                oldValue: quantityTotal,
                text: event.target.value,
              });
              setQuantityTotal(value);
            }}
            variant="standard"
            label="Quantity(Cái)"
          />
          <Button
            variant="contained"
            style={{ marginLeft: 5 }}
            onClick={() => {
              handleChangePrice({
                keyString: "quantity",
                value: quantityTotal,
              });
            }}
          >
            Apply all
          </Button>
        </div>
      </div>
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
              <TableCell align="right">Option</TableCell>
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
      <div
        style={{ display: "flex", justifyContent: "flex-end", paddingTop: 20 }}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
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
    totalFilter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemAddAll: {
      display: "flex",
      alignItems: "center",
    },
  })
);
