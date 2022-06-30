import {
  Button,
  Chip,
  createStyles,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import TextInputComponent from "../../../../component/TextInputComponent";
import { TYPE_DIALOG } from "../../../../contant/Contant";
import {
  CategoryAdmin,
  ProductAdmin,
  ResultApi,
} from "../../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { colors } from "../../../../utils/color";
import {
  CreateProductDto,
  requestPostCreateProduct,
} from "../../ProductAdminApi";
import { changeLoading } from "../../slice/ProductAdminSlice";
import { DataOptionProduct, PropsCreateProduct } from "../DialogCreateProduct";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  initialValues: PropsCreateProduct;
  validateProduct: any;
  onSubmit: Function;
  handleClose: () => void;
  steps: any;
  dataProduct: ProductAdmin | null;
  options?: DataOptionProduct;
  type?: number;
}

const ComponentFormCreate = (props: Props) => {
  const {
    initialValues,
    onSubmit,
    validateProduct,
    handleClose,
    dataProduct,
    options,
    type,
  } = props;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  const tags = useAppSelector((state) => state.tagAdmin).data;
  const materials = useAppSelector((state) => state.materialAdmin).data;
  const categories = useAppSelector((state) => state.categoryAdmin).data;
  const [categoriesChil, setCategoriesChil] = useState<CategoryAdmin[]>([]);

  const [personTag, setPersonTag] = useState<string[]>([]);
  const [personMaterial, setPersonMaterial] = useState<string[]>([]);

  const [category, setCategory] = useState<string | null>(null);
  const [categoryChildren, setCategoryChilren] = useState<string | null>(null);

  useEffect(() => {
    if (dataProduct) {
      setCategory(`${dataProduct.category.categoryParentId}`);
      setCategoryChilren(`${dataProduct.category.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProduct]);

  useEffect(() => {
    getDataCategoryChil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    changeOptionProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const changeOptionProduct = () => {
    const listTag = options?.tagList?.map((e) => `${e.tagName}`);
    const listMaterial = options?.materialList?.map((e) => `${e.materialName}`);

    if (options) {
      listTag && setPersonTag(listTag);
      listMaterial && setPersonMaterial(listMaterial);
    }
  };

  const getDataCategoryChil = async () => {
    if (category) {
      const item = categories?.find((e) => e.id === +category);
      setCategoriesChil(item?.categoryChildren ?? []);
    } else return setCategoriesChil([]);
  };

  const handleChangeTag = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonTag(event.target.value as string[]);
  };
  const handleChangeMaterial = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPersonMaterial(event.target.value as string[]);
  };

  const handleSubmitCreate = async (data: PropsCreateProduct) => {
    const { description, product_name } = data;
    let materialList: number[] = [];
    try {
      dispatch(changeLoading(true));
      if (type === TYPE_DIALOG.CREATE) {
        materials.forEach((e) => {
          let res = personMaterial?.find((m) =>
            m.includes(`${e.materialName}`)
          );
          if (res !== undefined) materialList = materialList.concat([e.id]);
        });

        let tagsList: number[] = [];
        tags.forEach((e) => {
          let res = personTag?.find((m) => m.includes(`${e.tagName}`));
          if (res !== undefined) tagsList = tagsList.concat([e.id]);
        });

        const itemCreate: CreateProductDto = {
          categoryId: Number(categoryChildren) ?? 0,
          description: description,
          productName: product_name,
          tagProductIdList: tagsList,
          materialProductIdList: materialList,
          image: "d",
        };
        const res: ResultApi<ProductAdmin> = await requestPostCreateProduct(
          itemCreate
        );
        onSubmit(res.data);
      } else if (type === TYPE_DIALOG.UPDATE) {
      }
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };
  return (
    <Formik
      initialValues={
        dataProduct
          ? {
              product_name: dataProduct.productName,
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
                  {categories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.categoryName}
                    </option>
                  ))}
                </>
              }
            />
            {categoriesChil.length > 0 && (
              <TextInputComponent
                label="Category chil"
                value={categoryChildren}
                onChange={(event: any) => {
                  const value = event.target.value;
                  setCategoryChilren(value);
                }}
                isSelected={true}
                childrentSeleted={
                  <>
                    <option key={0} value={0}>
                      Chưa chọn
                    </option>
                    {categoriesChil.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.categoryName}
                      </option>
                    ))}
                  </>
                }
              />
            )}
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="demo-mutiple-chip-label">Tag</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={personTag}
                  onChange={handleChangeTag}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {tags.map((tag, index) => (
                    <MenuItem
                      key={index}
                      value={tag.tagName}
                      style={{
                        marginTop: 5,
                        marginRight: 5,
                        marginLeft: 5,
                        backgroundColor: personTag?.find(
                          (e) => e === `${tag.tagName}`
                        )
                          ? colors.orange
                          : colors.white,
                      }}
                    >
                      {tag.tagName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="demo-mutiple-chip-label">Material</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={personMaterial}
                  onChange={handleChangeMaterial}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {materials.map((material, index) => (
                    <MenuItem
                      key={index}
                      value={material.materialName}
                      style={{
                        marginTop: 5,
                        marginRight: 5,
                        marginLeft: 5,
                        backgroundColor: personMaterial?.find(
                          (e) => e === `${material.materialName}`
                        )
                          ? colors.orange
                          : colors.white,
                      }}
                    >
                      {material.materialName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
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
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: "100%",
      borderColor: colors.grayC4,
      borderWidth: 0.8,
      marginTop: 20,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);
