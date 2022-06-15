import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import R from "../../../../assets/R";
import {
  LIST_BRANCH,
  LIST_CATEGORY,
  LIST_TAG,
} from "../../../../contant/ContaintDataAdmin";
import { ProductAdmin } from "../../../../contant/IntefaceContaint";
import { colors } from "../../../../utils/color";

interface Props {
  handleBack: () => void;
  handleNext: () => void;
  productItem: ProductAdmin | null;
}
const ProductInfomation = (props: { item: ProductAdmin | null }) => {
  const { item } = props;
  const renderTag = () => LIST_TAG.find((e) => e.id === item?.tag_id)?.tag_name;
  const renderBranch = () =>
    LIST_BRANCH.find((e) => e.id === item?.branch_id)?.branch_name;
  const renderCategory = () =>
    LIST_CATEGORY.find((e) => e.id === item?.category_id)?.name;
  const classes = useStylesInfo();
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <Typography className={classes.containerItem}>
          Name: <p className={classes.textValue}>{item?.product_name}</p>
        </Typography>
        <Typography className={classes.containerItem}>
          Category:{" "}
          <p className={classes.textValue}>
            {renderCategory() ? renderCategory() : "..."}
          </p>
        </Typography>
        <Typography className={classes.containerItem}>
          Branch:{" "}
          <p className={classes.textValue}>
            {renderBranch() ? renderBranch() : "..."}
          </p>
        </Typography>
        <Typography className={classes.containerItem}>
          Tag:{" "}
          <p className={classes.textValue}>
            {renderTag() ? renderTag() : "..."}
          </p>
        </Typography>
        <Typography className={classes.containerItem}>
          Description: <p>{item?.description}</p>
        </Typography>
      </div>
      <div>
        <img alt="" src={R.images.img_product} style={{ width: 200 }} />
      </div>
    </div>
  );
};

const useStylesInfo = makeStyles(() =>
  createStyles({
    containerItem: {
      display: "flex",
      color: colors.grayC4,
      fontSize: 14,
    },
    textTitle: {
      color: colors.grayC4,
      fontSize: 14,
    },
    textValue: {
      color: colors.black,
      fontSize: 16,
      fontWeight: "bold",
    },
  })
);

const CreateProductDetail = (props: Props) => {
  const { handleBack, handleNext, productItem } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        style={{ fontWeight: "bold", fontSize: 18, marginBottom: 20 }}
      >
        Thong tin product
      </Typography>
      <ProductInfomation item={productItem} />
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
      width: 600,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
  })
);
