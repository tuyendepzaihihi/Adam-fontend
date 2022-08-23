import {
  Button,
  Checkbox,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography
} from "@material-ui/core";
import { useState } from "react";
import LoadingProgress from "../../../component/LoadingProccess";
import TextInputComponent from "../../../component/TextInputComponent";
import { ResultApi } from "../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  DEFINE_ORDER,
  ItemProduct,
  TYPE_ORDER
} from "../../../screen/order/components/ItemOrderComponent";
import {
  OrderDetailPayload,
  OrderDto
} from "../../../screen/order/slice/OrderSlice";
import { colors } from "../../../utils/color";
import { formatPrice } from "../../../utils/function";
import { createNotification } from "../../../utils/MessageUtil";
import {
  requestPutUpdateOrder
} from "../OrderApi";
import { changeLoading, updateOrderAdmin } from "../slice/OrderAdminSlice";


export interface ReasonPayback {
  reason: string;
  price: number;
  detailCode: OrderDetailPayload[];
}

export const initReasonPayback:ReasonPayback = {
  reason: "",
  price: 30000,
  detailCode: [],
};
interface Props {
  open: any;
  handleClose: () => void;
  anchorElData: { item: OrderDto } | null;
  setAnchorElData: any;
  openCreatePayback: boolean
  setOpenCreatePayback: any
  reason: ReasonPayback
  setReason: any
  handleCallBackOrder: ()=>void
}

const RenderLabel = (params: { label: string; value?: string }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography style={{ color: colors.gray59 }}>
        {params.label ?? "..."}
      </Typography>
      <Typography style={{ color: colors.black, fontWeight: "bold" }}>
        {": " + (params.value ?? "...")}
      </Typography>
    </div>
  );
};

const RenderInfoOrder = (params: {
  item?: OrderDto;
  handleChange: Function;
}) => {
  const classes = useStyles();
  const { item, handleChange } = params;

  return (
    <div>
      <RenderLabel label={"Tên người nhận"} value={item?.fullName} />
      <RenderLabel label={"Số điện thoại"} value={item?.fullName} />
      <RenderLabel
        label={"Địa chỉ"}
        value={`${item?.addressDetail} - ${item?.address.ward.name} - ${item?.address.district.name} - ${item?.address.province.name}`}
      />
      <RenderLabel
        label={"Tiền sản phẩm"}
        value={`${formatPrice(item?.amountPrice ?? 0)}đ`}
      />
      <RenderLabel
        label={"Tiền giảm giá"}
        value={`${formatPrice(item?.salePrice ?? 0)}đ`}
      />
      <RenderLabel
        label={"Thành tiền thanh toán"}
        value={`${formatPrice(item?.totalPrice ?? 0)}đ`}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography style={{ color: colors.gray59 }}>
          {"Trạng thái đơn hàng: "}
        </Typography>
        <FormControl className={classes.formControl}>
          <Select
            value={item?.status ?? 1}
            onChange={(event) =>
              handleChange({
                value: event.target.value,
                row: item,
              })
            }
            className={classes.selectedStyle}
          >
            {Object.values(TYPE_ORDER).map((e) => {
              return (
                <MenuItem value={e} className={classes.menuItem}>
                  <div
                    className={classes.itemStatus}
                    style={{ backgroundColor: DEFINE_ORDER[e].color }}
                  >
                    <Typography style={{ fontSize: 14 }}>
                      {DEFINE_ORDER[e].title}
                    </Typography>
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <Typography
        style={{ color: colors.black, fontWeight: "bold" }}
        variant="h5"
      >
        Danh sách sản phẩm
      </Typography>
      <div style={{ paddingLeft: "5%" }}>
        {item?.detailOrders?.map((e) => {
          return <ItemProduct item={e} inList />;
        })}
      </div>
    </div>
  );
};



const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((e) => e.orderAdmin);
  const { handleClose, open, anchorElData, setAnchorElData,reason,setReason ,handleCallBackOrder} = props;
  const [openReason, setOpenReason] = useState(false);

  const handleChange = async (params: { value: any; row: OrderDto }) => {
    const { row, value } = params;
    if (+value === TYPE_ORDER.PAYBACK) {
      setOpenReason(true);
      return;
    }

    if (row.status === TYPE_ORDER.DONE && value !== TYPE_ORDER.CANCEL) {
      createNotification({
        type: "warning",
        message: "Đơn hàng đã thành công và chỉ có thể huỷ đơn!!",
      });
      return;
    }

    if (
      row.status === TYPE_ORDER.CANCEL &&
      (value !== TYPE_ORDER.DONE || value !== TYPE_ORDER.DELAY)
    ) {
      createNotification({
        type: "warning",
        message: "Đơn hàng đã huỷ đơn!",
      });
      return;
    }

    try {
      dispatch(changeLoading(true));
      const res: ResultApi<OrderDto> = await requestPutUpdateOrder({
        order_id: row.id,
        status: value,
      });
      setAnchorElData({ item: res.data });
      dispatch(updateOrderAdmin({ item: res.data }));
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const DialogReason = () => {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: 30,
            backgroundColor: colors.white,
            borderRadius: 5,
            width: "50%",
            borderColor: colors.gray59,
            borderWidth: 0.5,
            position: "relative",
          }}
        >
          <TextInputComponent
            value={""}
            onChange={(event: any) => {
              setReason({
                ...reason,
                reason: `${event.target.value}`,
              });
            }}
            label="Nhập lý do hoàn/thay đổi đơn hàng"
          />
          {anchorElData?.item?.detailOrders?.map((e, index) => {
            const exist = reason.detailCode.find((value) => value.id === e.id);
            const isSelected = exist ? true : false;
            return (
              <div key={index}>
                <Checkbox
                  value={isSelected}
                  onChange={() => {
                    if (isSelected) {
                      setReason({
                        ...reason,
                        detailCode: reason.detailCode.filter(
                          (val) => val.id !== e.id
                        ),
                      });
                    } else {
                      setReason({
                        ...reason,
                        detailCode: reason.detailCode.concat([e]),
                      });
                    }
                  }}
                />
                <ItemProduct item={e} inList />
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button onClick={()=>{
              setOpenReason(false)
              handleCallBackOrder()
            }} variant="contained">
              Hoàn thành
            </Button>
          </div>
          {isLoading && <LoadingProgress />}
        </div>
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">{"Địa chỉ đơn hàng"}</DialogTitle>
      <DialogContent style={{ width: "100%", position: "relative" }}>
        <RenderInfoOrder
          item={anchorElData?.item}
          handleChange={handleChange}
        />
        {openReason && DialogReason()}
        {isLoading && <LoadingProgress />}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default FormDialog;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    menuItem: {
      marginTop: 5,
      color: colors.white,
      display: "flex",
    },
    itemStatus: {
      width: "100%",
      borderRadius: 10,
      alignSelf: "center",
      display: "flex",
      justifyContent: "center",
      padding: 5,
      paddingRight: 0,
    },
    selectedStyle: {
      color: colors.white,
      height: 45,
    },
  })
);
