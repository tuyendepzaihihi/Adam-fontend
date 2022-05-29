/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import R from "../../assets/R";
import { dataFilter, data_detail } from "../../contant/Contant";
import { colors } from "../../utils/color";
import { formatPrice } from "../../utils/function";

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
          {formatPrice(dataF ? dataF.price : state?.item?.price)} đ
        </p>
        {data_detail.options.map((option, index) => {
          return (
            <div key={index}>
              {option.name}
              {selection.find((e) => e.optionId === option.id)
                ? `: ${selection.find((e) => e.optionId === option.id)?.value}`
                : ""}
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
        <p className={className.price}>
          total:{" "}
          {formatPrice((dataF ? dataF.price : state?.item?.price) * count)} đ
        </p>
        <p className={className.description}>khanh</p>
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
      width: "50%",
      height: 600,
    },
    containerInfo: {
      width: "40%",
    },
    img: {
      width: "100%",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.black,
    },
    description: {
      fontSize: 18,
      color: colors.gray59,
      fontStyle: "italic",
      marginTop: 10,
    },
    price: {
      color: colors.black,
      fontSize: 18,
      marginTop: 10,
    },

    containerUpdateQuantity: {
      flexDirection: "row",
      display: "flex",
      alignItems: "center",
      marginTop: 10,
    },
    buttonUpdate: {
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 18,
      borderColor: colors.gray59,
      borderWidth: 1,
      borderRadius: 10,
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
      borderRadius: 5,
      marginLeft: 10,
    },
    buttonActive: {
      backgroundColor: colors.orange,
    },
  })
);
