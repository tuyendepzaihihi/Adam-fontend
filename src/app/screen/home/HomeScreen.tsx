import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import ProductItemComponent from "../../component/product_item/ProductItemComponent";
import { LIST_IMAGE_BANNER, LIST_PRODUCT } from "../../contant/Contant";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { incrementAsyncHome } from "./slice/HomeSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      scrollBehavior: "auto",
    },
    image_banner: {
      width: "100%",
    },
    listImage: {
      display: "flex",
      justifyContent: "space-between",
    },
    textTitle: {
      paddingTop: 5,
      paddingBottom: 10,
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
    },
  })
);

const HomeScreen = () => {
  const className = useStyles();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.home);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      await dispatch(incrementAsyncHome());
    } catch (e) {}
  };
  return (
    <div className={className.container}>
      <div style={{ width: "100%", height: 500 }}>
        <Carousel
          autoPlay
          animation="fade"
          timeout={500}
          IndicatorIcon={<div />}
        >
          {LIST_IMAGE_BANNER.map((e, index) => {
            return (
              <img
                src={e.url}
                alt=""
                style={{ width: "100%", height: "400" }}
                key={index}
              />
            );
          })}
        </Carousel>
      </div>
      <div style={{ width: "100%", height: 500 }}>
        <p className={className.textTitle}>Sản phẩm bán chạy</p>
        <Carousel
          autoPlay
          animation="slide"
          timeout={500}
          IndicatorIcon={<div />}
          cycleNavigation
          reverseEdgeAnimationDirection
          interval={6000}
        >
          {[1, 2].map((e) => {
            const list =
              e === 1
                ? LIST_PRODUCT.slice(0, 4)
                : LIST_PRODUCT.slice(4, LIST_PRODUCT.length);
            return (
              <div className={className.listImage}>
                {list.map((value, idx) => {
                  return <ProductItemComponent item={value} key={idx} />;
                })}
              </div>
            );
          })}
        </Carousel>
      </div>
      <div style={{ width: "100%", height: 500 }}>
        <p className={className.textTitle}>Sản phẩm mới</p>
        <Carousel
          autoPlay
          animation="slide"
          timeout={500}
          IndicatorIcon={<div />}
          cycleNavigation
          reverseEdgeAnimationDirection
          interval={6000}
        >
          {[1, 2].map((e) => {
            const list =
              e === 1
                ? LIST_PRODUCT.slice(0, 4)
                : LIST_PRODUCT.slice(4, LIST_PRODUCT.length);
            return (
              <div className={className.listImage}>
                {list.map((value, idx) => {
                  return <ProductItemComponent item={value} key={idx} />;
                })}
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
export default HomeScreen;
