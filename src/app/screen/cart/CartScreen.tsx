import { Button, Checkbox, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Delete from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { ItemCart } from "../../contant/Contant";
import { AddressOrderInterface } from "../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { colors } from "../../utils/color";
import { formatPrice, FunctionUtil } from "../../utils/function";
import AddressOrder from "./components/AddressOrder";
import { deleteItemCart, updateQuantity } from "./slice/CartSlice";

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
  const [addressOrder, setAddressOrder] =
    useState<AddressOrderInterface | null>(null);
  const dispatch = useAppDispatch();
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

  return (
    <div>
      <AddressOrder address={addressOrder} />
      <Typography>Giỏ hàng của bạn</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="right">
                {selected.length > 0 && (
                  <button>
                    <Delete color="secondary" />
                  </button>
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
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};
export default CartScreen;
