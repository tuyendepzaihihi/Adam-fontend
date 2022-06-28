/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import R from "../../assets/R";
import LoadingProgress from "../../component/LoadingProccess";
import { ItemProduct } from "../../component/product_item/ProductItemComponent";
import ReactLoading from "react-loading";
import {
  dataFilter,
  data_detail,
  ItemCart,
  LIST_CART,
} from "../../contant/Contant";
import {
  DetailProductAdmin,
  OptionColor,
  OptionSize,
  ProductAdmin,
  ResultApi,
} from "../../contant/IntefaceContaint";
import { useAppDispatch } from "../../hooks";
import { getToken } from "../../service/StorageService";
import { colors } from "../../utils/color";
import { formatPrice } from "../../utils/function";
import { createNotification } from "../../utils/MessageUtil";
import { addProductToCart } from "../cart/slice/CartSlice";
import {
  requestGetProductCustomerById,
  requestGetProductDetailByIdProduct,
} from "./ProductCustomerApi";

export const sortPriceToMax = (array: DetailProductAdmin[]) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].priceExport > array[j].priceExport) {
        let a = array[i].priceExport;
        array[i].priceExport = array[j].priceExport;
        array[j].priceExport = a;
      }
    }
  }
  return `${formatPrice(array[0].priceExport)} - ${formatPrice(
    array[array.length - 1].priceExport
  )}`;
};

interface DataFilter {
  url: any;
  price: number;
}
interface Selection {
  optionId: string;
  optionValueId: number;
  value: string;
}

interface ProductById {
  id: number;
  productName: string;
  description: string;
  isActive: boolean;
  maxPrice: number;
  minPrice: number;
  options: {
    optionName: string;
    values_options: {
      id: number;
      name: string;
    }[];
  }[];
}

const DataExample: ProductById = {
  id: 1,
  description: "Daay la san oham mau",
  isActive: true,
  maxPrice: 1500000,
  minPrice: 1200000,
  productName: "San pham 01",
  options: [
    {
      optionName: "Size",
      values_options: [
        { id: 1, name: "S" },
        { id: 2, name: "M" },
      ],
    },
    {
      optionName: "Color",
      values_options: [
        { id: 1, name: "Xanh" },
        { id: 2, name: "Vang" },
      ],
    },
  ],
};

const ProductDetailScreen = () => {
  const className = useStyles();
  const dispatch = useAppDispatch();
  const state: any = useLocation().state;
  const [count, setCount] = useState(1);
  const [selection, setSelection] = useState<Selection[]>([]);
  const [dataF, setDataF] = useState<DataFilter | null>(null);
  const [listDataFilter, setListDataFilter] = useState<DetailProductAdmin[]>(
    []
  );
  const [dataDetail, setDataDetail] = useState<ProductById | undefined>(
    undefined
  );

  useEffect(() => {
    getDataFilterPrice();
  }, [state]);

  useEffect(() => {
    filterPrice();
  }, [selection]);

  const getDataFilterPrice = async () => {
    try {
      const resultProductById: ResultApi<ProductById> =
        await requestGetProductCustomerById({ id: 7 });
      const res: ResultApi<DetailProductAdmin[]> =
        await requestGetProductDetailByIdProduct({
          product_id: 7,
        });
      setDataDetail(resultProductById.data);
      setListDataFilter(res.data);
    } catch (e) {}
  };

  const filterPrice = () => {
    console.log(selection.length, dataDetail?.options.length);

    if (selection.length === dataDetail?.options.length) {
      for (let index = 0; index < dataFilter.length; index++) {
        let count = 0;
        for (let i = 0; i < selection.length; i++) {
          if (
            dataFilter[index].size.id === selection[i].optionValueId &&
            selection[i].optionId === "Size"
          )
            count = count + 1;
          else if (
            dataFilter[index].color.id === selection[i].optionValueId &&
            selection[i].optionId === "Color"
          )
            count = count + 1;
        }
        if (count === selection.length) {
          setDataF({ price: dataFilter[index].priceExport, url: "" });
        }
      }
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
    const itemProduct: ProductAdmin = state?.item;

    const item: ItemCart = {
      id: LIST_CART.length + Math.random() + 1000,
      count: count,
      name: itemProduct?.productName,
      price: dataF ? dataF?.price : 0,
      totalPrice: count * (dataF ? dataF?.price : 1),
      url_image: dataF ? dataF?.url : itemProduct.image,
      descriptionDiscount: itemProduct.description,
      discountPersent: 10,
      product_id: itemProduct.id,
    };
    dispatch(addProductToCart({ item: item }));
  };

  return (
    <div className={className.container}>
      {dataDetail ? (
        <>
          <div className={className.containerImage}>
            <img alt="" src={R.images.img_product} />
          </div>

          <div className={className.containerInfo}>
            <p className={className.title}>
              {`${dataDetail?.productName}`.toUpperCase()}
            </p>

            <p className={className.price}>
              {dataF
                ? formatPrice(dataF.price)
                : `${formatPrice(dataDetail?.minPrice ?? 0)} - ${formatPrice(
                    dataDetail?.maxPrice ?? 0
                  )}`}
              đ
            </p>

            {dataDetail?.options.map((option, index) => {
              return (
                <div key={index}>
                  <p className={className.containerUpdateQuantity}>
                    {option.optionName}
                  </p>
                  <div className={className.containerUpdateQuantity}>
                    {option.values_options.map((optionValue, idx) => {
                      return (
                        <button
                          className={clsx(className.buttonInActive, {
                            [className.buttonActive]: handleCheck({
                              optionId: option.optionName,
                              optionValueId: optionValue.id,
                              value: optionValue.name,
                            }),
                            [className.marginLeft]: idx > 0,
                          })}
                          onClick={() =>
                            handleOption({
                              optionId: option.optionName,
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

            {/* {selection.length === data_detail.options.length && (
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
        )} */}

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
                style={{
                  borderBottomWidth: 1.5,
                  borderBottomColor: colors.gray59,
                }}
              >
                Mô tả
              </p>
              <p className={className.description}>
                Áo sơ mi ngắn tay, form Body Fit dễ mặc, hợp form dáng. Màu sắc
                và kiểu dáng trẻ trung, hiện đại, dễ phối đồ. Chất liệu bạc hà
                kháng khuẩn tự nhiên, mát lạnh, mềm mượt, thân thiện với làn da.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            height: 250,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ReactLoading
            type="spinningBubbles"
            color={colors.black}
            width={40}
            height={40}
          />
        </div>
      )}
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
