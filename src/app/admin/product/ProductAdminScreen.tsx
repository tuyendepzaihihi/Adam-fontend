import { createStyles, makeStyles, Theme } from "@material-ui/core";

const ProductAdminScreen = () => {
  const className = useStyles();
  return <div className={className.root}>product screen</div>;
};
export default ProductAdminScreen;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
    },
  })
);
