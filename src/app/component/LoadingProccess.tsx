import { createStyles, makeStyles } from "@material-ui/core";
import ReactLoading from "react-loading";
import { colors } from "../utils/color";
const LoadingProgress = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ReactLoading
        type="spinningBubbles"
        color={colors.white}
        width={40}
        height={40}
      />
    </div>
  );
};
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.1)",
      width: "105%",
      height: "105%",
      top: -10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      left: -10,
    },
  })
);

export default LoadingProgress;
