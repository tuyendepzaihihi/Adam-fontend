import { createStyles, LinearProgress, makeStyles } from "@material-ui/core";

const LoadingProgress = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LinearProgress
        classes={{
          colorPrimary: "#e8eaf6",
          barColorPrimary: "#03a9f4",
        }}
      />
    </div>
  );
};
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.5)",
      width: "100%",
      height: window.innerHeight - 70,
      top: 0,
    },
  })
);

export default LoadingProgress;
