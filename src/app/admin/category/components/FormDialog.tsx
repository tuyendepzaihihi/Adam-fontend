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
import { LIST_CATEGORY } from "../../../contant/ContaintDataAdmin";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { CategoryAdmin, ResultApi } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import {
  CreateDto,
  requestPostCreateCategory,
  requestPutUpdateCategory,
  UpdateDto,
} from "../CategoryApi";
import {
  createCategory,
  createCategoryChilden,
  updateCategory,
  updateCategoryChilden,
} from "../slice/CategoryAdminSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData?: { item: CategoryAdmin } | null;
  type: number;
  data: CategoryAdmin[];
  isParent?: boolean;
  category_parent_id?: number;
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
  const {
    handleClose,
    open,
    anchorElData,
    type,
    isParent,
    category_parent_id,
  } = props;
  const [category, setCategory] = useState<string | null>(
    category_parent_id ? `${category_parent_id}` : null
  );
  const onSubmitUpdate = async (data: { name: string }) => {
    const { name } = data;
    if (anchorElData) {
      const item: UpdateDto = {
        id: anchorElData.item.id,
        categoryName: name,
        isDelete: anchorElData.item.isDeleted ?? false,
      };
      const res: ResultApi<CategoryAdmin> = await requestPutUpdateCategory(
        item
      );
      if (isParent) dispatch(updateCategory({ item: res.data }));
      else
        dispatch(
          updateCategoryChilden({ item: res.data, id: category_parent_id })
        );
      handleClose();
    }
  };

  const onSubmitCreate = async (dataCreate: PropsCreateCategory) => {
    const { name } = dataCreate;

    const itemCreate: CreateDto = {
      categoryName: name,
      categoryParentId: 0,
    };
    const res: ResultApi<CategoryAdmin> = await requestPostCreateCategory(
      itemCreate
    );
    if (isParent) {
      dispatch(createCategory({ item: res.data }));
    } else
      dispatch(
        createCategoryChilden({ item: res.data, id: category_parent_id })
      );

    handleClose();
  };

  // const onImageChange = (event: any) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     setImage(URL.createObjectURL(img));
  //   }
  // };
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
                name: anchorElData?.item.categoryName ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmitUpdate(data);
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
              {/* <div>
                <img
                  src={image ? image : anchorElData?.item.url}
                  alt=""
                  style={{ width: 200 }}
                />
                <h1>Select Image</h1>
                <input type="file" name="myImage" onChange={onImageChange} />
              </div> */}
              <TextInputComponent
                error={errors.name}
                touched={touched.name}
                value={values.name}
                label={"Name"}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {!isParent && (
                <TextInputComponent
                  label="Category cha"
                  value={category}
                  onChange={(event: any) => {
                    const value = event.target.value;
                    setCategory(value);
                  }}
                  isSelected={true}
                  childrentSeleted={
                    <>
                      <option key={0} value={0}>
                        Chưa chọn
                      </option>
                      {LIST_CATEGORY.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.categoryName}
                        </option>
                      ))}
                    </>
                  }
                />
              )}
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
