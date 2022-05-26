import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { createRef, useEffect, useRef, useState } from "react";
import { colors } from "../../utils/color";

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
}

const ProductItemComponent = (props: Props) => {
  const className = useStyles();
  const { item } = props;
  const [show, setShow] = useState(false);
  const mouseMoveRef = useRef<any>();
  useEffect(() => {
    window.addEventListener("mousemove", checkHover, true);
  }, []);
  useEffect(() => {
    return () => window.removeEventListener("mousemove", checkHover, true);
  }, []);
  const checkHover = (e: any) => {
    if (mouseMoveRef.current) {
      const mouseOver = mouseMoveRef?.current?.contains(e.target);
      if (!show && mouseOver) {
        setHover();
      }

      if (show && !mouseOver) {
        setUnhover();
      }
    }
  };
  const setHover = () => setShow(true);
  const setUnhover = () => setShow(false);
  return (
    <div className={className.container}>
      <img
        src={item.url_image}
        ref={mouseMoveRef}
        alt=""
        className={className.image_banner}
        onMouseEnter={() => {
          console.log("enter");
          setShow(true);
        }}
        onMouseLeave={() => {
          console.log("leave");
          setShow(false);
        }}
      />
      <div className={className.containerInfo}>
        <p className={className.textDiscount}>{item.descriptionDiscount}</p>
        <p className={className.textName}>{item.name}</p>
        <p className={className.textPrice}>{item.price} đ</p>
      </div>
      {show && <div className={className.positionContainer} />}
    </div>
  );
};
export default ProductItemComponent;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "23%",
    },
    image_banner: {
      width: "100%",
      height: 350,
      "&:hover": {
        height: 360,
      },
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
      width: "23%",
      height: 350,
      top: 0,
    },
  })
);
