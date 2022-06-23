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
  useTheme,
} from "@material-ui/core";
import { Formik } from "formik";
import { useState } from "react";
import TextInputComponent from "../../../../component/TextInputComponent";
import { ProductAdmin, ResultApi } from "../../../../contant/IntefaceContaint";
import { useAppSelector } from "../../../../hooks";
import { colors } from "../../../../utils/color";
import {
  CreateProductDto,
  requestPostCreateProduct,
} from "../../ProductAdminApi";
import { PropsCreateProduct } from "../DialogCreateProduct";

const ITEM_HEIGHT = 48;
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
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ComponentFormCreate = (props: Props) => {
  const { initialValues, onSubmit, validateProduct, handleClose, dataProduct } =
    props;
  const classes = useStyles();
  const theme = useTheme();

  const tags = useAppSelector((state) => state.tagAdmin).data;
  const materials = useAppSelector((state) => state.materialAdmin).data;
  const categories = useAppSelector((state) => state.categoryAdmin).data;

  const [personTag, setPersonTag] = useState<string[]>([]);
  const [personMaterial, setPersonMaterial] = useState<string[]>([]);

  const handleChangeTag = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonTag(event.target.value as string[]);
  };
  const handleChangeMaterial = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPersonMaterial(event.target.value as string[]);
  };

  const [category, setCategory] = useState<string | null>(
    dataProduct ? `${dataProduct.category_id}` : null
  );
  const handleSubmitCreate = async (data: PropsCreateProduct) => {
    const { description, product_name } = data;
    let materialList: number[] = [];
    materials.map((e) => {
      let res = personMaterial.find((m) => m.includes(`${e.materialName}`));
      if (res !== undefined) materialList = materialList.concat([e.id]);
    });

    let tagsList: number[] = [];
    tags.map((e) => {
      let res = personTag.find((m) => m.includes(`${e.tagName}`));
      if (res !== undefined) tagsList = tagsList.concat([e.id]);
    });

    const itemCreate: CreateProductDto = {
      categoryId: Number(category) ?? 0,
      description: description,
      productName: product_name,
      tagProductIdList: tagsList,
      materialProductIdList: materialList,
      image: "",
    };
    const res: ResultApi<ProductAdmin> = await requestPostCreateProduct(
      itemCreate
    );
    onSubmit(res.data);
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
                      style={
                        (getStyles(tag.tagName, personTag, theme),
                        { marginTop: 5, marginRight: 5, marginLeft: 5 })
                      }
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
                      style={
                        (getStyles(
                          material.materialName,
                          personMaterial,
                          theme
                        ),
                        { marginTop: 5, marginRight: 5, marginLeft: 5 })
                      }
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
