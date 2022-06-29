import {
  Button,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import R from "../../assets/R";
import { ROUTE } from "../../contant/Contant";
import { ProductAdmin } from "../../contant/IntefaceContaint";
import { colors } from "../../utils/color";
import { formatPrice } from "../../utils/function";
export interface ItemProduct {
  id: number;

  name: string;
  price: number;

  discountPersent?: number;
  descriptionDiscount?: string;
  url_image: any;
}

interface Props {
  item: ProductAdmin;
  width?: number | string;
}

const ProductItemComponent = (props: Props) => {
  const className = useStyles();
  const navigate = useNavigate();
  const { item, width } = props;
  const [show, setShow] = useState(false);

  return (
    <Paper
      elevation={3}
      className={className.container}
      style={{ width: width }}
    >
      <div
        onMouseEnter={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
        style={{ width: "100%" }}
      >
        <img
          src={R.images.img_product}
          alt=""
          className={className.image_banner}
        />
        <div className={className.containerInfo}>
          <p className={className.textDiscount}>{item.description}</p>
          <p className={className.textName}>{item.productName}</p>
          <p className={className.textPrice}>{formatPrice(2500000)} đ</p>
        </div>
        {show && (
          <div className={className.positionContainer}>
            <Button
              color="primary"
              className={className.button}
              onClick={() => {
                navigate(ROUTE.PRODUCT_DETAIL, { state: { item: item } });
                // navigate(ROUTE.PRODUCT);
              }}
            >
              Mua ngay
            </Button>
          </div>
        )}
      </div>
    </Paper>
  );
};
export default ProductItemComponent;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "20%",
      marginRight: `${(100 - 32 * 3) / 3}%`,
      marginTop: 15,
      position: "relative",
    },
    image_banner: {
      width: "100%",
      height: 250,
    },
    textDiscount: {
      color: colors.black,
      fontSize: 14,
    },
    containerInfo: {
      padding: 10,
    },
    textName: {
      color: colors.gray59,
      fontWeight: "bold",
      marginTop: 5,
    },
    textPrice: {
      color: colors.black,
      fontStyle: "italic",
      fontWeight: "bold",
    },
    positionContainer: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.5)",
      width: "100%",
      height: "100%",
      top: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: colors.gray59,
      color: colors.white,
    },
  })
);
