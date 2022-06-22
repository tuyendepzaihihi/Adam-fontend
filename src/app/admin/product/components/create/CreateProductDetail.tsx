import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ProductAdmin } from "../../../../contant/IntefaceContaint";
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

  const handleChooseOption = () => {
    setOption(option.concat(["0"]));
  };

  const handleDeleteOption = (number_key: number) => {
    const newRes = option.filter((e, idx) => idx !== number_key);
    setOption(newRes);
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
              handleDeleteOption={() => handleDeleteOption(index)}
              key={index}
              option={option}
              index={index}
              valueOption={option[index]}
              setOption={setOption}
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
        <Button variant="contained" color="primary" onClick={handleNext}>
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
