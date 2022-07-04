import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useAppDispatch } from "../../../hooks";
import { ItemProduct } from "../../../screen/order/components/ItemOrderComponent";
import { OrderDto } from "../../../screen/order/slice/OrderSlice";
import { colors } from "../../../utils/color";
import { formatPrice } from "../../../utils/function";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: { item: OrderDto } | null;
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

const RenderInfoOrder = (params: { item?: OrderDto }) => {
  const { item } = params;
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
  const { handleClose, open, anchorElData } = props;

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
        <RenderInfoOrder item={anchorElData?.item} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button color="primary">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};
export default FormDialog;
