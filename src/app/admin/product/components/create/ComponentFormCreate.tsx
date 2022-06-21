import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Formik } from "formik";
import { useState } from "react";
import TextInputComponent from "../../../../component/TextInputComponent";
import {
  LIST_BRANCH,
  LIST_CATEGORY,
  LIST_TAG,
} from "../../../../contant/ContaintDataAdmin";
import { ProductAdmin } from "../../../../contant/IntefaceContaint";
import { PropsCreateProduct } from "../DialogCreateProduct";
interface Props {
  initialValues: PropsCreateProduct;
  validateProduct: any;
  onSubmit: Function;
  handleClose: () => void;
  steps: any;
  dataProduct: ProductAdmin | null;
}
const ComponentFormCreate = (props: Props) => {
  const { initialValues, onSubmit, validateProduct, handleClose, dataProduct } =
    props;
  const [branch, setBranch] = useState<string | null>(
    dataProduct ? `${dataProduct.branch_id}` : null
  );
  const [tag, setTag] = useState<string | null>(
    dataProduct ? `${dataProduct.tag_id}` : null
  );
  const [category, setCategory] = useState<string | null>(
    dataProduct ? `${dataProduct.category_id}` : null
  );
  const handleSubmitCreate = (data: PropsCreateProduct) => {
    const { description, product_name } = data;
    const item: ProductAdmin = {
      branch_id: Number(branch),
      category_id: Number(category),
      description: description,
      product_name: product_name,
      status: 1,
      is_delete: 1,
      create_date: "25/05/2021",
      id: Math.random() * 1000,
      image: "",
      tag_id: Number(tag),
    };
    onSubmit(item);
  };
  return (
    <Formik
      initialValues={
        dataProduct
          ? {
              product_name: dataProduct.product_name,
              description: dataProduct.description,
            }
          : initialValues
      }
      onSubmit={(data) => {
        handleSubmitCreate(data);
      }}
      validateOnChange
      validationSchema={validateProduct}
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
              Cập nhật thông tin cá nhân của Product, vui lòng điền tất cả thông
              tin cần thiết
            </DialogContentText>
            <TextInputComponent
              error={errors.product_name}
              touched={touched.product_name}
              value={values.product_name}
              label={"product name"}
              onChange={handleChange("product_name")}
              onBlur={handleBlur("product_name")}
            />
            <TextInputComponent
              error={errors.description}
              touched={touched.description}
              value={values.description}
              label={"description"}
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
            />
            <TextInputComponent
              label="Branch"
              value={branch}
              onChange={(event: any) => {
                const value = event.target.value;
                setBranch(value);
              }}
              isSelected={true}
              childrentSeleted={
                <>
                  <option key={0} value={0}>
                    Chưa chọn
                  </option>
                  {LIST_BRANCH.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.branch_name}
                    </option>
                  ))}
                </>
              }
            />
            <TextInputComponent
              label="Tag"
              value={tag}
              onChange={(event: any) => {
                const value = event.target.value;
                setTag(value);
              }}
              isSelected={true}
              childrentSeleted={
                <>
                  <option key={0} value={0}>
                    Chưa chọn
                  </option>
                  {LIST_TAG.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.tag_name}
                    </option>
                  ))}
                </>
              }
            />
            <TextInputComponent
              label="Category"
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>

            <Button onClick={() => handleSubmit()} color="primary">
              Next
            </Button>
          </DialogActions>
        </>
      )}
    </Formik>
  );
};
export default ComponentFormCreate;
