import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import TextInputComponent from "../../../component/TextInputComponent";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { VoucherAdmin } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import { updateVoucher } from "../slice/VoucherAdminSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData?: { item: VoucherAdmin } | null;
  type: number;
  data: VoucherAdmin[];
}
const validateVoucher = Yup.object({});

interface PropsCreateVoucher {
  title: string;
}
const initialValues: PropsCreateVoucher = {
  title: "",
};
const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;
  const [image, setImage] = useState<any>(null);

  const onSubmit = (data: { title: string }) => {
    const { title } = data;
    if (anchorElData) {
      const item: VoucherAdmin = {
        ...anchorElData.item,
        title: title,
        url: image,
      };
      dispatch(updateVoucher({ item: item }));
      handleClose();
    }
  };

  const onSubmitCreate = (dataCreate: PropsCreateVoucher) => {
    const { title } = dataCreate;
    // const item: VoucherAdmin = {
    //   status: 1,
    //   create_date: moment(new Date()).format("DD/MM/YYYY").toString(),
    //   id: data[data.length - 1].id + 1,
    //   title: title,
    //   url: image,
    // };
    // dispatch(createVoucher({ item: item }));
    // handleClose();
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log({ img });
      setImage(URL.createObjectURL(img));
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
    >
      <DialogTitle id="form-dialog-title">
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Voucher" : `Cập nhật Voucher`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                title: anchorElData?.item.title ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateVoucher}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
        }) => (
          <>
            <DialogContent style={{ width: "100%" }}>
              <DialogContentText>
                Cập nhật thông tin của Voucher, vui lòng điền tất cả thông tin
                cần thiết
              </DialogContentText>
              <div>
                <img
                  src={image ? image : anchorElData?.item.url}
                  alt=""
                  style={{ width: 200 }}
                />
                <h1>Select Image</h1>
                <input type="file" name="myImage" onChange={onImageChange} />
              </div>
              <TextInputComponent
                error={errors.title}
                touched={touched.title}
                value={values.title}
                label={"Title Voucher"}
                onChange={handleChange("title")}
                onBlur={handleBlur("title")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()} color="primary">
                Submit
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};
export default FormDialog;
