import {
  createStyles,
  makeStyles,
  Slider,
  Theme,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import ProductItemComponent from "../../component/product_item/ProductItemComponent";
import { LIST_CATEGORY, LIST_PRODUCT } from "../../contant/Contant";
import { colors } from "../../utils/color";
import { formatPrice } from "../../utils/function";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      scrollBehavior: "auto",
      display: "flex",
      justifyContent: "space-between",
    },
    image_banner: {
      width: "80%",
    },
    listImage: {
      display: "flex",
      // justifyContent: "space-between",
      flexWrap: "wrap",
      width: "100%",
    },
    textTitle: {
      paddingTop: 15,
      paddingBottom: 30,
      fontWeight: "bold",
      fontSize: 22,
      textAlign: "left",
    },
    categoryContainer: {
      width: "20%",
    },
    buttonCategory: {
      paddingTop: 5,
      paddingBottom: 5,
      borderColor: colors.white,
      borderWidth: 1,
      borderRadius: 5,
      color: colors.gray59,
      "&:hover": {
        color: colors.black,
        borderColor: colors.grayC4,
      },
      paddingLeft: 10,
      paddingRight: 10,
      width: "80%",
      alignItems: "flex-start",
      display: "flex",
    },
    textLabelValueFilter: {
      color: colors.black,
      fontWeight: "bold",
    },
    textValueFilter: {
      color: colors.gray59,
      fontStyle: "italic",
      fontSize: 14,
    },
    containerFilterValue: {
      paddingLeft: 10,
      paddingTop: 8,
      paddingBottom: 8,
    },
    buttonFilter: {
      padding: 10,
      borderRadius: 5,
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      marginRight: "5%",
      marginBottom: 10,
    },
  })
);

const LIST_SIZE = [
  { id: 1, label: "S" },
  { id: 2, label: "M" },
  { id: 3, label: "L" },
  { id: 4, label: "XL" },
  { id: 5, label: "XXL" },
];
const ProductScreen = () => {
  const className = useStyles();
  const [value, setValue] = useState([0, 1500]);
  const [color, setColor] = useState("#FFFFFF");

  const rangeSelector = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <div className={className.container}>
      <div className={className.categoryContainer}>
        <p className={className.textTitle}> Danh mục</p>

        {LIST_CATEGORY.map((value, idx) => {
          return (
            <p>
              <button className={className.buttonCategory}>{value.name}</button>
            </p>
          );
        })}

        <div>
          <p className={className.textTitle}>Filter</p>
          <div className={className.containerFilterValue}>
            <p className={className.textLabelValueFilter}>Color</p>
            <input
              type={"color"}
              style={{ width: "100%" }}
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
            <p className={className.textValueFilter}>HEX: {color}</p>
          </div>

          <div
            style={{
              display: "block",
              paddingRight: 20,
            }}
            className={className.containerFilterValue}
          >
            <p className={className.textLabelValueFilter}>Price range:</p>
            <Slider
              value={value}
              onChange={rangeSelector}
              min={0}
              max={1500}
              style={{ marginLeft: 5 }}
            />
            <p className={className.textValueFilter}>
              {value[0] !== value[1]
                ? `${formatPrice(value[0] * 1000)}đ - ${formatPrice(
                    value[1] * 1000
                  )}đ`
                : `${formatPrice(value[0] * 1000)}đ`}
            </p>
          </div>

          <div className={className.containerFilterValue}>
            <p className={className.textLabelValueFilter}>Size</p>
            <div style={{ paddingTop: 10 }}>
              {LIST_SIZE.map((e, index) => {
                return (
                  <button key={index} className={className.buttonFilter}>
                    <p className={className.textValueFilter}>{e.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={className.image_banner}>
        <p className={className.textTitle}>Sản phẩm mới</p>
        <div className={className.listImage}>
          {LIST_PRODUCT.map((value, idx) => {
            return (
              <ProductItemComponent item={value} key={idx} width={"32%"} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ProductScreen;
