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
import { Material } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import { createMaterial, updateMaterial } from "../slice/MaterialAdminSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: any;
  type: number;
  data: Material[];
}
const validateMaterial = Yup.object({
  material_name: Yup.string()
    .required("Vui lòng nhập")

    .trim(),
});

interface PropsCreateMaterial {
  material_name: string;
}
const initialValues: PropsCreateMaterial = {
  material_name: "",
};
const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;

  const onSubmit = (data: PropsCreateMaterial) => {
    const { material_name } = data;
    const item: Material = {
      ...anchorElData.item,
      material_name: material_name,
    };
    dispatch(updateMaterial({ item: item }));
    handleClose();
  };

  const onSubmitCreate = (dataCreate: PropsCreateMaterial) => {
    const { material_name } = dataCreate;
    const item: Material = {
      material_name: material_name,
      id: data[data.length - 1].id + 1,
      status: 1,
    };
    dispatch(createMaterial({ item: item }));
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
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Material" : `Cập nhật Material`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                material_name: anchorElData?.item.material_name ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateMaterial}
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
                Cập nhật thông tin cá nhân của Material, vui lòng điền tất cả
                thông tin cần thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.material_name}
                touched={touched.material_name}
                value={values.material_name}
                label={"Material name"}
                onChange={handleChange("material_name")}
                onBlur={handleBlur("material_name")}
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
export default FormDialog;
