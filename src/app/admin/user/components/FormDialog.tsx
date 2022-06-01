import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Formik } from "formik";
import TextInputComponent from "../../../component/TextInputComponent";
import * as Yup from "yup";
import {
  NAME_REGEX,
  PHONE_REGEX,
  REG_EMAIL,
  textValidate,
} from "../../../contant/Contant";
interface Props {
  open: any;
  handleClose: any;
  anchorElData?: any;
}
const validateRegister = Yup.object({
  phone: Yup.string()
    .min(10, textValidate.phone.error_validate)
    .max(11, textValidate.phone.error_validate)
    .matches(PHONE_REGEX, textValidate.phone.error_validate)
    .required()
    .trim(),

  email: Yup.string()
    .matches(REG_EMAIL, textValidate.email.error_validate)
    .required(textValidate.email.require)
    .trim(),
  fullname: Yup.string()
    .required(textValidate.full_name.require)
    .matches(NAME_REGEX, textValidate.full_name.error_validate)
    .trim(),
});
const FormDialog = (props: Props) => {
  const { handleClose, open, anchorElData } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
    >
      <DialogTitle id="form-dialog-title">Cập nhật user</DialogTitle>
      <Formik
        initialValues={{
          email: anchorElData?.item.email ?? "",
          phone: anchorElData?.item.phone ?? "",
          fullname: anchorElData?.item.last_name ?? "",
        }}
        onSubmit={() => {
          handleClose();
        }}
        validateOnChange
        validationSchema={validateRegister}
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
                Cập nhật thông tin cá nhân của user, vui lòng điền tất cả thông
                tin cần thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.email}
                touched={touched.email}
                value={values.email}
                label={"Email"}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <TextInputComponent
                error={errors.phone}
                touched={touched.phone}
                value={values.phone}
                label={"Số điện thoại"}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
              />
              <TextInputComponent
                error={errors.fullname}
                touched={touched.fullname}
                value={values.fullname}
                label={"Tên họ đầy đủ"}
                onChange={handleChange("fullname")}
                onBlur={handleBlur("fullname")}
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
