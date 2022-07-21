import { Button } from "@material-ui/core";
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
import LoadingProgress from "../../../component/LoadingProccess";
import { LIST_VOUCHER } from "../../../contant/ContaintDataAdmin";
import { ItemCart } from "../../../contant/Contant";
import { VoucherAdmin } from "../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  requestDeleteCart,
  requestPutUpdateCart,
  UpdateCartDto,
} from "../../../screen/cart/CartApi";
import FormDialogVoucher from "../../../screen/cart/components/FormDialogVoucher";
import VoucherOrder from "../../../screen/cart/components/VoucherOrder";
import {
  changeLoading,
  deleteItemCart,
  incrementAsyncCart,
  updateQuantity,
} from "../../../screen/cart/slice/CartSlice";
import { getIdAccount } from "../../../service/StorageService";
import { colors } from "../../../utils/color";
import { formatPrice } from "../../../utils/function";

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
    .map(({ detailProduct, quantity }) => detailProduct.priceExport * quantity)
    .reduce((sum: any, i: any) => sum + i, 0);
}

const CartOrderAdmin = () => {
  const classes = useStyles();
  const { data, isLoading } = useAppSelector((state) => state.cart);

  const [openVoucher, setOpenVoucher] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherAdmin | null>(
    null
  );
  const dispatch = useAppDispatch();
  const accountId = getIdAccount();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    dispatch(incrementAsyncCart());
  };

  const checkTotal = () => {
    return subtotal(data);
  };

  const checkDiscount = () => {
    let res: number = !!selectedVoucher?.discountPersent
      ? (checkTotal() * selectedVoucher?.discountPersent) / 100
      : 0;
    return res;
  };

  const handlePayment = async () => {
    // const payload: CreateOrderDto = {
    //   accountId: Number(accountId),
    //   addressDetail: address.dataSelected?.addressDetail,
    //   addressId: address.dataSelected?.id,
    //   cartItemIdList: selected.map((e) => Number(e)),
    //   fullName: address.dataSelected?.fullName,
    //   phoneNumber: address.dataSelected?.phoneNumber,
    //   salePrice: checkDiscount(),
    //   totalPrice: checkTotal(),
    // };
    // try {
    //   dispatch(changeLoading(true));
    //   await requestPostCreateOrder(payload);
    //   dispatch(changeLoading(false));
    // } catch (e) {
    //   dispatch(changeLoading(false));
    // }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
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
              <TableCell padding="checkbox" align="center"></TableCell>
              <TableCell align="center" colSpan={4}>
                Details
              </TableCell>
              <TableCell align="right" />
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Option(color/size)</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell></TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">
                      {row.detailProduct.product.productName}
                    </TableCell>
                    <TableCell align="right">
                      {row.detailProduct.color.colorName ?? ""}
                      {row.detailProduct.size.sizeName
                        ? "/" + row.detailProduct.size.sizeName
                        : ""}
                    </TableCell>
                    <TableCell align="right">
                      <button
                        className={classes.buttonQuantity}
                        onClick={async () => {
                          if (row.quantity > 1) {
                            dispatch(changeLoading(true));
                            const payload: UpdateCartDto = {
                              id: row.id,
                              quantity: row.quantity - 1,
                              totalPrice:
                                row.quantity -
                                1 * row.detailProduct.priceExport,
                            };
                            await requestPutUpdateCart(payload);
                            dispatch(
                              updateQuantity({
                                id: row.id,
                                new_quantity: row.quantity - 1,
                              })
                            );
                            dispatch(changeLoading(false));
                          }
                        }}
                      >
                        -
                      </button>
                      {row.quantity}
                      <button
                        className={classes.buttonQuantity}
                        onClick={async () => {
                          dispatch(changeLoading(true));
                          const payload: UpdateCartDto = {
                            id: row.id,
                            quantity: row.quantity + 1,
                            totalPrice:
                              row.quantity + 1 * row.detailProduct.priceExport,
                          };
                          await requestPutUpdateCart(payload);
                          dispatch(
                            updateQuantity({
                              id: row.id,
                              new_quantity: row.quantity + 1,
                            })
                          );
                          dispatch(changeLoading(false));
                        }}
                      >
                        +
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      {formatPrice(row.detailProduct.priceExport)}đ
                    </TableCell>
                    <TableCell align="right">
                      {formatPrice(row.totalPrice)}đ
                    </TableCell>
                    <TableCell padding="checkbox">
                      <button
                        onClick={async () => {
                          dispatch(changeLoading(true));
                          await requestDeleteCart({ id: row.id });
                          dispatch(deleteItemCart({ id: row.id }));
                          dispatch(changeLoading(false));
                        }}
                      >
                        <Delete color="action" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}

            <TableRow>
              <TableCell colSpan={4} />
              <TableCell colSpan={2}>Tổng tiền</TableCell>
              <TableCell align="right">{formatPrice(checkTotal())}đ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell colSpan={2}>Giảm giá</TableCell>
              <TableCell align="right">
                {formatPrice(checkDiscount())}đ
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
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
          padding: 5,
          paddingTop: 20,
        }}
      >
        {data.length > 0 && (
          <Button
            variant="outlined"
            color="primary"
            style={{
              width: "30%",
            }}
            onClick={handlePayment}
          >
            Thanh toán
          </Button>
        )}
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
      {isLoading && <LoadingProgress />}
    </div>
  );
};
export default CartOrderAdmin;
