import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import LoadingProgress from "../../component/LoadingProccess";
import ProductItemComponent from "../../component/product_item/ProductItemComponent";
import {
  LIST_IMAGE_BANNER,
  LIST_IMAGE_BANNER_SECOND,
} from "../../contant/Contant";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { colors } from "../../utils/color";
import { incrementAsyncHome } from "./slice/HomeSlice";
import ReactLoading from "react-loading";
import { incrementAsyncFilter } from "../product/slice/FilterValueSlice";
import { incrementAsyncCart } from "../cart/slice/CartSlice";
import { getIdAccount } from "../../service/StorageService";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      scrollBehavior: "auto",
      position: "relative",
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
    root: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.5)",
      width: "100%",
      height: "100%",
      top: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

const HomeScreen = () => {
  const className = useStyles();
  const dispatch = useAppDispatch();
  const { isLoading, data } = useAppSelector((state) => state.home);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(incrementAsyncFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      await dispatch(incrementAsyncHome());
      const idAccount = getIdAccount();
      if (idAccount) await dispatch(incrementAsyncCart());
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
              <img src={e.url} alt="" style={{ width: "100%" }} key={index} />
            );
          })}
        </Carousel>
      </div>
      {data?.listBestSale && data?.listBestSale.length > 0 && (
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
                  ? data?.listBestSale.slice(0, 5)
                  : data?.listBestSale.slice(5, data?.listBestSale.length);
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
      )}
      <div
        style={{
          width: "100%",
          paddingBottom: 20,
          paddingTop: 20,
        }}
      >
        <Carousel
          autoPlay
          animation="fade"
          timeout={500}
          IndicatorIcon={<div />}
          interval={7000}
        >
          {LIST_IMAGE_BANNER_SECOND.map((e, index) => {
            return (
              <img src={e.url} alt="" style={{ width: "100%" }} key={index} />
            );
          })}
        </Carousel>
      </div>
      <div style={{ width: "100%" }}>
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
                ? data?.listNewProduct.slice(0, 5)
                : data?.listNewProduct.slice(5, data?.listNewProduct.length);
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
      {isLoading && <LoadingProgress />}
    </div>
  );
};
export default HomeScreen;
