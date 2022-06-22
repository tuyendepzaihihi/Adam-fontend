import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ProductItemComponent from "../../component/product_item/ProductItemComponent";
import { LIST_CATEGORY, LIST_PRODUCT } from "../../contant/Contant";
import { colors } from "../../utils/color";

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
      justifyContent: "space-between",
      flexWrap: "wrap",
      width: "100%",
    },
    textTitle: {
      paddingTop: 15,
      paddingBottom: 48,
      fontWeight: "bold",
      fontSize: 24,
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
  })
);
const ProductScreen = () => {
  const className = useStyles();
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
      </div>
      <div className={className.image_banner}>
        <p className={className.textTitle}>Sản phẩm mới</p>
        <div className={className.listImage}>
          {LIST_PRODUCT.map((value, idx) => {
            return (
              <ProductItemComponent item={value} key={idx} width={"33%"} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ProductScreen;
