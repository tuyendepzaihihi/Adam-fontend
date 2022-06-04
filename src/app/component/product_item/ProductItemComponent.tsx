import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../contant/Contant";
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
  item: ItemProduct;
  width?: number | string;
}

const ProductItemComponent = (props: Props) => {
  const className = useStyles();
  const navigate = useNavigate();
  const { item, width } = props;
  const [show, setShow] = useState(false);

  return (
    <div
      className={className.container}
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
      style={{ width: width }}
    >
      <img src={item.url_image} alt="" className={className.image_banner} />
      <div className={className.containerInfo}>
        <p className={className.textDiscount}>{item.descriptionDiscount}</p>
        <p className={className.textName}>{item.name}</p>
        <p className={className.textPrice}>{formatPrice(item.price)} đ</p>
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
  );
};
export default ProductItemComponent;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "23%",
      position: "relative",
      marginRight: `${(100 - 32 * 3) / 3}%`,
    },
    image_banner: {
      width: "100%",
      height: 350,
    },
    textDiscount: {
      color: colors.white,
      fontWeight: "bold",
      fontSize: 16,
      backgroundColor: colors.gray,
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
      height: 350,
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
