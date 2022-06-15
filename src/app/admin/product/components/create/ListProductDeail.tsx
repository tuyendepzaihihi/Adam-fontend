import { Button, createStyles, makeStyles } from "@material-ui/core";

interface Props {
  handleBack: () => void;
}
const ListProductDetail = (props: Props) => {
  const { handleBack } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleBack}>Back</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("khanh");
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
export default ListProductDetail;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 20,
    },
  })
);
