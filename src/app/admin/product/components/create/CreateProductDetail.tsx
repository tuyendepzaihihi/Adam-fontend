import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { LIST_OPTION } from "../../../../contant/ContaintDataAdmin";
import { ProductAdmin } from "../../../../contant/IntefaceContaint";
import { getDifferenValue } from "../../../../utils/function";
import {
  CreateDto,
  requestPostCreateDetailProduct,
} from "../../ProductAdminApi";
import RenderItemOption from "./components/ItemOptionComponent";
import ProductInfomation from "./components/ProductInfomationComponent";

interface Props {
  handleBack: () => void;
  handleNext: () => void;
  productItem: ProductAdmin | null;
  option: any[];
  setOption: any;
}

const CreateProductDetail = (props: Props) => {
  const { handleBack, handleNext, productItem, option, setOption } = props;
  const classes = useStyles();
  const [optionValues, setOptionValues] = useState({
    colors: [],
    sizes: [],
  });
  const handleChooseOption = () => {
    let m = getDifferenValue({ initList: LIST_OPTION, option: option });
    setOption(option.concat([`${m}`]));
  };
  const changeOptionValues = (keyNumber: number) => {
    if (Number(keyNumber) === 1) {
      let newValues: any = { ...optionValues, colors: [] };
      setOptionValues(newValues);
    } else if (Number(keyNumber) === 2) {
      let newValues: any = { ...optionValues, sizes: [] };
      setOptionValues(newValues);
    }
  };
  const handleDeleteOption = (number_key: number, item: any) => {
    const newRes = option.filter((e, idx) => idx !== number_key);
    setOption(newRes);
    changeOptionValues(item);
  };

  const handleSubmit = async () => {
    try {
      const payload: CreateDto = {
        colorList: optionValues.colors,
        priceExport: 0,
        priceImport: 0,
        productId: productItem?.id,
        quantity: 0,
        sizeList: optionValues.sizes,
      };
      console.log({ payload });
      const res = await requestPostCreateDetailProduct(payload);
      console.log({ res });
      // handleNext();
    } catch (e) {}
  };

  return (
    <div className={classes.root}>
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 20,
          marginLeft: 10,
        }}
      >
        Thông tin sản phẩm
      </Typography>
      <ProductInfomation item={productItem} />
      <Typography
        style={{
          marginTop: 15,
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 10,
          marginLeft: 10,
        }}
      >
        Thông tin option của sản phẩm
      </Typography>
      <div style={{ padding: 10, display: "flex", flexWrap: "wrap" }}>
        {option.map((e, index) => {
          return (
            <RenderItemOption
              handleDeleteOption={() =>
                handleDeleteOption(index, option[index])
              }
              key={index}
              option={option}
              index={index}
              valueOption={option[index]}
              setOption={setOption}
              optionValues={optionValues}
              setOptionValues={setOptionValues}
            />
          );
        })}
        {option.length < 2 && (
          <Button
            variant="outlined"
            onClick={handleChooseOption}
            style={{ height: 45 }}
          >
            Add option
          </Button>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleBack}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
};
export default CreateProductDetail;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
  })
);
