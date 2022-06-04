import { createStyles, makeStyles, Theme } from "@material-ui/core";

const DashboardScreen = () => {
  const className = useStyles();
  return <div className={className.root}>dashscreen</div>;
};
export default DashboardScreen;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
    },
  })
);
