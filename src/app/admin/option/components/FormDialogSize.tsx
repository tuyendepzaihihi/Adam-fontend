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
import { OptionSize } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import { createSize, updateSize } from "../slice/OptionAdminSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: any;
  type: number;
  data: OptionSize[];
}
const validateOptionSize = Yup.object({
  Size_name: Yup.string().required("Vui lòng nhập").trim(),
});

interface PropsCreateSize {
  Size_name: string;
}
const initialValues: PropsCreateSize = {
  Size_name: "",
};
const FormDialogSize = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;

  const onSubmit = (data: PropsCreateSize) => {
    const { Size_name } = data;
    const item: OptionSize = {
      ...anchorElData.item,
      size_name: Size_name,
    };
    dispatch(updateSize({ item: item }));
    handleClose();
  };

  const onSubmitCreate = (dataCreate: PropsCreateSize) => {
    const { Size_name } = dataCreate;
    const item: OptionSize = {
      size_name: Size_name,
      id: data[data.length - 1].id + 1,
      status: 1,
    };
    dispatch(createSize({ item: item }));
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
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Size" : `Cập nhật Size`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                Size_name: anchorElData?.item.size_name ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateOptionSize}
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
                Cập nhật thông tin cá nhân của Size, vui lòng điền tất cả thông
                tin cần thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.Size_name}
                touched={touched.Size_name}
                value={values.Size_name}
                label={"Size name"}
                onChange={handleChange("Size_name")}
                onBlur={handleBlur("Size_name")}
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
export default FormDialogSize;
