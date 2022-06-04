/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import R from "../../assets/R";
import { ItemProduct } from "../../component/product_item/ProductItemComponent";
import {
  dataFilter,
  data_detail,
  ItemCart,
  LIST_CART,
} from "../../contant/Contant";
import { useAppDispatch } from "../../hooks";
import { getToken } from "../../service/StorageService";
import { colors } from "../../utils/color";
import { formatPrice } from "../../utils/function";
import { createNotification } from "../../utils/MessageUtil";
import { addProductToCart } from "../cart/slice/CartSlice";

export const sortPriceToMax = () => {
  let array = dataFilter.data;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].price > array[j].price) {
        let a = array[i].price;
        array[i].price = array[j].price;
        array[j].price = a;
      }
    }
  }
  return `${formatPrice(array[0].price)} - ${formatPrice(
    array[array.length - 1].price
  )}`;
};

interface DataFilter {
  url: any;
  price: number;
}
interface Selection {
  optionId: number;
  optionValueId: number;
  value: string;
}
const ProductDetailScreen = () => {
  const className = useStyles();
  const dispatch = useAppDispatch();
  const state: any = useLocation().state;
  const [count, setCount] = useState(1);
  const [selection, setSelection] = useState<Selection[]>([]);
  const [dataF, setDataF] = useState<DataFilter | null>(null);

  useEffect(() => {
    filterPrice();
  }, [selection]);

  const filterPrice = () => {
    if (selection.length === data_detail.options.length) {
      dataFilter.data.map((data) => {
        let count = 0;
        data.option.map((option) => {
          selection.map((selection) => {
            if (
              option.id === selection.optionId &&
              option.option_values.id === selection.optionValueId
            ) {
              count = count + 1;
            }
          });
        });
        if (count === selection.length) {
          setDataF({ price: data.price, url: data.url });
        }
      });
    } else {
      setDataF(null);
    }
  };

  const handleOption = (params: Selection) => {
    const { optionId, optionValueId, value } = params;

    const dataExist = selection.find(
      (e) => e.optionId === optionId && e.optionValueId === optionValueId
    );

    if (!dataExist) {
      const exist = selection.find((e) => e.optionId === optionId);
      if (exist) {
        setSelection(
          selection
            .filter((e) => e.optionId !== optionId)
            .concat([
              {
                optionId: optionId,
                optionValueId: optionValueId,
                value: value,
              },
            ])
        );
      } else {
        setSelection(
          selection.concat([
            { optionId: optionId, optionValueId: optionValueId, value: value },
          ])
        );
      }
    } else {
      setSelection(selection.filter((e) => e.optionId !== optionId));
    }
  };

  const handleCheck = (params: Selection) => {
    const { optionId, optionValueId } = params;
    const dataExist = selection.find(
      (e) => e.optionId === optionId && e.optionValueId === optionValueId
    );
    if (dataExist) return true;
    else return false;
  };

  const handleBuyProduct = () => {
    const token = getToken();
    if (!token) {
      createNotification({
        type: "warning",
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
      });
      return;
    }
    const itemProduct: ItemProduct = state?.item;
    console.log({ id: itemProduct.id });

    const item: ItemCart = {
      id: LIST_CART.length + Math.random() + 1000,
      count: count,
      name: itemProduct?.name,
      price: dataF ? dataF?.price : itemProduct.price,
      totalPrice: count * (dataF ? dataF?.price : itemProduct.price),
      url_image: dataF ? dataF?.url : itemProduct.url_image,
      descriptionDiscount: itemProduct.descriptionDiscount,
      discountPersent: itemProduct.discountPersent,
      product_id: itemProduct.id,
    };
    dispatch(addProductToCart({ item: item }));
  };

  return (
    <div className={className.container}>
      <div className={className.containerImage}>
        <img alt="" src={dataF ? dataF.url : R.images.img_product} />
      </div>

      <div className={className.containerInfo}>
        <p className={className.title}>
          {`${state?.item?.name}`.toUpperCase()}
        </p>

        <p className={className.price}>
          {dataF ? formatPrice(dataF.price) : sortPriceToMax()} đ
        </p>

        {data_detail.options.map((option, index) => {
          return (
            <div key={index}>
              <p className={className.containerUpdateQuantity}>
                {option.name}
                <p className={className.price}>
                  {selection.find((e) => e.optionId === option.id)
                    ? `: ${
                        selection.find((e) => e.optionId === option.id)?.value
                      }`
                    : ""}
                </p>
              </p>
              <div className={className.containerUpdateQuantity}>
                {option.option_values.map((optionValue, idx) => {
                  return (
                    <button
                      className={clsx(className.buttonInActive, {
                        [className.buttonActive]: handleCheck({
                          optionId: option.id,
                          optionValueId: optionValue.id,
                          value: optionValue.name,
                        }),
                        [className.marginLeft]: idx > 0,
                      })}
                      onClick={() =>
                        handleOption({
                          optionId: option.id,
                          optionValueId: optionValue.id,
                          value: optionValue.name,
                        })
                      }
                      key={idx}
                    >
                      {optionValue.name}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {selection.length === data_detail.options.length && (
          <div className={className.containerDescription}>
            <p className={className.price}>Số lượng</p>
            <div className={className.containerUpdateQuantity}>
              <button
                className={className.buttonUpdate}
                onClick={() => {
                  if (count > 1) setCount(count - 1);
                }}
              >
                -
              </button>
              <p className={className.textCount}>{count}</p>
              <button
                className={className.buttonUpdate}
                onClick={() => {
                  setCount(count + 1);
                }}
                style={{ marginLeft: 15 }}
              >
                +
              </button>
            </div>
          </div>
        )}

        {selection.length === data_detail.options.length && (
          <p
            className={clsx(
              className.containerUpdateQuantity,
              className.containerDescription
            )}
          >
            Total
            <p className={className.price}>
              :{" "}
              {formatPrice((dataF ? dataF.price : state?.item?.price) * count)}đ
            </p>
          </p>
        )}

        {selection.length === data_detail.options.length && (
          <Button
            variant="outlined"
            className={className.buttonBuy}
            onClick={handleBuyProduct}
          >
            Mua hàng
          </Button>
        )}

        <div className={className.containerDescription}>
          <p
            className={className.price}
            style={{ borderBottomWidth: 1.5, borderBottomColor: colors.gray59 }}
          >
            Mô tả
          </p>
          <p className={className.description}>
            Áo sơ mi ngắn tay, form Body Fit dễ mặc, hợp form dáng. Màu sắc và
            kiểu dáng trẻ trung, hiện đại, dễ phối đồ. Chất liệu bạc hà kháng
            khuẩn tự nhiên, mát lạnh, mềm mượt, thân thiện với làn da.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailScreen;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 20,
    },
    containerImage: {
      width: "45%",
    },
    containerInfo: {
      width: "48%",
    },
    img: {
      width: "100%",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.gray59,
    },
    description: {
      fontSize: 16,
      color: colors.gray59,
      fontStyle: "italic",
      marginTop: 5,
    },
    price: {
      color: colors.gray59,
      fontSize: 16,
      fontWeight: "bolder",
    },

    containerUpdateQuantity: {
      flexDirection: "row",
      display: "flex",
      alignItems: "center",
      marginTop: 5,
    },
    buttonUpdate: {
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 18,
      borderColor: colors.gray59,
      borderWidth: 1,
      borderRadius: 5,
    },
    textCount: {
      color: colors.gray59,
      marginLeft: 15,
    },
    buttonInActive: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 3,
      borderColor: colors.grayC4,
      color: colors.gray59,
      fontSize: 15,
    },
    buttonActive: {
      backgroundColor: colors.orange,
      borderColor: colors.orange,
      color: colors.white,
    },
    buttonBuy: {
      width: "100%",
      borderRadius: 5,
      borderColor: colors.grayC4,
      color: colors.gray59,
      "&:hover": {
        borderColor: colors.orange,
        color: colors.orange,
      },
      marginTop: 10,
    },
    containerDescription: {
      marginTop: 15,
    },
    marginLeft: {
      marginLeft: 10,
    },
  })
);
