import { Button, Checkbox, IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Delete from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LIST_VOUCHER } from "../../contant/ContaintDataAdmin";
import { ItemCart, ROUTE } from "../../contant/Contant";
import { VoucherAdmin } from "../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getIdAccount } from "../../service/StorageService";
import { colors } from "../../utils/color";
import { formatPrice, FunctionUtil } from "../../utils/function";
import { getAddressInfo } from "../setting/address/slice/AddressSlice";
import AddressOrder from "./components/AddressOrder";
import FormDialogAddress from "./components/FormDialogAddress";
import FormDialogVoucher from "./components/FormDialogVoucher";
import VoucherOrder from "./components/VoucherOrder";
import {
  deleteItemCart,
  deleteMoreCart,
  updateQuantity,
} from "./slice/CartSlice";

const useStyles = makeStyles({
  table: {
    minWidth: "80%",
  },
  buttonQuantity: {
    width: 25,
    height: 25,
    borderColor: colors.grayC4,
    borderWidth: 0.8,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
  },
});

function subtotal(items: ItemCart[]) {
  return items
    .map(({ price, count }) => price * count)
    .reduce((sum: any, i: any) => sum + i, 0);
}

const CartScreen = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const { data } = useAppSelector((state) => state.cart);
  const address = useAppSelector((state) => state.addressUser);

  const [openVoucher, setOpenVoucher] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherAdmin | null>(
    null
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accountId = getIdAccount();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    dispatch(getAddressInfo(Number(accountId)));
  };

  const checkTotal = () => {
    let array: ItemCart[] = [];
    selected.map((a) => {
      const exist = data.find((e) => {
        if (e.id === Number(a)) return e;
      });

      if (exist) array = array.concat([exist]);
    });
    return subtotal(array);
  };

  const checkDiscount = () => {
    let res: number = !!selectedVoucher?.discountPersent
      ? (checkTotal() * selectedVoucher?.discountPersent) / 100
      : 0;
    return res;
  };

  return (
    <div>
      <AddressOrder
        address={address.dataSelected}
        onChoose={() => {
          setOpenAddress(!openAddress);
        }}
      />
      <VoucherOrder
        onPress={() => {
          setOpenVoucher(!openVoucher);
        }}
        itemVoucher={selectedVoucher}
        total={checkTotal()}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" align="center">
                {selected.length > 0 && (
                  <IconButton
                    onClick={() => {
                      dispatch(deleteMoreCart({ array: selected }));
                      setSelected([]);
                      if (selected.length === data.length) {
                        navigate(ROUTE.PRODUCT);
                      }
                    }}
                  >
                    <Delete color="secondary" fontSize="small" />
                  </IconButton>
                )}
              </TableCell>

              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right" />
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < data?.length
                  }
                  checked={
                    data && data?.length > 0 && selected.length === data?.length
                  }
                  onChange={(event) => {
                    setSelected(FunctionUtil.handleSelectAllClick(event, data));
                  }}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              </TableCell>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => {
                const isItemSelected = isSelected(`${row.id}`);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={(event) => {
                          setSelected(
                            FunctionUtil.handleClick(
                              event,
                              `${row.id}`,
                              selected
                            )
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">
                      <button
                        className={classes.buttonQuantity}
                        onClick={() => {
                          row.count > 1 &&
                            dispatch(
                              updateQuantity({
                                id: row.id,
                                new_quantity: row.count - 1,
                              })
                            );
                        }}
                      >
                        -
                      </button>
                      {row.count}
                      <button
                        className={classes.buttonQuantity}
                        onClick={() => {
                          dispatch(
                            updateQuantity({
                              id: row.id,
                              new_quantity: row.count + 1,
                            })
                          );
                        }}
                      >
                        +
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      {formatPrice(row.price)}đ
                    </TableCell>
                    <TableCell align="right">
                      {formatPrice(row.totalPrice)}đ
                    </TableCell>
                    <TableCell padding="checkbox">
                      <button
                        onClick={() => {
                          dispatch(deleteItemCart({ id: row.id }));
                        }}
                      >
                        <Delete color="action" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}

            <TableRow>
              <TableCell colSpan={3} />
              <TableCell colSpan={2}>Tổng tiền</TableCell>
              <TableCell align="right">{formatPrice(checkTotal())}đ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell colSpan={2}>Giảm giá</TableCell>
              <TableCell align="right">
                {formatPrice(checkDiscount())}đ
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell colSpan={2}>Thành tiền</TableCell>
              <TableCell align="right">
                {formatPrice(checkTotal() - checkDiscount())}đ
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          paddingTop: 40,
        }}
      >
        <Button
          variant="outlined"
          color="default"
          style={{
            width: "30%",
          }}
          onClick={() => {
            navigate(ROUTE.ORDER);
          }}
        >
          Thanh toán
        </Button>
      </div>
      <FormDialogVoucher
        data={LIST_VOUCHER}
        handleClose={() => {
          setOpenVoucher(!openVoucher);
        }}
        open={openVoucher}
        description={"Hãy chọn voucher để nhận được những ưu đãi lớn nhất"}
        selected={selectedVoucher}
        setSelected={setSelectedVoucher}
      />
      <FormDialogAddress
        data={address.data}
        handleClose={() => {
          setOpenAddress(!openAddress);
        }}
        open={openAddress}
        description={"Vui lòng chọn địa chỉ nhận hàng"}
      />
    </div>
  );
};
export default CartScreen;
