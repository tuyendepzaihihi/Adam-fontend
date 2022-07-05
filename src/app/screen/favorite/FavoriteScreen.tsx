import { createStyles, makeStyles, Theme } from "@material-ui/core";

const FavoriteScreen = () => {
  const classname = useStyles();
  return <div className={classname.container}></div>;
};
export default FavoriteScreen;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      scrollBehavior: "auto",
      display: "flex",
      justifyContent: "space-between",
    },
  })
);
