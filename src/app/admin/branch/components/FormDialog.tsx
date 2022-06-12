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
import { Branch } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import { createBranch, updateBranch } from "../slice/BranchAdminSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: any;
  type: number;
  data: Branch[];
}
const validateBranch = Yup.object({
  branch_name: Yup.string()
    .required("Vui lòng nhập")

    .trim(),
});

interface PropsCreateBranch {
  branch_name: string;
}
const initialValues: PropsCreateBranch = {
  branch_name: "",
};
const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;

  const onSubmit = (data: PropsCreateBranch) => {
    const { branch_name } = data;
    const item: Branch = {
      ...anchorElData.item,
      branch_name: branch_name,
    };
    dispatch(updateBranch({ item: item }));
    handleClose();
  };

  const onSubmitCreate = (dataCreate: PropsCreateBranch) => {
    const { branch_name } = dataCreate;
    const item: Branch = {
      branch_name: branch_name,
      id: data[data.length - 1].id + 1,
      status: 1,
    };
    dispatch(createBranch({ item: item }));
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
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Branch" : `Cập nhật Branch`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                branch_name: anchorElData?.item.branch_name ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateBranch}
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
                Cập nhật thông tin cá nhân của Branch, vui lòng điền tất cả
                thông tin cần thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.branch_name}
                touched={touched.branch_name}
                value={values.branch_name}
                label={"Branch name"}
                onChange={handleChange("branch_name")}
                onBlur={handleBlur("branch_name")}
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
