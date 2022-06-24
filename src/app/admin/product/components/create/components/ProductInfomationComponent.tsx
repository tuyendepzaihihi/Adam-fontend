import { createStyles, makeStyles, Typography } from "@material-ui/core";
import R from "../../../../../assets/R";
import { LIST_TAG } from "../../../../../contant/ContaintDataAdmin";
import { ProductAdmin } from "../../../../../contant/IntefaceContaint";
import { colors } from "../../../../../utils/color";

const ProductInfomation = (props: { item: ProductAdmin | null }) => {
  const { item } = props;
  // const renderTag = () => LIST_TAG.find((e) => e.id === item?.tag_id)?.tagName;
  const renderCategory = () => item?.category.id;
  const classes = useStylesInfo();
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div>
        <img
          alt=""
          src={R.images.img_product}
          style={{ width: 150, marginRight: 20 }}
        />
      </div>
      <div>
        <Typography className={classes.containerItem}>
          Name: <p className={classes.textValue}>{item?.productName}</p>
        </Typography>
        <Typography className={classes.containerItem}>
          Category:{" "}
          <p className={classes.textValue}>
            {renderCategory() ? renderCategory() : "..."}
          </p>
        </Typography>

        {/* <Typography className={classes.containerItem}>
          Tag:{" "}
          <p className={classes.textValue}>
            {renderTag() ? renderTag() : "..."}
          </p>
        </Typography> */}

        <p style={{ color: colors.gray59 }}>{item?.description}</p>
      </div>
    </div>
  );
};
export default ProductInfomation;

const useStylesInfo = makeStyles(() =>
  createStyles({
    containerItem: {
      display: "flex",
      color: colors.grayC4,
      fontSize: 14,
      marginBottom: 10,
      alignItems: "center",
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
