import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInputComponent from "../../../component/TextInputComponent";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { OptionColor } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import { createColor, updateColor } from "../slice/OptionColorSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: any;
  type: number;
  data: OptionColor[];
}
const validateOptionColor = Yup.object({
  color_name: Yup.string().required("Vui lòng nhập").trim(),
});

interface PropsCreateColor {
  color_name: string;
}
const initialValues: PropsCreateColor = {
  color_name: "",
};
const FormDialogColor = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;

  const onSubmit = (data: PropsCreateColor) => {
    const { color_name } = data;
    const item: OptionColor = {
      ...anchorElData.item,
      color_name: color_name,
    };
    dispatch(updateColor({ item: item }));
    handleClose();
  };

  const onSubmitCreate = (dataCreate: PropsCreateColor) => {
    const { color_name } = dataCreate;
    const item: OptionColor = {
      colorName: color_name,
      id: data[data.length - 1].id + 1,
      status: 1,
    };
    dispatch(createColor({ item: item }));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
    >
      <DialogTitle id="form-dialog-title">
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Color" : `Cập nhật Color`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                color_name: anchorElData?.item.colorName ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateOptionColor}
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
                Cập nhật thông tin cá nhân của Color, vui lòng điền tất cả thông
                tin cần thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.color_name}
                touched={touched.color_name}
                value={values.color_name}
                label={"color name"}
                onChange={handleChange("color_name")}
                onBlur={handleBlur("color_name")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};
export default FormDialogColor;
