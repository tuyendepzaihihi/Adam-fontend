import {
  Button,
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
  Typography,
} from "@material-ui/core";
import { useAppDispatch } from "../../../hooks";
import {
  DEFINE_ORDER,
  ItemProduct,
  TYPE_ORDER,
} from "../../../screen/order/components/ItemOrderComponent";
import { OrderDto } from "../../../screen/order/slice/OrderSlice";
import { colors } from "../../../utils/color";
import { formatPrice } from "../../../utils/function";
import { createNotification } from "../../../utils/MessageUtil";
import { changeLoading, updateOrderAdmin } from "../slice/OrderAdminSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: { item: OrderDto } | null;
  setAnchorElData: any;
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
                    <Typography>{DEFINE_ORDER[e].title}</Typography>
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
        {item?.cartItems.map((e) => {
          return <ItemProduct item={e} inList />;
        })}
      </div>
    </div>
  );
};

const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, setAnchorElData } = props;

  const handleChange = (params: { value: any; row: OrderDto }) => {
    const { row, value } = params;
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
      const item = {
        ...row,
        status: value,
      };
      setAnchorElData({ item });
      dispatch(updateOrderAdmin({ item }));
      handleClose();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
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
      <DialogContent style={{ width: "100%" }}>
        <RenderInfoOrder
          item={anchorElData?.item}
          handleChange={handleChange}
        />
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
