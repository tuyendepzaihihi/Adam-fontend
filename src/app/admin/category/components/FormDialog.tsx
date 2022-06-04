import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Formik } from "formik";
import moment from "moment";
import { useState } from "react";
import * as Yup from "yup";
import R from "../../../assets/R";
import TextInputComponent from "../../../component/TextInputComponent";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { CategoryAdmin } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import { createCategory, updateCategory } from "../slice/CategoryAdminSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData?: { item: CategoryAdmin } | null;
  type: number;
  data: CategoryAdmin[];
}
const validateCategory = Yup.object({});

interface PropsCreateCategory {
  name: string;
}
const initialValues: PropsCreateCategory = {
  name: "",
};
const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;
  const [image, setImage] = useState<any>(null);
  const onSubmit = (data: { name: string }) => {
    const { name } = data;
    if (anchorElData) {
      const item: CategoryAdmin = {
        ...anchorElData.item,
        name: name,
      };
      dispatch(updateCategory({ item: item }));
      handleClose();
    }
  };

  const onSubmitCreate = (dataCreate: PropsCreateCategory) => {
    const { name } = dataCreate;
    const item: CategoryAdmin = {
      status: 1,
      create_date: moment(new Date()).format("DD/MM/YYYY").toString(),
      id: data[data.length - 1].id + 1,
      name: name,
      url: image,
    };
    dispatch(createCategory({ item: item }));
    handleClose();
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
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Category" : `Cập nhật Category`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                name: anchorElData?.item.name ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateCategory}
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
                Cập nhật thông tin của Category, vui lòng điền tất cả thông tin
                cần thiết
              </DialogContentText>
              <div>
                <img src={image} alt="" />
                <h1>Select Image</h1>
                <input type="file" name="myImage" onChange={onImageChange} />
              </div>
              <TextInputComponent
                error={errors.name}
                touched={touched.name}
                value={values.name}
                label={"Name"}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
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
